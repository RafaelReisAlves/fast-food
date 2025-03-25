import Link from "next/link"
import styles from "./home.module.css"
import Image from "next/image"
import localFont from "next/font/local"

const myFont = localFont({
  src: "./fonts/Elronmonospace.ttf"
})

export default function Home() {

  return(
    <div className={styles.conteiner}>
      <div>
        <Image alt="Logo Amburana" src="/logo.png" width={500} height={500}/>
        <div className="font">AMBURANA</div>
      </div>
      <Link href="/menu">
        <div>Fazer pedido</div>
      </Link>
    </div>
  )
}