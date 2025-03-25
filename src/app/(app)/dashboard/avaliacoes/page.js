"use client"

import { useEffect, useState } from "react"
import styles from "./avaliacoes.module.css"
import Image from "next/image"
import Loading from "@/app/components/loading/Loading"

export default function Avaliacoes() {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [stars, setStars] = useState([
    ["/starVoid.png","/starVoid.png","/starVoid.png","/starVoid.png","/starVoid.png"],
    ["/starVoid.png","/starVoid.png","/starVoid.png","/starVoid.png","/starVoid.png"],
    ["/starVoid.png","/starVoid.png","/starVoid.png","/starVoid.png","/starVoid.png"],
    ["/starVoid.png","/starVoid.png","/starVoid.png","/starVoid.png","/starVoid.png"]
  ])
  const [rating, setRating] = useState(0)
  const [food, setFood] = useState(0)
  const [time, setTime] = useState(0)
  const [recomendation, setRecomendation] = useState(0)
  const [comments, setComments] = useState([])
  
  function starsUpdate(avarageFloat, key) {
    let avarageInt = parseInt(avarageFloat)
    let floatPart = (avarageFloat - avarageInt).toFixed(1)
    if(avarageInt > key){
      return "/starFull.png"
    }
    if(avarageInt === key){
      console.log(avarageFloat)
      console.log(avarageInt)
      console.log(floatPart)
      if(floatPart > 0 && floatPart <= 0.3){
        return "/starDot3.png"
      }
      if(floatPart > 0.3 && floatPart <= 0.6){
        return "/starDot5.png"
      }
      if(floatPart > 0.6){
        return "/starDot7.png"
      }
    }
    return "/starVoid.png"
  }
  
  useEffect(() => {
    fetch("/api/avaliacao")
    .then((res) => {
      res.json()
      .then((data) => {
        setLoading(false)
        
        setRating(data.rating)
        setFood(data.food)
        setTime(data.time)
        setRecomendation(data.recomendation)
        setComments(data.comments)
        setData(data)
      })
    })
    .catch(() => {
      console.log("api erro")
    })
  },[])

  useEffect(() => {

    if(data){

      let newStars = []

      let avarages = [rating, food, time, recomendation]
  
      let starlines

      stars.map((images, StarKey) => {
        starlines = []
        images.map((image, key) => {
          starlines.push(starsUpdate(avarages[StarKey], key))
        })
        newStars.push(starlines)
      })

      setStars(newStars)
    }
  }, [data])
  
  
  return(
    <Loading loading={loading}>
      <div className={styles.conteiner}>
        <div className={styles.avarages}>
          <div>
            <p>Média: {rating}</p>
            {
              stars[0].map((star,key) => (
                <Image
                  src={star}
                  width={25}
                  height={25}
                  alt="estrelas de avalição do nosso serviço"
                  key={key}
                  className={styles.image}
                />
              ))
            }
          </div>
          <div>
            <p>Média comida: {food}</p>
            {
              stars[1].map((star,key) => (
                <Image
                  src={star}
                  width={25}
                  height={25}
                  alt="estrelas de avalição do nosso serviço"
                  key={key}
                  className={styles.image}
                />
              ))
            }
          </div>
          <div>
            <p>Média tempo: {time}</p>
            {
              stars[2].map((star,key) => (
                <Image
                  src={star}
                  width={25}
                  height={25}
                  alt="estrelas de avalição do nosso serviço"
                  key={key}
                  className={styles.image}
                />
              ))
            }
          </div>
          <div>
            <p>Média recomendação: {recomendation}</p>
            {
              stars[3].map((star,key) => (
                <Image
                  src={star}
                  width={25}
                  height={25}
                  alt="estrelas de avalição do nosso serviço"
                  key={key}
                  className={styles.image}
                />
              ))
            }
          </div>
        </div>
        <div className={styles.comments}>
          {
            comments.map((comment, key) => (
              comment && (
                <div key={key} className={styles.comment}>
                  {comment}
                </div>
              )
            ))
          }
        </div>
      </div>
    </Loading>
  )
}