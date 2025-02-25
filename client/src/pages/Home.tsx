import { useContext } from "react";
import { ListingsContext } from "../context/ListingsContext";

function Home() {
  const { listings } = useContext(ListingsContext);

  return (
    <div>
      <h1>Hello World!</h1>
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
    </div>
  );
}

export default Home;
