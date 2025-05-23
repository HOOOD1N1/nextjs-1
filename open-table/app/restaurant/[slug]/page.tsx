import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient, Review } from "@/prisma/generated/prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient;

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true
    }
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
}

export default async function RestaurantDetails(props: { params: { slug: string } }) {

  const { slug } = await props.params;
  console.log(slug);

  const restaurant = await fetchRestaurantBySlug(slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />

        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />

      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard openTime={restaurant.open_time} closeTime={restaurant.close_time} slug={restaurant.slug} />
      </div>
    </>
  );
}