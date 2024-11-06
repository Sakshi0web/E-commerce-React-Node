import React, { useContext,  useEffect  } from 'react'
import './CartItems.css'
import {ShopContext} from '../../Context/ShopContext'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import remove_icon from '../Assets/cart_cross_icon.png'
// import minus_icon from '../Assets/minus_icon.png'
// import plus_icon from '../Assets/plus_icon.jpg'


const CartItems = (props) => {
  const { selectedSize } = props;
  const {getTotalCartAmount,all_product,cartItems,removeFromCart,Plus,Minus} = useContext(ShopContext);
  
  
  useEffect(() => {
    console.log('Selected Size:', selectedSize); // Log the selected size whenever it changes
  }, [selectedSize]);
  // useEffect(() => {
  //   console.log('Selected Size:', props.selectedSize); // Log the selected size whenever it changes
  // }, [props.selectedSize]);
  
 

  // const handleSizeClick = (size) => {
  //   setSelectedSize(size);
  //   console.log('Current selected size:', selectedSize);
  // };
  // const Plus = (itemId) => {
  //   // Placeholder logic for Plus function
  //   console.log(`Plus button clicked for item ${itemId}`);
  // };

  // const Minus = (itemId) => {
  //   // Placeholder logic for Minus function
  //   console.log(`Minus button clicked for item ${itemId}`);
  // };
  
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Variations</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        
        {
          return  <div>
           <div className='cartitems-format cartitems-format-main'>
              <img src={e.image} alt='' className='carticon-product-icon' />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              {/* <button className='cartitems-quantity'>{cartItems[e.id]}</button> */}
              <div className="cartitems-quantity">
                <input type="number" value={cartItems[e.id]} readOnly />
                {/* <img className='arrow-plus' src={plus_icon} onClick={()=>{Plus(e.id)}} alt='' />
                <img className='arrow-minus' src={minus_icon} onClick={()=>{Minus(e.id)}} alt='' /> */}
                
                <span className='arrow-plus' onClick={() => Plus(e.id)}>
                    <KeyboardArrowUpIcon />
                </span>
                <span className='arrow-minus' onClick={() => Minus(e.id)}>
                      <KeyboardArrowDownIcon />
                </span>

              </div>
              {/* <button className='cartitems-variations'>{cartItems[e.id].size}</button> */}
               {/* <p><b>Size:</b> {e.size*cartItems[e.id]}
                  Color: {e.color}
               </p>  */}
               {/* <p><b>Size:</b> {selectedSize}, <b>Color:</b> {selectedColor}</p> */}
               {/* <p><b>Size:</b> {e.size}</p> */}
               <p><b>Size:</b>{selectedSize} </p>
               {/* <p onClick={() => handleSizeClick(e.size)}><b>Size:</b> {e.size}</p> */}
               {/* <p onClick={() => handleSizeClick(selectedSize)}><b>Size:</b> {selectedSize}</p> */}
              <p>${e.new_price*cartItems[e.id]}</p>
              <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt='' />
           </div>
           <hr />
          </div>      
        }
        return null;
      })} 
  
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type='text' placeholder='Promo Code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
