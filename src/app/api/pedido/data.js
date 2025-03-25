export default function Data(comandas){
  let data = []

  comandas.map((comanda) => {
    let newData
    let salgado
    let doce
    let bebida
    comanda.orders.map(pedido => {
      if(pedido.tipo === "salgado"){
        salgado = pedido.produto
      }
      if(pedido.tipo === "doce"){
        doce = pedido.produto
      }
      if(pedido.tipo === "bebida"){
        bebida = pedido.produto
      }
    })
    newData = {
      nome: comanda.nome,
      salgado: salgado,
      doce: doce,
      bebida: bebida,
      userId: comanda.userId
    }
    data.push(newData)
  })

  return data
}