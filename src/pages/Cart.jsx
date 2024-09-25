
import React, { useEffect, useState, useContext } from 'react';
import './cart.css';
import { ShopContext } from '../context/shopcontext';

function Cart1() {
    const { userId } = useContext(ShopContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://gnp7ejkl8e.execute-api.us-east-1.amazonaws.com/prod?userId=${encodeURIComponent(userId)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const parsedData = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
                const matchedItems = parsedData.filter(item => item.userId === userId);
                setCartItems(matchedItems);
            } catch (error) {
                setError('Error loading cart items. Please try again later.');
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [userId]);

    
    

    return (
        <div className="App">
            <h1>Shopping Cart</h1>
            <div id="cart-container">
                {loading && <p className="loading-message">Loading cart items...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !userId && <p>Please log in to view your cart.</p>}
                {!loading && userId && cartItems.length === 0 && <p>Your cart is empty.</p>}
                {cartItems.map(item => (
                    <div className="cart-item" key={item.productId}>
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <button className='my-button' onClick={() => removeFromCart(item.productId)}>Remove</button>
                    </div>
                ))}
            </div>
            {cartItems.length > 0 && (
                <div className="checkout">
                    <h3>Subtotal: ${calculateSubtotal()}</h3>
                    <button className='my-buttonu' onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
}

export default Cart1;