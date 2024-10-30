import React, { useEffect, useState, useContext } from 'react';
import './cart.css';
import { ShopContext } from '../context/shopcontext';
import { Link } from 'react-router-dom';

function Cart1() {
    const { userId } = useContext(ShopContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderSuccessful, setOrderSuccessful] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) {
              setLoading(false);
              return;
            }
      
            try {
              const response = await fetch(
                `https://zte7uvd0za.execute-api.us-east-1.amazonaws.com/dev?userId=${encodeURIComponent(
                  userId
                )}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
      
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
      
              const data = await response.json();
              const parsedData =
                typeof data.body === "string" ? JSON.parse(data.body) : data.body;
              setCartItems(parsedData);
            } catch (error) {
              setError("Error loading cart items. Please try again later.");
              console.error("Error fetching cart items:", error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchCartItems();
        }, [userId]);
      

    const handleCheckout = () => {
        setOrderSuccessful(true);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
    };

    if (orderSuccessful) {
        return (
            <div className="App">
                <h1>Order Successful</h1>
                <Link to="/" className="my-buttonu hover-effect">Go to Home Page</Link>
            </div>
        );
    }
    const styles = {
      orderSuccessfulContainer: {
          maxWidth: '800px',
          margin: '0 auto',
          padding: '60px',
          marginBottom:'50px',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
      },
      orderTitle: {
          fontSize: '2.5em',
          fontWeight: 'bold',
          color: 'black',
      },
      thankYouMessage: {
          fontSize: '1.2em',
          marginBottom: '20px',
      },
      orderSummaryTitle: {
          fontSize: '2em',
          marginTop: '20px',
          color: 'black',
      },
      cartContainer: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      },
      cartItem: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
      itemImage: {
          width: '80px',
          height: 'auto',
          borderRadius: '5px',
      },
      cartItemDetails: {
          flexGrow: 1,
          paddingLeft: '15px',
      },
      itemName: {
          fontSize: '1.5em',
      },
      itemPrice: {
          fontSize: '1em',
      },
      itemQuantity: {
          fontSize: '1em',
      },
      orderTotal: {
          marginTop: '20px',
          fontSize: '1.5em',
      },
      orderActions: {
          marginTop: '30px',
      },
      myButtonu: {
          marginTop:'500px',
          backgroundColor: '#111',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
          margin: '0 10px',
          transition: 'background-color 0.3s ease',
      },
      myButtonuHover: {
          backgroundColor: '#333',
      },
  };
  return (
      <div style={styles.orderSuccessfulContainer}>
          <h1 style={styles.orderTitle}>Order Successful!</h1>
          <p style={styles.thankYouMessage}>Thank you for your purchase. Your order has been successfully placed.</p>
          <h2 style={styles.orderSummaryTitle}>Order Summary</h2>
          <div id="cart-container" style={styles.cartContainer}>
              {cartItems.map(item => (
                  <div style={styles.cartItem} key={item.productId}>
                      <img src={item.image} alt={item.name} style={styles.itemImage} />
                      <div style={styles.cartItemDetails}>
                          <h3 style={styles.itemName}>{item.name}</h3>
                          <p style={styles.itemPrice}>Price: ${parseFloat(item.price).toFixed(2)}</p>
                          <p style={styles.itemQuantity}>Quantity: {item.quantity}</p>
                      </div>
                  </div>
              ))}
          </div>
          <div style={styles.orderTotal}>
              <h3>Total: ${calculateSubtotal()}</h3>
          </div>
          <div style={styles.orderActions}>
              <Link 
                to="/" 
                style={styles.myButtonu}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.myButtonuHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.myButtonu.backgroundColor}
              >
                Continue Shopping
              </Link>
              <Link 
                to="/orders" 
                style={styles.myButtonu}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.myButtonuHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.myButtonu.backgroundColor}
              >
                Email Receipt
              </Link>
          </div>
      </div>
  );
}

export default Cart1;