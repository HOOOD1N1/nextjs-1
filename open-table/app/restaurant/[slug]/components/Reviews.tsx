import { Review } from '@/prisma/generated/prisma/client'
import React from 'react'
import ReviewCard from './ReviewCard'

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} {reviews.length > 1 ? "people are" : "person is"} saying
      </h1>
      <div>
        {reviews.map(review => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    </div>
  )
}
