import { redirect } from "next/navigation"
import ratingModel from "../../../models/avaliação"

export async function GET() {

  const data = await ratingModel.findAll()
  
  let sumRating = 0
  let sumFood = 0
  let sumTime = 0
  let sumRecomendation = 0
  
  data.map(ratings =>{
    
    sumRating = sumRating + ratings.rating
    sumFood = sumFood + ratings.food
    sumTime = sumTime + ratings.time
    sumRecomendation = sumRecomendation + ratings.recomendation
    
  })

  sumRating = sumRating/data.length
  sumFood = sumFood/data.length
  sumTime = sumTime/data.length
  sumRecomendation = sumRecomendation/data.length

  let avarageRating = Number(sumRating.toFixed(1))
  let avarageFood = Number(sumFood.toFixed(1))
  let avarageTime = Number(sumTime.toFixed(1))
  let avarageRecomendation = Number(sumRecomendation.toFixed(1))


  const comments = data.map((ratings) => {
    return ratings.comment
  })

  return Response.json(
    {
      rating: avarageRating,
      food: avarageFood,
      time: avarageTime,
      recomendation: avarageRecomendation,
      comments: comments
    }
  )
}

export async function POST(req) {

  const formData = await req.formData()

  console.log(formData)
  const rating = formData.get('rating')
  const food = formData.get("food")
  const time = formData.get("time")
  const recomendation = formData.get("recomendation")
  const comment = formData.get("comment")
  
  ratingModel.create({
    rating: rating,
    food: food,
    time: time,
    recomendation: recomendation,
    comment: comment
  })

  redirect("/thanks")
}