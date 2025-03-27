"use client"

import Image from "next/image";
import styles from "./template.module.css"
import { usePathname } from "next/navigation";

export default function Template({children}) {

  const path = usePathname()
 
  return (
    <>
      <div className={`${styles.conteiner} ${path === "/menu" && styles.conteinerAnimation}`}>
        <Image src="/logo.png" alt="Logo Amburana" width={300} height={300} priority/>
        <div className="font">AMBURANA</div>
      </div>
      <div className={styles.conteinerChildren}>
        {children}
      </div>
    </>
  )
}
