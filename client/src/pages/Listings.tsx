import { useContext } from 'react'
import { ListingsContext } from '../context/ListingsContext';

function Listings() {
    const { listings } = useContext(ListingsContext);
     console.log('listings :>> ', listings);
  return (
    
        <div>
        <h2>Items:</h2>
        {listings &&
          listings.map((listing) => {
            return (
              <div key={listing._id}>
                
                <p>{listing.name}</p>
              </div>
            );
          })}
      </div>
   
  )
}

export default Listings