import { command, order } from "@/models/comanda"
import Data from "../data.js"

export async function GET() {

  const comandas = await command.findAll({include:{
      model: order
    },
    where : {
      pronto: true,
      entregue: false
    }
  })

  const data = Data(comandas)

  return Response.json(data)
}