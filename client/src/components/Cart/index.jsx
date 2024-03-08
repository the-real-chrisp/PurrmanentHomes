import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, Image, Col} from 'react-bootstrap';
import { useCart } from '../../context/CartContext';

export default function Cart(props) {
    const { removePetFromCart , getCartItems} = useCart();
    const itemsInCart = getCartItems();
    return (
        <>
            <Offcanvas show={props.show} onHide={props.handleCloseCart} placement={props.placement} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                {
                    (itemsInCart == null || itemsInCart.length == 0)
                        ?
                        <Offcanvas.Body>
                            No pet in cart.
                        </Offcanvas.Body>
                        :
                        <Offcanvas.Body className='d-flex flex-column align-items-center' style={{ gap: ".5rem" }}>
                            {itemsInCart.map((pet, index) =>
                                <Col key={index} className='d-flex flex-column align-items-center'>
                                    <Image src={pet.pic} fluid style={{ objectFit: "cover" }}/>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        {pet.name}
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        Service Fee: $50
                                    </div>
                                    <Button variant='danger' onClick={() => { removePetFromCart(pet.id) }} className='d-flex align-items-center justify-content-center'>Remove</Button>
                                </Col>
                            )}
                        </Offcanvas.Body>
                }
                <Button>Checkout</Button>
            </Offcanvas>
        </>
    );
}