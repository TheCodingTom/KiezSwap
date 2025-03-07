import { useContext } from "react";
import { ListingsContext } from "../context/ListingsContext";
import Grid from "../components/Grid";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

function Listings() {
  const { listings } = useContext(ListingsContext);
  const {user} = useContext(AuthContext)
  console.log("listings:>> ", listings);

  return (
    <>
      {user ? <NavLink to={"/newlisting"}><Button>Add new listing</Button></NavLink> : ""}
      <Grid />
    </>
  );
}

export default Listings;
