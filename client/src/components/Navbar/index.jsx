import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import AddPetForm from '../AddPetForm/index.jsx';
import SignupForm from '../SignupForm';
import LoginForm from '../LoginForm';
import Auth from '../../utils/auth';
import Cart from '../Cart';
import { useCart } from '../../context/CartContext';

const AppNavbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);
    const [showPetModal, setShowPetModal] = useState(false);
    const [showCart, setShowCart] = useState(false);
  
    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);
    const { getCartItems} = useCart();
    const itemsInCart = getCartItems();
    let numberOfPetsIncart = itemsInCart != null ? itemsInCart.length : 0;
    return (
      <>
        <Navbar bg='transparent' expand='lg' sticky="top" >
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>
              Purrmanent Homes
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className='me-auto'>
                <Nav.Link onClick={() => setShowPetModal(true)}> Register Your Pet For Adoption </Nav.Link>
                <Nav.Link as={Link} to='/adopt'> Adopt </Nav.Link>
                <Nav.Link as={Link} to='/shopping'>Shopping</Nav.Link>
                {/* if user is logged in show saved books and logout */}
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to='/adopt'>
                      Adopt
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                )}
                  <Nav.Link onClick={() => handleShowCart()}>Cart({numberOfPetsIncart})</Nav.Link>
              </Nav>

            </Navbar.Collapse>
            
          </Container>
        </Navbar>
        {/* set modal data up */}
        <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='signup-modal'>
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey='login'>
            <Modal.Header closeButton>
              <Modal.Title id='signup-modal'>
                <Nav variant='pills'>
                  <Nav.Item>
                    <Nav.Link eventKey='login'>Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey='login'>
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey='signup'>
                  <SignupForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
        <Modal
          size='lg'
          show={showPetModal}
          onHide={() => setShowPetModal(false)}
          aria-labelledby='addPetModal'>
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey='AddPet'>
            <Modal.Header closeButton>
              <Modal.Title id='addPet-modal'>
                Register Your Pet
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <AddPetForm handleModalClose={() => setShowPetModal(false)}/>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
        <Cart
        show={showCart}
        placement='end'
        handleCloseCart={handleCloseCart}
        />
      </>
    );
  };
  
  export default AppNavbar;
  