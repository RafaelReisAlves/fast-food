import Image from "next/image"
import styles from "./thanks.module.css"

export default function Thanks() {
    return (
        <div className={styles.containerThanks}>
            <Image
                src="/logo.png"
                alt="Logo Amburana"
                width={200}
                height={200}
                className={styles.logo}
                priority
            />
            <h1>AMBURANA</h1>
            <p>AGRADECEMOS SUA PARTICIPAÇÃO!</p>
        </div>
    )
}