import React from 'react'
import { Link } from 'react-router-dom'

export function ListingCard({listing}) {
  return (
    <Link to={`/listing/${listing.id}`}>
        <div className='card'>
            <img src={listing.first_photo.link} alt={listing.title} />
            <div>
                <p>{listing.title}</p>
                <p>from ${listing.price_per_night} a day.</p>
            </div>
        </div>
    </Link>
  )
}

