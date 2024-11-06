import React, { useState, useContext, useEffect } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import CartItems from '../CartItems/CartItems';
const ProductDisplay = (props) => {
    const {product} = props;
    const [selectedSize, setSelectedSize] = useState(null);
    //const [selectedColor, setSelectedColor] = useState(null);
    //const [mainImage, setMainImage] = useState(product.image);
    const {addToCart} = useContext(ShopContext);
    
    const handleSizeClick = (size) => {
      setSelectedSize(size);
      console.log("Selected size:", size);
    };
    useEffect(() => {
      console.log('Selected Size:', selectedSize); // Log the selected size whenever it changes
    }, [selectedSize]);

  //   const handleColorClick = (color) => {
  //     setSelectedColor(color);
  // };

    // const handleImageClick = (imageUrl) => {
    //   setMainImage(imageUrl); // Set the clicked image as the main image
    // };

    const handleAddToCart = () => {
      if (selectedSize) {
        addToCart(product.id, selectedSize );
      } else {
        alert('Please select a size before adding to cart');
      }
    };
    // const handleAddToCart = () => {
    //   if (selectedSize && selectedColor) {
    //       addToCart(product.id, selectedSize, selectedColor);
    //   } else {
    //       alert('Please select size and color before adding to cart');
    //   }
    // };
    
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        {/* <div className="productdisplay-img-list">
        {product.images.map((image, index) => (
            <img key={index} src={image} alt='' />
        ))}
        </div> */}
        {/* <div className="productdisplay-img-list">
          {product.images && product.images.map((image, index) => (
               <img key={index} src={image} alt='' />
           ))}
        </div> */}
        <div className="productdisplay-img-list">
              <img src={product.image} alt='' />
              <img src={product.image} alt='' />
              <img src={product.image} alt='' />
              <img src={product.image} alt='' />
        </div>
        {/* <div className="productdisplay-img-list">
                    {product.images && product.images.map((image, index) => (
                        <img key={index} src={product.image} alt='' onClick={() => handleImageClick(product.image)} />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={mainImage} alt='' />
                </div> */}
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt='' />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
            <img src={star_icon} alt='' />
            <img src={star_icon} alt='' />
            <img src={star_icon} alt='' />
            <img src={star_icon} alt='' />
            <img src={star_dull_icon} alt='' />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">${product.old_price}</div>
            <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
            A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size : {selectedSize}</h1>
            <div className='productdisplay-right-sizes'>
                  <div onClick={() => handleSizeClick('S')} className={selectedSize === 'S' ? 'selected' : ''}>S</div>
                  <div onClick={() => handleSizeClick('M')} className={selectedSize === 'M' ? 'selected' : ''}>M</div>
                  <div onClick={() => handleSizeClick('L')} className={selectedSize === 'L' ? 'selected' : ''}>L</div>
                  <div onClick={() => handleSizeClick('XL')} className={selectedSize === 'XL' ? 'selected' : ''}>XL</div>
                  <div onClick={() => handleSizeClick('XXL')} className={selectedSize === 'XXL' ? 'selected' : ''}>XXL</div>
            </div>   
             
        </div>
        <div className="productdisplay-right-color">
            <h1>Color</h1>
            <div className='productdisplay-right-colors'>
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
            </div>    
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span>Women, T-shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p>
      </div>
    </div>
  )
}

export default ProductDisplay
