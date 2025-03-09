import  { useContext } from 'react'
import { ListingsContext } from '../context/ListingsContext';
import ListingCard from './ListingCard';

function Grid() {
const {listings} = useContext(ListingsContext)
console.log(listings);

  return (
    <div className="cards-container">
      {listings &&
        listings.map((listing) => {
          return <ListingCard listing={listing} key={listing._id} />;
        })}
    </div>
  )
}

export default Grid