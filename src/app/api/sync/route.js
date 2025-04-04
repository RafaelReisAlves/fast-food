import sequelize from "@/database/database";
// import { order, command } from "@/models/comanda";
// import ratingModel from "@/models/avaliação";
import stock from "@/models/estoque";
// import Codes from "@/models/code";

export async function GET() {

  const products = [
    {
      nome: "Ambuloco",
      quantidade: 50,
      tipo: "produto",
    },
    {
      nome: "Bananitos",
      quantidade: 50,
      tipo: "produto",
    },
    {
      nome: "Bolo de coco molhado felpudo",
      quantidade: 50,
      tipo: "produto",
    },
    {
      nome: "Bolo Cuca de Banana",
      quantidade: 50,
      tipo: "produto",
    },
  ]

  products.map((produto) => {
    stock.create({
      produto: produto.nome,
      quantidade: produto.quantidade,
      tipo: produto.tipo
    })
  })

  // sequelize.sync({force:true})
}