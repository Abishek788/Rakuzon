import React, { useEffect, useState } from 'react';
import './cart.css'; // Assuming you have your styles in this file

const cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = 'abhisekuser@example.com'; // Hardcoded username
    const stripe = window.Stripe('pk_test_51PymWcCMwxM2KCjajwcwTY5q0DcPOc2RYFVQysFt7LcaN4Mtzrc7h6nLo59ladRqvJkkMemaef0Coh24slVlVBzk00dekGloQN'); // Your actual publishable key

    useEffect(() => {
        const fetchCartItems = async () => {
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
    }, []);

    const removeFromCart = async (productId) => {
        const payload = {
            userId: userId,
            ProductId: productId,
        };

        console.log('Attempting to remove from cart:', payload);

        try {
            const response = await fetch(`https://fve8nnwgbc.execute-api.us-east-1.amazonaws.com/prod/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: JSON.stringify(payload) // Wrap the ID in the required format
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Item removed successfully:', data.message);
                // Update your local state here
                setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
            } else {
                console.error('Failed to remove item:', data.message);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = async () => {
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image], // Assuming each item has an image
                },
                unit_amount: item.price * 100, // Amount in cents
            },
            quantity: item.quantity,
        }));

        // Create a checkout session on the server
        const response = await fetch('https://2dbiyv1yfa.execute-api.us-east-1.amazonaws.com/deve/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                body: JSON.stringify({
                    line_items: lineItems,
                }),
            }),
        });

        const session = await response.json();

        // Parse the body to access the session ID
        const body = JSON.parse(session.body);
        console.log('Parsed Server Response:', body);

        // Check for errors
        if (!response.ok || !body.id) {
            console.error('Error creating checkout session:', session.error || 'Session ID not found');
            alert(session.error || 'Session ID not found');
            return;
        }

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: body.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    };

    return (
        <div className="App">
            <h1>Shopping Cart</h1>
            <div id="cart-container">
                {loading && <p className="loading-message">Loading cart items...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && cartItems.length === 0 && <p>Your cart is empty.</p>}
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
};

export default cart;
