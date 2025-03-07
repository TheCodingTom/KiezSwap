import { TextField } from '@mui/material'
import { Button } from 'react-bootstrap'

function NewListing() {
  return (
    <>
    <h1>Add new listing</h1>

    <div className="form-container">
      <form className="register-form">
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
        
        />
        <TextField
          label="C"
          variant="outlined"
          name="password"
        
        />

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
  )
}

export default NewListing