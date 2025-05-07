import { Cuisine, Location, PRICE } from "@/prisma/generated/prisma/client";
import Link from "next/link";

export default function SearchSideBar({ locations, cuisines, city, cuisine, price }: { locations: Location[], cuisines: Cuisine[], city?: string, cuisine?: string, price?: PRICE }) {

  const prices = [{
    price: PRICE.CHEAP,
    label: "$",
    className: "border w-full text-reg text-center font-light rounded-l p-2"
  }, {
    price: PRICE.REGULAR,
    label: "$$",
    className: "border w-full text-reg text-center font-light p-2"
  }, {
    price: PRICE.EXPENSIVE,
    label: "$$$",
    className: "border w-full text-reg text-center font-light rounded-r p-2"
  }]

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map(location => (
          <Link href={{
            pathname: "/search",
            query: {
              cuisine,
              price,
              city: location.name
            }
          }} className="font-light text-reg capitalize" key={location.id}>{location.name}</Link>
        ))}

      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map(cuisine => (
          <Link href={{
            pathname: "/search",
            query: {
              city,
              price,
              cuisine: cuisine.name
            }
          }}
            className="font-light text-reg capitalize" key={cuisine.id}>{cuisine.name}<br /></Link>
        ))}


      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(price => (
            <Link href={{
              pathname: "/search",
              query: {
                city,
                cuisine,
                price: price.price
              }
            }} className={price.className}>
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}