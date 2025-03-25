"use client"

import { useEffect, useState } from "react"
import styles from "./menu.module.css"
import { socket } from "@/socket"
import Card from "@/app/components/card/card"
import Button from "@/app/components/button/button"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"
import SVG from "@/app/components/svgLogo/svg"

export default function Menu() {

  const [salgado, setSalgado] = useState()
  const [doce, setdoce] = useState()
  const [bebida, setbebida] = useState()

  const [nome, setNome] = useState("")
  const [disabled, setDisabled] = useState(true)

  const produtos = [
    {
      nome: "Ambuloco",
      produto: "Salgado",
      descricao: "Bolinho de milho assado com carne maluca de banana",
      value: salgado,
      setvalue: setSalgado
    },
    {
      nome: "Bananitos",
      produto: "Salgado",
      descricao: "Chips crocante de banana (acompanhada de maionese de tucupi e ketchup de goiaba",
      value: salgado,
      setvalue: setSalgado
    },
    {
      nome: "Bolo de coco molhado felpudo",
      produto: "Doce",
      descricao: "Bolo molha envolto de raspas de coco",
      value: doce,
      setvalue: setdoce
    },
    {
      nome: "Bolo Cuca de Banana",
      produto: "Doce",
      descricao: "Bolo macio, banana caramelizada e crocante amanteigado",
      value: doce,
      setvalue: setdoce
    },
    {
      nome: "Refrigerante",
      produto: "Bebida",
      value: bebida,
      setvalue: setbebida
    },
    {
      nome: "Suco",
      produto: "Bebida",
      value: bebida,
      setvalue: setbebida
    },
  ]

  useEffect(() => {
    if(nome.length >=3){
      if(salgado || doce || bebida){
        setDisabled(false)
      }
    }
  }, [salgado, doce, bebida, nome])

  async function handleSubmit(e) {
    e.preventDefault()
    
    const newOrders = [
      {
        produto: salgado,
        tipo: "salgado"
      },
      {
        produto: doce,
        tipo: "doce"
      },
      {
        produto: bebida,
        tipo: "bebida"
      }
    ]

    const pedido = {newOrders: newOrders, nome: nome}
    Cookies.remove("autorizado")
    const pedidoFeito = Cookies.get("pedido")
    if(!pedidoFeito){
      Cookies.set("pedido", true)
      socket.emit("new-order", pedido)
      redirect("/waiting")
    } else {
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/api/pedido")
      xhr.send()
      redirect("/negado")
    }
  }

  return(
    <div className={styles.card}>
      <Card>
        <form onSubmit={handleSubmit}>
          <label>
            Digite seu Nome: 
            <div className={styles.nome}>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </label>
          {
            produtos.map((produto, key) => (
              <div key={key}>
                {
                  key % 2 === 0 && (
                    <div className={styles.tipo}>
                      {produto.produto}s: 
                    </div>
                  )
                }
                <div className={styles.produto}>
                  <input
                    type="radio"
                    name={produto.produto}
                    id={produto.nome}
                    onChange={() => produto.setvalue(produto.nome)}
                  />
                  <label htmlFor={produto.nome}>
                    <div className={`${styles.svg} ${produto.value !== produto.nome ? styles.svgOn : styles.svgOff}`}>
                      <SVG/>
                    </div>
                    <p>{produto.nome}</p>
                    <div className={styles.descricao}>{produto.descricao}</div>
                  </label>
                </div>
              </div>
            ))
          }
          <Button disabled={disabled} text={"Fazer pedido"} />
        </form>
      </Card>
    </div>
  )
}
