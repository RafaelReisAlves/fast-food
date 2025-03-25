"use client"

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
    xhr.open("POST", "/api/pedido"),
    xhr.send()
    
    redirect("/rating")
  })

  return(
    <Card>
      {
        ready ? (
          <h2>O pedido está pronto</h2>
        ) : (
          <h2>O pedido está sendo feito</h2>
        )
      }
    </Card>
  )
}