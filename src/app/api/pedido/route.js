import Codes from "@/models/code";
import { command, order } from "@/models/comanda";
import { cookies } from "next/headers";

export async function GET() {

  const data = await command.findAll({include: {
    model: order
  }})

  return Response.json(data)
}

export async function POST() {

  const cookieStore = await cookies()
  const userCode = cookieStore.get("userCode").value

  console.log(userCode)

  Codes.findOne({where: {code: userCode}})
  .then((code) => {
    code.update({
      connected: false
    })
  })
  return Response("success")
}