import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import goodCat from "../../assets/imgs/white_kitten.jpg"
import badCat from "../../assets/imgs/bad_kitten.jpg"
import goodDog from "../../assets/imgs/black_labrador.jpg"
import badDog from "../../assets/imgs/white_pom.jpg"
import PetInfoModal from "../../components/PetInfoModal";

let petInfo = [
  {
    title: "Good Cat of the Month",
    name: "Soju",
    species: "Cat",
    color: "White",
    age: "3 months",
    gender: "boy",
    pic: goodCat,
  },
  {
    title: "Bad Cat of the Month",
    name: "Zoe",
    species: "Cat",
    color: "Black",
    age: "4 months",
    gender: "girl",
    pic: badCat,
  },
  {
    title: "Good Dog of the Month",
    name: "Jack",
    species: "Dog",
    color: "Black",
    age: "7 months",
    gender: "boy",
    pic: goodDog,
  },
  {
    title: "Bad Dog of the Month",
    name: "Joy",
    species: "Dog",
    color: "White",
    age: "10 months",
    gender: "boy",
    pic: badDog,
  },
]

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
      <Row xs={1} md={2} className="g-4">
        {petInfo.map((x, index) => (
          <Col key={index}>
            <Card>
              <Card.Title>{x.title}</Card.Title>
              <Card.Img variant="top" src={x.pic} />
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