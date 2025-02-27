import { command, order } from "@/models/comanda";

export async function GET() {

  const data = await command.findAll({include: {
    model: order
  }})

  return Response.json(data)
}