import { useState } from "react";
import Button from "../button/button";
import Card from "../card/card";
import styles from "./adicionar.module.css"
import { IoClose } from "react-icons/io5";

export default function Adicionar({adicionar, setAdicionar, children, setNewData, newData}) {

  const [produto, setProduto] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [tipo, setTipo] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setAdicionar(false)

    await fetch("/api/estoque/adicionar", {
      method: "POST",
      body: JSON.stringify({
        produto: produto,
        quantidade: quantidade,
        tipo: tipo
      })
    })
    .then(() => {
      setNewData(!newData)
    })
  }
  return(
    adicionar ? (
      <div className={styles.conteiner}>
        <Card>
          <div onClick={(() => setAdicionar(false))} className={styles.fechar}>
            <IoClose/>
          </div>
          <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div>
              <input type="text" name="produto" placeholder="Produto" onChange={(e) => {setProduto(e.target.value)}}/>
            </div>
            <div>
              <input type="number" name="quantidade" placeholder="Quantidade" onChange={(e) => {setQuantidade(e.target.value)}}/>
            </div>
            <div>
              <label htmlFor="produto">
                <input type="radio" name="tipo" value="produto" id="produto" onChange={() => setTipo("produto")}/>
                <p>Mercadoria</p>
              </label>            
            </div>
            <div>
              <label htmlFor="embalagem">
                <input type="radio" name="tipo" value="embalagem" id="embalagem" onChange={() => setTipo("embalagem")}/>
                <p>Embalagem</p>
              </label>
            </div>
            <Button text={"Enviar"}/>
          </div>
          </form>
        </Card>
      </div>
    ) : (
      children
    )
  )
}