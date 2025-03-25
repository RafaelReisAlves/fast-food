"use client"

import Loading from "@/app/components/loading/Loading"
import { useEffect, useState } from "react"
import styles from "../dashboard.module.css"

export default function Registros() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/pedido/registros")
    .then(res => {
      res.json()
      .then(data => {
        setLoading(false)
        setData(data)
      })
    })
    .catch(() => {
      console.log("erro")
    })
  },[])

  return(
    <Loading loading={loading}>
      {
        data.length > 0 && (
          data.map((comanda, key) => (
            <div key={key} className={styles.ContComanda}>
              <p>{comanda.nome}</p>
              <div className={styles.comanda}>
                <div className={styles.pedido}>
                  <p>{comanda.salgado}</p>
                  <p>{comanda.doce}</p>
                </div>
                <div className={styles.pedido}>
                  <p>{comanda.bebida}</p>
                </div>
                <div>
                  <p>{comanda.data}</p>
                </div>
              </div>
            </div>
          ))
        )
      }
    </Loading>
  )
}