"use client"

import Loading from "@/app/components/loading/Loading"
import styles from "./estoque.module.css"
import { useEffect, useState } from "react"
import Editar from "@/app/components/editar/Editar"
import Adicionar from "@/app/components/adicionar/Adicionar"
import { MdArrowForwardIos } from "react-icons/md";
import { socket } from "@/socket";
import { IoClose } from "react-icons/io5";

export default function Estoque() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState(0)
  const [id, setId] = useState()
  
  const [editar, setEditar] = useState(false)
  const [adicionar, setAdicionar] = useState(false)

  const [mercadorias, setMercadorias] = useState(false)
  const [embalagens, setEmbalagens] = useState(false)

  const [alert, setAlert] = useState()
  const [newData, setNewData] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fetch("/api/estoque")
      .then((res) => {
        res.json()
        .then((data) => {
          setLoading(false)
          setData(data)
        })
      })
      .catch(() => {
        console.log("api erro")
      })
    }, 3000);
  },[newData])

  
  socket.on("alert", (produto) => {
    setAlert(produto)
  })

  return(
    <Loading loading={loading}>
      <Editar value={value} editar={editar} setEditar={setEditar} setValue={setValue} id={id} setNewData={setNewData} newData={newData}>
        <Adicionar adicionar={adicionar} setAdicionar={setAdicionar} setNewData={setNewData} newData={newData}>
            {
              alert && (
                <div className={styles.alert}>
                  <p>
                    O {alert} está acabado
                  </p>
                  <IoClose onClick={() => setAlert()}/>
                </div>
              )
            }
            {
              data.length > 0 && (
                <div className={styles.conteiner}>
                  <div className={styles.title}>
                    <p>Mercadorias: </p>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <div
                        className={styles.button}
                        onClick={() => {
                          setAdicionar(true)
                        }}
                      >
                        Adcionar Produto
                      </div>
                      <div>
                        <MdArrowForwardIos
                          className={mercadorias ? "arrowUp" : "arrowDown"}
                          onClick={() => {
                            setMercadorias(!mercadorias)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                    {
                      mercadorias && (
                        data.map((produto, key) => (
                          produto.tipo === "produto" && (
                            <div key={key} className={styles.contProducts}>
                              <p>{produto.produto}</p>
                              <div style={{display:"flex", alignItems:"center"}}>
                                <p>{produto.quantidade}</p>
                                <div
                                  className={styles.button}
                                  onClick={() => {
                                    setEditar(true)
                                    setValue(produto.quantidade)
                                    setId(produto.id)
                                  }}
                                >
                                  Editar
                                </div>
                              </div>
                            </div>
                          )
                        ))
                      )
                    }
                  <div>
                    <div className={styles.title}>
                      <p>Embalagens: </p>
                      <div>
                        <MdArrowForwardIos
                          className={embalagens ? "arrowUp" : "arrowDown"}
                          onClick={() => {
                            setEmbalagens(!embalagens)
                          }}
                        />
                      </div>
                    </div>
                    {
                      embalagens && (
                        data.map((produto, key) => (
                          produto.tipo === "embalagem" && (
                            <div key={key}  className={styles.contProducts}>
                              <p>{produto.produto}</p>
                              <div style={{display:"flex", alignItems:"center"}}>
                                <p>{produto.quantidade}</p>
                                <div
                                  className={styles.button}
                                  onClick={() => {
                                    setEditar(true)
                                    setValue(produto.quantidade)
                                    setId(produto.id)
                                  }}
                                >
                                  Editar
                                </div>
                              </div>
                            </div>
                          )
                        ))
                      )
                    }
                  </div>
                </div>
              )
            }
        </Adicionar>
      </Editar>
    </Loading>
  )
}