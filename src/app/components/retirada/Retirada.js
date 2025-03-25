"use client"

import { useState } from "react"
import styles from "../../(app)/dashboard/dashboard.module.css"
import { MdArrowForwardIos } from "react-icons/md"
import { socket } from "@/socket"

export default function Retirada({data}) {

  const [entregar, setEntregar] = useState(false)
  
  return(
    <div>
      <div style={{display: "flex", justifyContent: "space-between", margin: "10px"}}>
        <p>Pedidos para entregar: </p>
        <div>
          <MdArrowForwardIos
          className={entregar ? "arrowUp" : "arrowDown"}
          onClick={() => {
            setEntregar(!entregar)
          }}
        />
        </div>
      </div>
      {
        entregar && (
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
                  <div
                    className={styles.button}
                    onClick={() => {
                      socket.emit("taked", comanda.userId)
                    }}
                  >Pronto</div>
                </div>
              </div>
            </div>
          ))
        )
      }
    </div>
  )
}