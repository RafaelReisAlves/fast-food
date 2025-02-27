"use client"

import { useEffect, useState } from "react"

export default function Avarage(){

  const [data, setdata] = useState([])

  function getData() {
    fetch("/api")
    .then(res => {
      res.json().then(data => {
        console.log(data)
        if(data > 0){
          setdata(data)
        }else{
          setdata(0)
        }
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