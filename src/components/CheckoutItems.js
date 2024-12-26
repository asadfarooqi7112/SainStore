import { useProductsContext } from '../context/ProductsContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import "./CheckoutItems.css"

export default function CheckoutItems({id, color, quantity}) {
const {productsData} = useProductsContext();

const isSmallDevice = useMediaQuery('(max-width: 768px)');

const item = productsData.find(item=>item.product_id===id)
if(item==null) return null

return (
    <div direction='horizontal' gap={2} className='cart-item_container'>
        <div style={{display:"flex",gap:"5px",}}>
            <img src={item.productimages[0].image_url} style={{width:"100px", height:"75px", objectFit:"cover"}} alt='Product'/>
            <div className='name-price_container'>
                <div>
                    {item.name}
                </div>
                <div className='text-muted' style={isSmallDevice?priceColorContainerSmallerDevices:priceColorContainer}>
                    <p>Rs. {item.sale_price?item.sale_price:item.price} {quantity>1 && <span className='text-muted' style={{fontSize:"0.65rem"}}> x{quantity}</span>}</p>
                    <p>Color: {color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}</p>
                </div>
            </div>
        </div>
        <div className='total-price_container'>
            <div>
                Rs. {((item.sale_price?item.sale_price:item.price)*quantity).toFixed(2)}
            </div>
        </div>
    </div>
)
}


const priceColorContainer={
    fontSize:"0.75rem",
    display:"flex",
    gap: "100px"
}
const priceColorContainerSmallerDevices={
    fontSize:"0.75rem",
    display:"flex",
    flexDirection:"row",
    justifyContent: 'space-between',
}

