import { Image, Container, Button, Col, Row, Modal } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import AlertDismissibleExample from '../Alert';

function PetInfoModal(props) {

  const { addPetIntoCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [message, setMessage] = useState("");
  function hideAlert() {
    setShowAlert(false);
  }

  return (
    <>
      <Modal
        show={props.showModal}
        onHide={props.handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{props.pet.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Image src={props.pet.pic} fluid />
              </Col>
              <Col>
                <h5>Species: {props.pet.species}</h5>
                <h5>Color: {props.pet.color}</h5>
                <h5>Age: {props.pet.age}</h5>
                <h5>Gender: {props.pet.gender}</h5>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
            <AlertDismissibleExample 
              show={showAlert}
              success={addSuccess}
              message={message}
              hideAlert={hideAlert}
              />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            props.handleCloseModal();
            hideAlert();
          }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            const [success, message] = addPetIntoCart(props.pet);
            setShowAlert(true);
            setAddSuccess(success);
            setMessage(message);
          }}>Adopt</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PetInfoModal;