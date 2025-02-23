import { redirect } from "next/navigation"
import ratingModel from "../../models/avaliação"

export async function GET() {

  const data = await ratingModel.findAll()
  let sum = 0

  data.map(rating =>{
    sum += rating.rating
  })
  let response = sum / data.length
  
  return Response.json(response.toFixed(1))
}

export async function POST(req) {
  const formData = await req.formData()
  const rating = Number(formData.get('rating'))+1
  
  ratingModel.create({
    rating: rating
  })

  redirect("/")
}