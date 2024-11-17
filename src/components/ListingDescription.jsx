import React from 'react'

export const ListingDescription = ({property}) => {
    const [isSeeMore, isSetSeeMore] = useState(false)
    //Have to create a toggle function in order for the expand description to work
    const toggleSeeMore = () => {
        isSetSeeMore(!isSeeMore)
    }
  return (
    <div>
        <ul>
            <li>
                Max Guests: {property.maxGuests}
            </li>
            <li>
                Property Type: {property.propertyType}
            </li>
            <li>
                Cancellation Policy: {property.cancellationProperty}
            </li>
        </ul>
        <div>
        <p>{property.description}</p>
        </div>
    </div>
  )
}
