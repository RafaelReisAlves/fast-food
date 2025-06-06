﻿"use client"

import Image from "next/image"
import styles from "./rating.module.css"
import { useEffect, useState } from "react"
import Card from "@/app/components/card/card"
import Button from "@/app/components/button/button"

export default function Rating() {

  const [disabled, setDisabled] = useState(true)
  
  const [rating, setRating] = useState(0)
  const [food, setFood] = useState(0)
  const [time, setTime] = useState(0)
  const [recomendation, setRecomendation] = useState(0)
  const [comment, setComment] = useState("")

  const questions = [
    {
      name: "rating",
      value: rating,
      setvalue: setRating,
      pergunta: "Como você avalia sua experiência geral?",
      descricao: "(Considere 1 para muito ruim e 5 para excelente)",
    },
    {
      name: "food",
      value: food,
      setvalue: setFood,
      pergunta: "Como você avalia a qualidade da comida?",
      descricao: "(Considere 1 para muito ruim e 5 para excelente)"
    },
    {
      name: "time",
      value: time,
      setvalue: setTime,
      pergunta: "Como você avalia o tempo de atendimento?",
      descricao: "(Considere 1 para muito demorado e 5 para rapido)",
    },
    {
      name: "recomendation",
      value: recomendation,
      setvalue: setRecomendation,
      pergunta: "Você recomendaria nosso fast food para alguém?",
      descricao: "(Considere 1 para nunca e 5 para com certeza)"
    },
    {
      name: "comment",
      pergunta: "Deixe aqui suas críticas, elogios ou sugestões:",
      descricao: "(Opcional)",
      value: comment
    }
  ]
  
  const [imagesArr, setImages] = useState([
    {
      Images: [
        {
          image: "/logo-void.png",
          id: 1
        },
        {
          image: "/logo-void.png",
          id: 2
        },
        {
          image: "/logo-void.png",
          id: 3
        },
        {
          image: "/logo-void.png",
          id: 4
        },
        {
          image: "/logo-void.png",
          id: 5
        },
      ]
    },
    {
      Images: [
        {
          image: "/logo-void.png",
          id: 1
        },
        {
          image: "/logo-void.png",
          id: 2
        },
        {
          image: "/logo-void.png",
          id: 3
        },
        {
          image: "/logo-void.png",
          id: 4
        },
        {
          image: "/logo-void.png",
          id: 5
        },
      ]
    },
    {
      Images: [
        {
          image: "/logo-void.png",
          id: 1
        },
        {
          image: "/logo-void.png",
          id: 2
        },
        {
          image: "/logo-void.png",
          id: 3
        },
        {
          image: "/logo-void.png",
          id: 4
        },
        {
          image: "/logo-void.png",
          id: 5
        },
      ]
    },
    {
      Images: [
        {
          image: "/logo-void.png",
          id: 1
        },
        {
          image: "/logo-void.png",
          id: 2
        },
        {
          image: "/logo-void.png",
          id: 3
        },
        {
          image: "/logo-void.png",
          id: 4
        },
        {
          image: "/logo-void.png",
          id: 5
        },
      ]
    }
  ])

  function updateImages(questionKey, rating) {

    const newImages = imagesArr[questionKey].Images.map((image, key) => {
      if(rating > key){
        return {
          ...image,
          image: "/logo-full.png"
        }
      }else{
        return {
          ...image,
          image: "/logo-void.png"
        }
        
      }
    })
    const newQuestionImages = imagesArr.map((imageObj, key) => {
      if(questionKey == key){
        return {
          ...imageObj,
            Images: newImages
        }
      }
      return imageObj
    })
    setImages(newQuestionImages)
  }

  useEffect(() => {
    if(rating > 0 && food > 0 && time > 0 && recomendation > 0){
      setDisabled(false)
    }
  },[imagesArr])

  return(
    <form action={"/api/avaliacao"} method="post">
      <Card className={styles.card}>
        <div>
          <h1>DEIXE SUA AVALIAÇÃO</h1>
          {
            questions.map((question, questionKey) => (
                <div key={questionKey}>
                  <div>
                    <p className={styles.pergunta}>{question.pergunta}</p>
                    <p className={styles.descricao}>{question.descricao}</p>
                  </div>
                  <div style={{display: "flex", justifyContent: "center"}}>
                    {
                      imagesArr[questionKey] ? (
                          imagesArr[questionKey].Images.map((image, imageKey) => (
                              <div key={imageKey}>
                                <Image
                                    src={image.image}
                                    width={500}
                                    height={500}
                                    alt="estrela para avaliar nosso serviço"
                                    key={imageKey}
                                    className={styles.image}
                                    onClick={() => {
                                      updateImages(questionKey, image.id)
                                      question.setvalue(image.id)
                                    }}
                                />
                              </div>
                          ))
                      ) : (
                          <div className={styles.comment}>
                        <textarea
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                          </div>
                      )
                    }
                  </div>
                  <input type="hidden" value={question.value} name={question.name}/>
                </div>
            ))
          }
        </div>
      </Card>
      <Button disabled={disabled} text={"ENVIAR"} />
    </form>
  )
}