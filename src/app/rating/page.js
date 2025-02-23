"use client"

import Image from "next/image"
import styles from "./rating.module.css"
import { useState } from "react"

export default function Rating() {

  const [stars, setStars] = useState([
    {
      image:"/star1.jpg"
    },
    {
      image:"/star1.jpg"
    },
    {
      image:"/star1.jpg"
    },
    {
      image:"/star1.jpg"
    },
    {
      image:"/star1.jpg"
    },
  ])
  const [rating, setRating] = useState(0)

  function updateStars(rating) {
    const newStars = stars.map((star, key) => {
      if(rating >= key){
        return {
          image: "/star2.jpg"
        }
      }else{
        return {
          image: "/star1.jpg"
        }
      }
    })
    setRating(rating)
    setStars(newStars)
  }


  return(
    <div className={styles.conteiner}>
      <form action={"/api"} method="post">
        <div>
          {
            stars.map((star,key) => (
              <Image
                src={star.image}
                width={50}
                height={50}
                alt="estrela para avaliar nosso serviço"
                key={key}
                className={styles.image}
                onClick={() => updateStars(key)}
              />
            ))
          }
          <input type="hidden" name="rating" value={rating}/>
        </div>
        <button>Enviar</button>
      </form>
    </div>
  )
}