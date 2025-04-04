"use client"

import Link from "next/link"
import styles from "./home.module.css"
import Image from "next/image"
import { useState } from "react"

export default function Home() {

  const [video, setVideo] = useState(true)

  return(
    <div className={styles.conteiner}>
      {
        video ? (
          <video src="./logo.mp4" width="350" height="418" autoPlay muted style={{marginBottom:"270px"}} onEnded={() => setVideo(false)}/>
        ) : (
          <>
            <div>
              <Image alt="Logo Amburana" src="/logo.png" width={500} height={500}/>
              <div className={styles.text}>AMBURANA</div>
            </div>
            <p>
              Inspirado na árvore nativa brasileira, conhecida por sua resistência e aroma inconfundível, o Amburana traz o melhor da culinária nacional em formato fastfood, com pratos que representam a diversidade de sabores e a riqueza da nossa terra. A proposta é oferecer uma experiência de refeições rápidas, mas com a autenticidade e o frescor dos ingredientes brasileiros.
            </p>
            <Link href="/menu">
              <div className={styles.fpedido}>FAÇA SEU PEDIDO</div>
            </Link>
          </>
        )
      }
    </div>
  )
}