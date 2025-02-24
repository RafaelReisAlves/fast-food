import { command, order } from "@/models/comanda";
import { redirect } from "next/navigation";

export async function GET() {
  const data = await command.findAll({include: {
    model: order
  }})
  return Response.json(data)
}

export async function POST(req) {
  
  const formData = await req.formData()

  const salgado1 = formData.get('salgado 1')
  const salgado1Quantidade = formData.get('salgado 1 quantidade')

  const salgado2 = formData.get('salgado 2')
  const salgado2Quantidade = formData.get('salgado 2 quantidade')

  const doce1 = formData.get('doce 1')
  const doce1Quantidade = formData.get('doce 1 quantidade')

  const doce2 = formData.get('doce 2')
  const doce2Quantidade = formData.get('doce 2 quantidade')

  const bebida1 = formData.get('bebida 1')
  const bebida1Quantidade = formData.get('bebida 1 quantidade')

  const bebida2 = formData.get('bebida 2')
  const bebida2Quantidade = formData.get('bebida 2 quantidade')

  const newOrders = [
    {
      produto: salgado1,
      quantidade: salgado1Quantidade
    },
    {
      produto: salgado2,
      quantidade: salgado2Quantidade
    },
    {
      produto: doce1,
      quantidade: doce1Quantidade
    },
    {
      produto: doce2,
      quantidade: doce2Quantidade
    },
    {
      produto: bebida1,
      quantidade: bebida1Quantidade
    },
    {
      produto: bebida2,
      quantidade: bebida2Quantidade
    },
  ]

  let comanda, pedido
  command.create()
  .then((data) =>{
    comanda = data
    newOrders.map(newOrder => {
      if(newOrder.produto){
        order.create(newOrder)
        .then((data) => {
          pedido = data
          comanda.addOrder(pedido)
        })
      }
    })
  })

  redirect("/menu")
}