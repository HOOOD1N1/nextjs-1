import Price from "@/app/components/Price";
import { Cuisine, Location, PRICE, Review } from "@/prisma/generated/prisma/client";
import { calculateReviewRatingAverage } from "@/utilities/calculateReviewRatingAverage";
import Link from "next/link";


interface Restaurant {
  id: number,
  name: string,
  price: PRICE,
  main_image: string,
  cuisine: Cuisine,
  location: Location,
  slug: string,
  reviews: Review[]
}

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {

  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews);

    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good"
    else if (rating <= 3 && rating > 0) return "Average"
    else ""
  }

  return (
    <div className="border-b flex pb-5 ml-4 h-40">
      <img
        src={restaurant.main_image}
        alt=""
        className="w-44 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>

    </div>
  );
}