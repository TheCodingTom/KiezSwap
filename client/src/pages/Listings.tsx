import { useContext } from "react";
import { ListingsContext } from "../context/ListingsContext";
import Grid from "../components/Grid";

function Listings() {
  const { listings } = useContext(ListingsContext);
  console.log("listings :>> ", listings);
  return (
    <Grid/>
  );
}

export default Listings;
