import stock from "@/models/estoque"

export async function GET() {

  const data = await stock.findAll()

  return Response.json(data)
}