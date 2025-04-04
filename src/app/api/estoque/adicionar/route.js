import stock from "@/models/estoque";
import { revalidatePath } from "next/cache";

export async function POST(req) {

  const formData = await req.json()
  const produto = formData.produto
  const quantidade = formData.quantidade
  const tipo = formData.tipo

  const newProduto = {
      produto: produto,
      quantidade: quantidade,
      tipo: tipo,
    }
  stock.create(newProduto)
  revalidatePath("/dashboard/estoque", "page")
}