'use client'

import { usePathname } from 'next/navigation';
import Image from "next/image";
import styles from "./template.module.css"

export default function Template({children}) {
  const pathname = usePathname();

  const isThanksPage = pathname === '/thanks';

  return (
    <>
        {!isThanksPage && (
            <div className={styles.conteiner}>
                <Image src="/logo.png" alt="Logo Amburana" width={200} height={200} priority/>
                <div className="font">AMBURANA</div>
            </div>
        )}
        <div className={styles.conteinerChildren}>
            {children}
        </div>
    </>
  )
}