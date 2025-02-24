"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {

  const [data, setData] = useState([])

  useEffect(() =>{
    fetch("/api/pedido")
    .then(res => {
      res.json().then(data => {
        setData(data)
        console.log(data)
      })
    })
    .catch(() => {
      console.log("erro")
    })
  }, [])

  return(
    <div>
      {
        data && (
          data.map((comanda, key) => (
            <div key={key}>
              {
                comanda.orders.map((pedido, key) => (
                  <div key={key}>
                    <p>produto: {pedido.produto}</p>
                    <p>quantidade: {pedido.quantidade}</p>
                  </div>
                ))
              }
            </div>
          ))
        )
      }
    </div>
  )
}