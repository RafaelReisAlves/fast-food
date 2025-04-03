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
      <p>Inspirado na árvore nativa brasileira, conhecida por sua resistência e aroma inconfundível, o Amburana traz o melhor da culinária nacional em formato fastfood, com pratos que representam a diversidade de sabores e a riqueza da nossa terra. A proposta é oferecer uma experiência de refeições rápidas, mas com a autenticidade e o frescor dos ingredientes brasileiros.</p>
      <Link href="/menu">
        <div className={styles.fpedido}>FAÇA SEU PEDIDO</div>
      </Link>
    </div>
  )
}