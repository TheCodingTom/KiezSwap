import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

function NewListing() {

  
  const submitNewListing = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2M4NWJkNTE1YjA5YjRjYzFkZDgxZmUiLCJpYXQiOjE3NDE1MjIxNTgsImV4cCI6MTc0MTYwODU1OH0.O5P-GC9ffj6LlzPqnrmryJ4J3B2DCz9yGHRsUyXOOHU"
    );

    const formdata = new FormData();
    formdata.append("name", "Brown leather bag");
    formdata.append("description", "Really good condition, like new");
    formdata.append("city", "Berlin");
    formdata.append("district", "Kreuzberg");
    formdata.append("user", "67cd9514ba8b5ff20798d648");
    // formdata.append("image", fileInput.files[0], "leather-bag-gray.jpg");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
     
    };

    fetch("http://localhost:4000/api/listings/newlisting", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <h1>Add new listing</h1>

      <div className="form-container">
        <form className="register-form">
          <TextField label="Name" variant="outlined" name="name" />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
          />
          <TextField label="C" variant="outlined" name="password" />

          {/* <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
          <button>Upload image</button>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview of avatar image"
              style={{ width: "100px" }}
            />
          )} */}
        </form>
        <Button>Submit</Button>
      </div>
    </>
  );
}

export default NewListing;
