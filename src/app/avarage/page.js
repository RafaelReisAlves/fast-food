"use client"

import { useEffect, useState } from "react"

export default function Avarage(){

  const [data, setdata] = useState([])

  function getData() {
    fetch("/api")
    .then(res => {
      res.json().then(data => {
        setdata(data)
        console.log(data)
      })
    })
    .catch(() => {
      console.log("erro")
    })
  }

  useEffect(() =>{
    getData();
  }, [])
  
  return(
    <div>
      Media:{data}
    </div>
  )
}