import Header from "./components/Header"
import Form from "./components/Form"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

const fetchRestaurantBySlug = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        }
    })

    if(!restaurant){
        notFound()
    }

    return restaurant
}

export default async function Reservation({
    params,
    searchParams

  } : {
    params: {slug: string}
    searchParams: {date: string; partySize: string}
  } ) {

    const restaurant = await fetchRestaurantBySlug(params.slug)

    return (
        <div className="bg-white">
            <div className="py-9 flex flex-col items-center">
                <Header 
                    image={restaurant.main_image}
                    name={restaurant.name}
                    date={searchParams.date}
                    partySize={searchParams.partySize}
                />
                <Form 
                    slug={params.slug}
                    date={searchParams.date}
                    partySize={searchParams.partySize} 
                />
            </div>
        </div>
    )
}