import Link from "next/link"
import styles from "./home.module.css"

export default function Home() {
  return(
    <div className={styles.conteiner}>
      <Link href="/menu">Fazer pedido</Link>
      <Link href="/avarage">Média</Link>
    </div>
  )
}