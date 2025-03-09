import { useContext } from "react";

import Grid from "../components/Grid";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

function Listings() {
  
  const {user} = useContext(AuthContext)

  return (
    <>
      {user ? <NavLink to={"/newlisting"}><Button>Add new listing</Button></NavLink> : ""}
      <Grid />
    </>
  );
}

export default Listings;
