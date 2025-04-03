import Image from "next/image";
import styles from "./template.module.css"

export default function Template({children}) {
 
  return (
    <>
      <div className={styles.conteiner}>
        <Image src="/logo.png" alt="Logo Amburana" width={300} height={300} priority/>
        <div className="font">AMBURANA</div>
      </div>
      <div className={styles.conteinerChildren}>
        {children}
      </div>
    </>
  )
}
