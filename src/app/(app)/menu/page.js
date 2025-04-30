"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./menu.module.css"
import { socket } from "@/socket"
import Card from "@/app/components/card/card"
import Button from "@/app/components/button/button"
import SVG from "@/app/components/svgLogo/svg"

export default function Menu() {
  const router = useRouter()

  const [salgado, setSalgado] = useState()
  const [doce, setdoce] = useState()
  const [bebida, setbebida] = useState()

  const [nome, setNome] = useState("")
  const [disabled, setDisabled] = useState(true)

  const produtos = [
    {
      nome: "Ambuloco",
      produto: "Salgado",
      descricao: "Bolinho de milho assado com carne maluca de banana.",
      value: salgado,
      setvalue: setSalgado
    },
    {
      nome: "Mandioquitos",
      produto: "Salgado",
      descricao: "Chips crocante de mandioca. Acompanha maionese de tucupi e ketchup de goiaba.",
      value: salgado,
      setvalue: setSalgado
    },
    {
      nome: "Ambucoco",
      produto: "Doce",
      descricao: "Bolo molhado envolto de raspas de coco.",
      value: doce,
      setvalue: setdoce
    },
    {
      nome: "Ambucuca",
      produto: "Doce",
      descricao: "Bolo macio de banana caramelizada e crocante amanteigado.",
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

    const pedidoFeito = localStorage.getItem("pedido")

    const pedido = {
      nome,
      salgado,
      doce,
      bebida
    }

    if (!pedidoFeito) {
      localStorage.setItem("pedido", true)
      socket.emit("new-order", pedido)
      window.location.href = "/waiting"
    } else {
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/api/pedido")
      xhr.send()
      window.location.href = "/negado"
    }
  }

  return(
      <div className={styles.card}>
        <Card>
          <form onSubmit={handleSubmit}>
            <label className={styles.dignome}>
              DIGITE SEU NOME:
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
                    {key !== 0 && produtos[key - 1].produto !== produto.produto && (
                        <>
                          <hr className={styles.divisor}/>
                          <div className={produto.produto === "Bebida" ? styles.tipoBebida : styles.tipo}>
                            {produto.produto}s
                          </div>
                        </>
                    )}

                    {key === 0 && (
                        <div className={produto.produto === "Bebida" ? styles.tipoBebida : styles.tipo}>
                          {produto.produto}s
                        </div>
                    )}

                    {produto.nome === "Ambuloco" && (
                        <div className={styles.salgadoContainer}>
                          <div className={styles.containerImagemProdutos}>
                            <img
                                src="/ambuloco.jpg"
                                alt="Imagem Ambuloco"
                                className={styles.imagemSalgado}
                            />
                          </div>
                          <div className={styles.produto}>
                            <input
                                type="radio"
                                name={produto.produto}
                                id={produto.nome}
                                onChange={() => produto.setvalue(produto.nome)}
                            />
                            <label htmlFor={produto.nome}>
                              <div
                                  className={`${styles.svg} ${produto.value !== produto.nome ? styles.svgOn : styles.svgOff}`}>
                                <SVG/>
                              </div>
                              <p>{produto.nome}</p>
                              <div className={styles.descricao}>{produto.descricao}</div>
                            </label>
                          </div>
                        </div>
                    )}
                    {produto.nome === "Mandioquitos" && (
                        <div className={styles.salgadoContainer}>
                          <div className={styles.containerImagemProdutos}>
                            <img
                                src="/mandioquitos.jpg"
                                alt="Imagem Mandioquitos"
                                className={styles.imagemSalgado}
                            />
                          </div>
                          <div className={styles.produto}>
                            <input
                                type="radio"
                                name={produto.produto}
                                id={produto.nome}
                                onChange={() => produto.setvalue(produto.nome)}
                            />
                            <label htmlFor={produto.nome}>
                              <div
                                  className={`${styles.svg} ${produto.value !== produto.nome ? styles.svgOn : styles.svgOff}`}>
                                <SVG/>
                              </div>
                              <p>{produto.nome}</p>
                              <div className={styles.descricao}>{produto.descricao}</div>
                            </label>
                          </div>
                        </div>
                    )}
                    {produto.nome === "Ambucoco" && produto.produto === "Doce" && (
                        <div className={styles.salgadoContainer}>
                          <div className={styles.containerImagemProdutos}>
                            <img
                                src="/bolo-coco.jpg"
                                alt="Imagem de Bolo de Coco"
                                className={styles.imagemSalgado}
                            />
                          </div>
                          <div className={styles.produto}>
                            <input
                                type="radio"
                                name={produto.produto}
                                id={produto.nome}
                                onChange={() => produto.setvalue(produto.nome)}
                            />
                            <label htmlFor={produto.nome}>
                              <div
                                  className={`${styles.svg} ${produto.value !== produto.nome ? styles.svgOn : styles.svgOff}`}>
                                <SVG/>
                              </div>
                              <p>{produto.nome}</p>
                              <div className={styles.descricao}>{produto.descricao}</div>
                            </label>
                          </div>
                        </div>
                    )}
                    {produto.nome === "Ambucuca" && (
                        <div className={styles.salgadoContainer}>
                          <div className={styles.containerImagemProdutos}>
                            <img
                                src="/cuca.jpg"
                                alt="Imagem de Bolo Cuca de Banana"
                                className={styles.imagemSalgado}
                            />
                          </div>
                          <div className={styles.produto}>
                            <input
                                type="radio"
                                name={produto.produto}
                                id={produto.nome}
                                onChange={() => produto.setvalue(produto.nome)}
                            />
                            <label htmlFor={produto.nome}>
                              <div
                                  className={`${styles.svg} ${produto.value !== produto.nome ? styles.svgOn : styles.svgOff}`}>
                                <SVG/>
                              </div>
                              <p>{produto.nome}</p>
                              <div className={styles.descricao}>{produto.descricao}</div>
                            </label>
                          </div>
                        </div>
                    )}
                    {produto.nome !== "Ambuloco" && produto.nome !== "Mandioquitos" && produto.nome !== "Ambucoco" && produto.nome !== "Ambucuca" && (
                        <div className={`${styles.produto} ${produto.nome === "Suco" ? styles.espacoAntes : ""}`}>
                          <input
                              type="radio"
                              name={produto.produto}
                              id={produto.nome}
                              onChange={() => produto.setvalue(produto.nome)}
                          />
                          <label htmlFor={produto.nome}>
                            <div
                                className={`${styles.svg} ${produto.value !== produto.nome ? styles.svgOn : styles.svgOff}`}>
                              <SVG/>
                            </div>
                            <p>{produto.nome}</p>
                            <div className={styles.descricao}>{produto.descricao}</div>
                          </label>
                        </div>
                    )}
                  </div>
              ))
            }
          </form>
        </Card>
        <Button
            onClick={(e) => handleSubmit(e)}
            disabled={disabled}
            text={"FAZER PEDIDO"}
        />
      </div>
  )
}
