import { orderModel } from "@/models/comanda";
import { redirect } from "next/navigation";

export async function POST(req) {

  // const data = orderModel.findAll()
  // var newid
  
  // let ids = []
  // let id = 0
  // if(data){
  //   data.map(order => {
  //     ids.push(order.id)
  //   })
  // }
  // ids.sort((a,b) => {
  //   if(a < b){
  //     return 0
  //   }
  //   return -1
  // })
  // if(ids[0]){
  //   id = ids[0]
  // }
  // newid = id
  

  let quantidadeProdutos = 0
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

  console.log(salgado1,salgado1Quantidade)
  console.log(salgado2,salgado2Quantidade)
  console.log(doce1,doce1Quantidade)
  console.log(doce2,doce2Quantidade)
  console.log(bebida1,bebida1Quantidade)
  console.log(bebida2,bebida2Quantidade)

  // while(quantidadeProdutos > 0){
  //   orderModel.create({
  //     id:id
  //   })
  //   quantidadeProdutos--
  // }
  
  redirect("/")
}