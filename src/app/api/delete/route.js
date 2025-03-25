import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req) {
  const cookieStore = await cookies()
  cookieStore.delete("autorizado")
  cookieStore.delete("dashboard")
  console.log(cookieStore)
  redirect("/thanks")
}