import React, {createContext, useEffect, useState} from "react";


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++){
        cart[index] = 0;
        //cart[index] = { quantity: 0, size: null }; // Include size in cart items
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());
    
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[]);

    const addToCart = (itemId, size) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
        // setCartItems((prev) => ({
        //     ...prev,
        //     [itemId]: { quantity: prev[itemId].quantity + 1, size: size } // Update size in cart item
        // }));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/removefromcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                    },
                    body: JSON.stringify({ itemId }),
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.error('Error removing from cart on server:', error));
            }
        }
    };
    

    const Plus = (itemId) => {
        // Implement logic to increment quantity
        if (cartItems[itemId] >= 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/updatecart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                    },
                    body: JSON.stringify({ itemId, quantity: cartItems[itemId] + 1 }),
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data));
            }
        }
    };
    
    const Minus = (itemId) => {
        // Implement logic to decrement quantity
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/updatecart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                    },
                    body: JSON.stringify({ itemId, quantity: cartItems[itemId] - 1 }),
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data));
            }
        }
    };


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };
    
    const getTotalCartItems = () => {
        let totalUniqueItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalUniqueItems++;
            }
        }
        return totalUniqueItems;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,Plus,Minus};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;