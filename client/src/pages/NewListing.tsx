import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { ListingsContext } from "../context/ListingsContext";

function NewListing() {
  const { user } = useContext(AuthContext);
  const { getListings } = useContext(ListingsContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    district: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];

    if (file instanceof File) {
      // if our document/image matches the File type the function will run
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
      form.append("image", selectedFile);

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
        getListings();
      } catch (error) {
        console.error("Error uploading listing:", error);
      }
    }
  };

  return (
    <>
      <h1>Add new listing</h1>

      <div className="form-container">
        <form className="register-form">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleAttachFile}
            />
          </Form.Group>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview of avatar image"
              style={{ width: "100px" }}
            />
          )}
        </form>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </div>
    </>
  );
}

export default NewListing;
