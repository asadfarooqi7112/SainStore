import { Offcanvas, Stack, Button } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import CartItem from './CartItem'
import { useProductsContext } from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';


export default function ShoppingCart(props) {
    const {closeCart, cartItems} = useShoppingCart()
    const {productsData} = useProductsContext();
    const navigate = useNavigate();
    const isSmallDevice = useMediaQuery('(max-width: 768px)')

    function handleCheckout(){
        closeCart()
        navigate("/checkout")
    }
  return (
    <Offcanvas show={props.isOpen} onHide={closeCart} placement='end' style={{width: isSmallDevice ? "250px" : ""}}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack>
              {cartItems.map((item,index)=>
                (<CartItem key={index} {...item}/>)
              )}
              {cartItems.length!==0 && <div className='ms-auto fw-bold fs-5'>
                  Total: Rs. {cartItems.reduce((total, cartItem) => {
                  const item = productsData.find(item => item.product_id === cartItem.id);
                  return total + ((item?.sale_price ?? item?.price) || 0) * cartItem.quantity;
              }, 0).toFixed(2)}
              </div>}
              {cartItems.length!==0 && <Button style={{marginTop:"20px", width:"100%", height: "50px", fontSize:20,}} variant="secondary" onClick={handleCheckout}>Check Out</Button>}
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>

  )
}
