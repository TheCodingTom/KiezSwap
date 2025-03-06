import React, { useContext } from 'react'
import { ListingsContext } from '../context/ListingsContext';

function Grid() {
const {listings} = useContext(ListingsContext)

  return (
    <div className="cards-container">
      {listings &&
        listings.map((listing) => {
          return <CountryCard listing={listing} key={listing._id} />;
        })}
    </div>
  )
}

export default Grid