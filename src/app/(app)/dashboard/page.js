"use client"

import { socket } from "@/socket"
import { useEffect, useState } from "react"
import styles from "./dashboard.module.css"
import Loading from "@/app/components/loading/Loading"
import Cozinha from "@/app/components/cozinha/Cozinha"
import Retirada from "@/app/components/retirada/Retirada"

export default function Dashboard() {

  const [retirada, setRetirada] = useState()
  const [cozinha, setCozinha] = useState()
  const [loading, setLoading] = useState(true)

  function getDatas() {
    fetch("/api/pedido/retirada")
    .then(res => {
      res.json()
      .then(data => {
        setRetirada(data)
      })
    })
    .catch(() => {
      console.log("erro")
    })
    
    fetch("/api/pedido/cozinha")
    .then(res => {
      res.json()
      .then(data => {
        setCozinha(data)
      })
    })
    .catch(() => {
      console.log("erro")
    })
  }

  useEffect(() =>{
    getDatas()
  }, [])
  
  useEffect(() => {
    if(cozinha && retirada){
      setLoading(false)
    }

  },[cozinha, retirada])

  socket.once("cozinha-data", (data) => {
    console.log(data)
    setTimeout(() => {
      setCozinha(data)
    }, 1000)
  })
  socket.once("retirada-data", (data) => {
    console.log(data)
    setTimeout(() => {
      setRetirada(data)
    }, 1000)
  })
  
  return(
    <Loading loading={loading}>
      <div className={styles.conteiner}>
        {
          cozinha && (
            <Cozinha data={cozinha}/>
          )
        }
        {
          retirada && (
            <Retirada data={retirada}/>
          )
        }
      </div>
    </Loading>
  )
}