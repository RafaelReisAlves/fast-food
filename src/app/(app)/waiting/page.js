"use client"

import styles from "./waiting.module.css"
import { useState } from "react"
import { socket } from "@/socket"
import { redirect } from "next/navigation"
import Card from "@/app/components/card/card"

export default function Waiting() {
  const [ready, setReady] = useState(false)

  socket.on("ready", () => {
    setReady(true)
  })

  socket.on("taked", () => {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/api/pedido")
    xhr.send()
    redirect("/rating")
  })

  return (
      <div className={styles.container}>
        <Card className={styles.cardWaiting}>
          {
            ready ? (
                <>
                  <h2>O PEDIDO ESTÁ</h2>
                  <h2>PRONTO</h2>
                </>
            ) : (
                <>
                  <h2>SEU PEDIDO ESTÁ</h2>
                  <h2>SENDO PREPARADO</h2>
                </>
            )
          }
        </Card>
        <p className={styles.textoAbaixo}>Assim que seu pedido estiver pronto, a mensagem acima será atualizada!</p>
      </div>
  )
}