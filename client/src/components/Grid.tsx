import  { useContext } from 'react'
import { ListingsContext } from '../context/ListingsContext';
import ListingCard from './ListingCard';
import { AuthContext } from '../context/AuthContext';

function Grid() {
const {listings} = useContext(ListingsContext)
const {user} = useContext(AuthContext)
console.log(listings);
console.log(user);

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