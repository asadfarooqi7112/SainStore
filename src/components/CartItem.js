    import { useShoppingCart } from '../context/ShoppingCartContext'
    import { Button, Stack } from 'react-bootstrap'
    import { useProductsContext } from '../context/ProductsContext';
    import "./CartItem.css"

    export default function CartItem({id, color, quantity}) {
    const {removeFromCart} = useShoppingCart()
    const {productsData} = useProductsContext();

    const item = productsData.find(item=>item.product_id===id)
    if(item==null) return null

    return (
        <Stack direction='horizontal' gap={2} className='cartItem_container'>
            <div className='image-name-price_container'>
                <img src={item.productimages[0].image_url} className='cart-product-image' alt='Product'/>
                <div className='name-price_container'>
                    <div className='item-name_container'>
                        {item.name}
                    </div>
                    <div className='text-muted' style={{fontSize:"0.75rem", display:"flex", justifyContent: 'space-between', marginRight: '15px'}}>
                        <p>Rs. {item.sale_price?item.sale_price:item.price} {quantity>1 && <span className='text-muted' style={{fontSize:"0.65rem"}}> x{quantity}</span>}</p>
                        <p>Color: {color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}</p>
                    </div>
                </div>
            </div>
            <div className='total-price-cancel_container '>
                <div>
                    Rs. {((item.sale_price?item.sale_price:item.price)*quantity).toFixed(2)}
                </div>
                <Button variant='outline-danger' size='sm' onClick={()=>removeFromCart(item.product_id, color)}>&times;</Button>

            </div>
        </Stack>
    )
}
