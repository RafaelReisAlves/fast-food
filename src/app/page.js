import Link from "next/link"
import styles from "./home.module.css"

export default function Home() {
  return(
    <div className={styles.conteiner}>
      <Link href="/menu">
        <div>Fazer pedido</div>
      </Link>
      
      <Link href="/rating">
        <div>Avalie o restaurante</div>
      </Link>
      <Link href="/avarage">
        <div>Média</div>
      </Link>
    </div>
  )
}