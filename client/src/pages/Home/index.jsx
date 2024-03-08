import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Image } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import petInfo from '../../utils/seedPetData';
import PetInfoModal from '../../components/PetInfoModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [pet, setPet] = useState({});
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  return (

    <div className="App">
      <PetInfoModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        pet={pet} />
      <Row xs={1} md={2} lg={2} className="g-4" style={ {width: "100%", margin: "0 auto"} }>
        {petInfo.slice(0, 4).map((x, index) => (
          <Col key={index}>
            <Card border="info" width="900px" style={{ height: '700px' }}>
              <Card.Title>{x.title}</Card.Title>
              <Card.Img width="900px" height='500px' style={{ objectFit: "cover" }}variant="top" src={x.pic}  />
              <Card.Body>
                <h5>{x.name}</h5>
                <Button variant="primary" onClick={() => {
                  handleShowModal();
                  setPet(x)
                }}>Detail for Adoption</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}


export default Home