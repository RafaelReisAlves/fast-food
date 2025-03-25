import Button from "../button/button";
import Card from "../card/card";
import styles from "../adicionar/adicionar.module.css"
import { IoClose } from "react-icons/io5";


export default function Editar({editar,setEditar, value, setValue, id, children, setNewData, newData}) {

  async function handleSubmit(e) {
    e.preventDefault()
    setEditar(false)

    await fetch("/api/estoque/editar", {
      method: "POST",
      body: JSON.stringify({id:id, value: value})
    })
    .then(() => {
      setNewData(!newData)
    })

    
  }

  return(
    editar ? (
      <div className={styles.conteiner}>
        <Card>
          <div onClick={(() => setEditar(false))} className={styles.fechar}>
            <IoClose/>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <input
                type="number"
                value={value}
                name="newValue"
                onChange={(e) => setValue(e.target.value)}
                min={0}
                autoFocus
              />
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