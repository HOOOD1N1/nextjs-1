import Stars from '@/app/components/Stars'
import { Review } from '@/prisma/generated/prisma/client'
import { calculateReviewRatingAverage } from '@/utilities/calculateReviewRatingAverage'
import React from 'react'

export default function Rating({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">{calculateReviewRatingAverage(reviews).toFixed(1)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Reviews</p>
      </div>
    </div>
  )
}
