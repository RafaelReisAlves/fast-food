"use client"

import { socket } from "@/socket"
import { useEffect, useState } from "react"
import styles from "./dashboard.module.css"

export default function Dashboard() {

  const [data, setData] = useState([])

  function getData(){
    fetch("/api/pedido")
    .then(res => {
      res.json().then(data => {
        setData(data)
      })
    })
    .catch(() => {
      console.log("erro")
    })
  }

  useEffect(() =>{
    socket.on("new-data", () => {
      setInterval(() =>{
        getData()
      }, 1000)
    })
    console.log(data.length)
    if(data.length == 0){
      getData()
    }
  }, [])

  function Delete(id){
    socket.emit("delete", id)
  }

  return(
    <div className={styles.conteiner}>
      {
        data && (
          data.map((comanda, key) => (
            <div key={key} className={styles.comanda}>
              {
                comanda.orders.map((pedido, key) => (
                  <div key={key} className={styles.pedido}>
                    <p>produto: {pedido.produto}</p>
                    <p>quantidade: {pedido.quantidade}</p>
                  </div>
                ))
              }
              <div className={styles.button} onClick={() => Delete(pedido.commandId)}>Excluir</div>
            </div>
          ))
        )
      }
    </div>
  )
}