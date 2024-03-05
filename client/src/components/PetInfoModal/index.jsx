import { useState } from 'react';
import { Image, Container, Button, Card, Col, Row, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function PetInfoModal(props) {
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={props.handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
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
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">Adopt</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PetInfoModal;