import { command } from "@/models/comanda";
import { Socket } from "socket.io";
import { redirect } from "next/navigation";

export async function GET(req) {

  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get("id")

  command.destroy({where: {id:id} , cascade:true})
  redirect("/dashboard")
}