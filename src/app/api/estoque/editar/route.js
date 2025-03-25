import stock from "@/models/estoque"

export async function POST(req){

  const request = await req.json()
  const Id = request.id
  const newValue = request.value

  await stock.findOne({where: {id:Id}})
  .then(product => {
    product.update({quantidade: newValue})
  })
  
  return new Response("success", {
    status: 200
  })
}