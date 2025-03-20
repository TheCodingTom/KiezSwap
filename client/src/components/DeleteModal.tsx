import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type DeleteModalProps = {
  handleDeleteListing: () => Promise<void>;
};

function DeleteModal({ handleDeleteListing }: DeleteModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Watch out!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your listing?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, I was joking
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteListing();
              handleClose();
            }}
          >
            Yes, trash that thing!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
