import { useContext } from "react";

import Grid from "../components/Grid";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import "../styles/Listings.css";

function Listings() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="button-container">
        {user ? (
          <NavLink to={"/newlisting"}>
            <Button>Add new listing</Button>
          </NavLink>
        ) : (
          ""
        )}
      </div>
      <Grid />
    </>
  );
}

export default Listings;
