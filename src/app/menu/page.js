"use client"

import styles from "./menu.module.css"

export default function Menu() {


  return(
    <div className={styles.conteiner}>
      <form action="api/pedido" method="post">
        <div className={styles.produto}>
          <input type="checkbox" id="salgado 1" name="salgado 1" value="salgado 1"/>
          <label htmlFor="salgado 1">Salgado 1</label>
          <input type="number" name="salgado 1 quantidade"/>
        </div>
        <div className={styles.produto}>
          <input type="checkbox" id="salgado 2" name="salgado 2" value="salgado 2"/>
          <label htmlFor="salgado 2">Salgado 2</label>
          <input type="number" name="salgado 2 quantidade"/>
        </div>
        <div className={styles.produto}>
          <input type="checkbox" id="doce 1" name="doce 1" value="doce 1"/>
          <label htmlFor="doce 1">doce 1</label>
          <input type="number" name="doce 1 quantidade"/>
        </div>
        <div className={styles.produto}>
          <input type="checkbox" id="doce 2" name="doce 2" value="doce 2"/>
          <label htmlFor="doce 2">doce 2</label>
          <input type="number" name="doce 2 quantidade"/>
        </div>
        <div className={styles.produto}>
          <input type="checkbox" id="bebida 1" name="bebida 1" value="bebida 1"/>
          <label htmlFor="bebida 1">bebida 1</label>
          <input type="number" name="bebida 1 quantidade"/>
        </div>
        <div className={styles.produto}>
          <input type="checkbox" id="bebida 2" name="bebida 2" value="bebida 2"/>
          <label htmlFor="bebida 2">bebida 2</label>
          <input type="number" name="bebida 2 quantidade"/>
        </div>
        <button>Fazer pedido</button>
      </form>
    </div>
  )
}