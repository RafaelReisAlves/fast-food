import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { command, order } from "./src/models/comanda.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

command.hasMany(order, {
  onDelete:"CASCADE"
})
order.belongsTo(command)


app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("connected")
    socket.on("new-order", (newOrder) => {

      let quantidadeOrders=0

      newOrder.map(newOrder => {
        if(newOrder.produto){
          quantidadeOrders++
        }
      })


      let comanda, pedido
      if(quantidadeOrders > 0){

        command.create()
        .then((data) =>{
          comanda = data
          newOrder.map(newOrder => {
            if(newOrder.produto){
              order.create(newOrder)
              .then((data) => {
                pedido = data
                comanda.addOrder(pedido)
              })
              .then( () => {
                console.log("test")
                io.emit("new-data")
              })
            }
          })
        })
      }
    })
    socket.on("delete", (id) => {
      command.destroy({where: {id:id} , cascade:true})
      io.emit("new-data")
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