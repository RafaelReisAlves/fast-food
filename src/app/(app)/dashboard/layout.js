"use client"

import Link from "next/link";
import styles from "./layout.module.css"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function RootLayout({ children }) {
  
  const pathName = usePathname()

  const [pedidos, setPedidos] = useState(false)
  const [avalicao, setAvalicao] = useState(false)
  const [estoque, setEstoque] = useState(false)
  const [registros, setRegistros] = useState(false)

  const [menu, setMenu] = useState(false)

  useEffect(() => {
    console.log(pathName)
    if(pathName === "/dashboard"){
      setPedidos(true)
      setAvalicao(false)
      setEstoque(false)
      setRegistros(false)
    }
    if(pathName === "/dashboard/avaliacoes"){
      setPedidos(false)
      setAvalicao(true)
      setEstoque(false)
      setRegistros(false)
    }
    if(pathName === "/dashboard/estoque"){
      setPedidos(false)
      setAvalicao(false)
      setEstoque(true)
      setRegistros(false)
    }
    if(pathName === "/dashboard/registros"){
      setPedidos(false)
      setAvalicao(false)
      setEstoque(false)
      setRegistros(true)
    }
    
  }, [pathName])


  return (
    <div className={styles.conteiner}>
      <div className={styles.conteinerDashboard}>
        <div onClick={() => setMenu(!menu)} className={styles.menuButton}>
          <RxHamburgerMenu strokeWidth={1} />
        </div>
        <nav className={`${styles.navigation} ${menu ? styles.navigationOn : styles.navigationOff}`}>
          <ul>
            <div style={pedidos ? {backgroundColor: "#222"} : {backgroundColor:"#111"}}>
              <Link href={"/dashboard"}><li>Pedidos</li></Link>
            </div>
            <div style={estoque ? {backgroundColor: "#222"} : {backgroundColor:"#111"}}>
              <Link href={"/dashboard/estoque"}><li>Estoque</li></Link>
            </div>
            <div style={avalicao ? {backgroundColor: "#222"} : {backgroundColor:"#111"}}>
              <Link href={"/dashboard/avaliacoes"}><li>Avaliações</li></Link>
            </div>
            <div style={registros ? {backgroundColor: "#222"} : {backgroundColor:"#111"}}>
              <Link href={"/dashboard/registros"}><li>Registros</li></Link>
            </div>
          </ul>
        </nav>
        {children}
      </div>
    </div>
  );
}
