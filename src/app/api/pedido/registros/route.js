import { command, order } from "@/models/comanda"

export async function GET() {
  const months = ["Janeiro", "Fevereiro", "março", "Abril", "Maio", "Junho", "Julho", "Agosto", "setembro", "Outubro", "Novembro", "Dezembro"]

  let data = []

  const comandas = await command.findAll({include:{
      model: order
    },
    where : {
      entregue: true
    }
  })

  comandas.map((comanda) => {
    let newData
    let salgado
    let doce
    let bebida
    comanda.orders.map(pedido => {
      if(pedido.tipo === "salgado"){
        salgado = pedido.produto
      }
      if(pedido.tipo === "doce"){
        doce = pedido.produto
      }
      if(pedido.tipo === "bebida"){
        bebida = pedido.produto
      }
    })
    const date = new Date(comanda.updatedAt)
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    newData = {
      nome: comanda.nome,
      salgado: salgado,
      doce: doce,
      bebida: bebida,
      data: `${day} de ${month} de ${year}, às ${hour}:${minutes}`
    }
    data.push(newData)
  })

  return Response.json(data)
}