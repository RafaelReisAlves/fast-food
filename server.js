import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { command, order } from "./src/models/comanda.js";
import stock from "./src/models/estoque.js";
import Data from "./src/app/api/pedido/data.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost" || "amburana-production.up.railway.app";
const port = 8080;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

command.hasMany(order, {
  onDelete:"CASCADE"
})
order.belongsTo(command)


app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cookie: true
  });

  io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("new-order", (pedido) => {
      
      let id = socket.id

      let quantidadeOrders = 0
      let limite = 5

      // criar comanda
      pedido.newOrders.map(newOrder => {
        if(newOrder.produto){
          quantidadeOrders++
        }
      })

      let comanda

      if(quantidadeOrders > 0){

        command.create({
          userId: id,
          nome: pedido.nome,
          pronto: false,
          entregue: false,
        })
        .then((data) =>{
          comanda = data
          pedido.newOrders.map(newOrder => {
            if(newOrder.produto){
              order.create(newOrder)
              .then(async (data) => {
                await comanda.addOrder(data)
                command.findAll({include: {model: order}, where: {pronto: false}})
                .then((commands) => {
                  const data = Data(commands)
                  io.emit("cozinha-data", data)
                })
              })
            }
          })
        })
      }

      // diminuir estoque
      pedido.newOrders.map(newOrder => {
        
        stock.findOne({where: {produto: newOrder.produto}})
        .then(produto => {
          if(produto.quantidade > 0 ){
            let novaQuantidade = produto.quantidade-1
            if(novaQuantidade <= limite){
              io.emit("alert", produto.produto)
            }
            produto.update({quantidade: novaQuantidade})
          }
        })
        // prototipo do estoque de embalagens
        // newOrder.embalagens.map((embalagem) => {
        //   stock.findOne({where:{produto: embalagem}})
        //   .then(produto => {
        //     let novaQuantidade = produto.quantidade-1
        //     produto.update({quantidade: novaQuantidade})
        //   })
        // })
      })
    })
    socket.on("ready", (id) => {
      console.log(id)
      socket.to(id).emit("ready")
      command.update({pronto: true},{where: {userId: id}})
      .then(() => {
        command.findAll({include:{model:order}, where: {pronto: false}})
        .then((commands) => {
          const data = Data(commands)
          io.emit("cozinha-data", data)
        })
        command.findAll({include:{model: order}, where: {pronto: true, entregue: false}})
        .then((commands) => {
          const data = Data(commands)
          io.emit("retirada-data", data)
        })
      })
    })
    socket.on("taked", (id) => {
      socket.to(id).emit("taked")
      command.update({entregue: true}, {where: {userId:id}})
      .then(() => {
        command.findAll({include:{model: order}, where: {pronto: true, entregue: false}})
        .then((commands) => {
          const data = Data(commands)
          io.emit("retirada-data", data)
        })
      })
    })
  });

  httpServer
  .once("error", (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});