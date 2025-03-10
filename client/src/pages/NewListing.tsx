import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function NewListing() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    district: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) {
      console.error("No auth token found");
      return;
    }

    if (user) {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("district", formData.district);
      form.append("user", user.id);
      // form.append("image", selectedFile);

      try {
        const response = await fetch(
          "http://localhost:4000/api/listings/newlisting",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: form,
          }
        );

        const result = await response.json();
        console.log(result);
        alert("Listing added successfully!");
      } catch (error) {
        console.error("Error uploading listing:", error);
      }
    }
  };

  return (
    <>
      <h1>Add new listing</h1>

      <div className="form-container">
        <form className="register-form" >
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            label="District"
            variant="outlined"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
          />

          {/* <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )} */}
        </form>
      </div>
      <Button onClick={handleFormSubmit}>Submit</Button>
    </>
  );
}

export default NewListing;
