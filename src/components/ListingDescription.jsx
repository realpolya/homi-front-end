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
            {/* This allows the decription to show only 100 characters and the '...' just shows there is more content to see*/}
        <p>{isSeeMore
            ? property.description
            : `${property.description.slice(0, 60)}...`} 
          {/* The toggle function will allow the functionallity 'see more' and 'see less'. Basically true or false allowing the expasion after click */}
          {/* The span just keeps the text from creating a line break and calls toggleSeeMore, switching between expanded and collapsed states as you see above. */}
          <span onClick={toggleSeeMore} className="text-teal-500 cursor-pointer">
            {isSeeMore ? " see less" : " see more"}
          </span></p>
        </div>
    </div>
  )
}
