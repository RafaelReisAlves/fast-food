"use client"

import { useState } from "react"
import styles from "./menu.module.css"
import { socket } from "@/socket"
import { redirect } from "next/navigation"

export default function Menu() {

  const [salgado1Check, setSalgado1Check] = useState(false)
  const [salgado1Quantidade, setSalgado1Quantidade] = useState(0)
  const [salgado1, setSalgado1] = useState()

  const [salgado2Check, setSalgado2Check] = useState(false)
  const [salgado2Quantidade, setSalgado2Quantidade] = useState(0)
  const [salgado2, setSalgado2] = useState()

  const [doce1Check, setdoce1Check] = useState(false)
  const [doce1Quantidade, setdoce1Quantidade] = useState(0)
  const [doce1, setdoce1] = useState()

  const [doce2Check, setdoce2Check] = useState(false)
  const [doce2Quantidade, setdoce2Quantidade] = useState(0)
  const [doce2, setdoce2] = useState()

  const [bebida1Check, setbebida1Check] = useState(false)
  const [bebida1Quantidade, setbebida1Quantidade] = useState(0)
  const [bebida1, setbebida1] = useState()

  const [bebida2Check, setbebida2Check] = useState(false)
  const [bebida2Quantidade, setbebida2Quantidade] = useState(0)
  const [bebida2, setbebida2] = useState()

  const produtos = [
    {
      nome: "Ambuloco",
      value: salgado1,
      setvalue: setSalgado1,
      quantiade: salgado1Quantidade,
      setQuantidade: setSalgado1Quantidade,
      stateCheck: salgado1Check,
      setStateCheck: setSalgado1Check
    },
    {
      nome: "Bananitos",
      value: salgado2,
      setvalue: setSalgado2,
      quantiade: salgado2Quantidade,
      setQuantidade: setSalgado2Quantidade,
      stateCheck: salgado2Check,
      setStateCheck: setSalgado2Check
    },
    {
      nome: "Bolo de coco molhado felpudo",
      value: doce1,
      setvalue: setdoce1,
      quantiade: doce1Quantidade,
      setQuantidade: setdoce1Quantidade,
      stateCheck: doce1Check,
      setStateCheck: setdoce1Check
    },
    {
      nome: "Bolo Cuca de Banana",
      value: doce2,
      setvalue: setdoce2,
      quantiade: doce2Quantidade,
      setQuantidade: setdoce2Quantidade,
      stateCheck: doce2Check,
      setStateCheck: setdoce2Check
    },
    {
      nome: "Refrigerante",
      value: bebida1,
      setvalue: setbebida1,
      quantiade: bebida1Quantidade,
      setQuantidade: setbebida1Quantidade,
      stateCheck: bebida1Check,
      setStateCheck: setbebida1Check
    },
    {
      nome: "Suco",
      value: bebida2,
      setvalue: setbebida2,
      quantiade: bebida2Quantidade,
      setQuantidade: setbebida2Quantidade,
      stateCheck: bebida2Check,
      setStateCheck: setbebida2Check
    },
  ]

  function handleSubmit(e) {
    e.preventDefault()

    const newOrder = [
      {
        produto: salgado1,
        quantidade: salgado1Quantidade
      },
      {
        produto: salgado2,
        quantidade: salgado2Quantidade
      },
      {
        produto: doce1,
        quantidade: doce1Quantidade
      },
      {
        produto: doce2,
        quantidade: doce2Quantidade
      },
      {
        produto: bebida1,
        quantidade: bebida1Quantidade
      },
      {
        produto: bebida2,
        quantidade: bebida2Quantidade
      },
    ]

    socket.emit("new-order", newOrder)
    redirect("/rating")
  }

  return(
    <div className={styles.conteiner}>
      <form onSubmit={handleSubmit} method="post">
        <div>
          {
            produtos.map((produto, key) => (
              <div key={key} className={styles.produto}>
                <div>
                  <input
                    type="checkbox"
                    checked={produto.stateCheck}
                    readOnly                    
                  />
                  <label htmlFor={produto.nome}>{produto.nome}: </label>
                </div>
                <div>
                  <input
                    type="number"
                    name={`${produto.nome} quantidade`}
                    value={produto.quantiade}
                    min={0}
                    onChange={(e) => {
                      produto.setQuantidade(e.target.value)
                      if(e.target.value > 0){
                        produto.setStateCheck(true)
                        produto.setvalue(produto.nome)
                      }else{
                        produto.setStateCheck(false)
                        produto.setvalue(null)
                      }
                    }}
                  />
                </div>
              </div>
            ))
          }
          <div className={styles.button}>
            <button>Fazer pedido</button>
          </div>
        </div>
      </form>
    </div>
  )
}