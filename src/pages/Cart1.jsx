import React, { useEffect, useState, useContext } from "react";
import "./cart.css";
import { ShopContext } from "../context/shopcontext";

function Cart1() {
  const { userId } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stripe = window.Stripe(
    "pk_test_51PymWcCMwxM2KCjajwcwTY5q0DcPOc2RYFVQysFt7LcaN4Mtzrc7h6nLo59ladRqvJkkMemaef0Coh24slVlVBzk00dekGloQN"
  );

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

  const removeFromCart = async (productId) => {
    const payload = {
      userId: userId,
      ProductId: productId,
    };

    console.log("Attempting to remove from cart:", payload);

    try {
      const response = await fetch(
        `https://ns1s7wrf96.execute-api.us-east-1.amazonaws.com/dev`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            httpMethod: "DELETE",
            body: JSON.stringify(payload),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        console.log("Item removed successfully:", data.message);
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.ProductId !== productId)
        );
      } else {
        console.error("Failed to remove item:", data.message);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    try {
      const response = await fetch(
        "https://g1f1e7tzq2.execute-api.us-east-1.amazonaws.com/dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: JSON.stringify({
              line_items: lineItems,
            }),
          }),
        }
      );

    //   const session = await response.json();
    //   const body = JSON.parse(session.body);
    //   console.log("Parsed Server Response:", body);

    //   if (!response.ok || !body.id) {
    //     throw new Error(session.error || "Session ID not found");
    //   }

    //   const result = await stripe.redirectToCheckout({
    //     sessionId: body.id,
    //   });
    const session = await response.json();
    const body = session.body ? JSON.parse(session.body) : null;

    if (!body || !body.sessionId) {
      throw new Error(session.error || "Session ID not found");
    }

    const result = await stripe.redirectToCheckout({
      sessionId: body.sessionId,
    });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <div id="cart-container">
        {loading && <p className="loading-message">Loading cart items...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !userId && <p>Please log in to view your cart.</p>}
        {!loading && userId && cartItems.length === 0 && (
          <p>Your cart is empty.</p>
        )}
        {cartItems.map((item) => (
          <div className="cart-item" key={item.ProductId}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button
              className="my-button"
              onClick={() => removeFromCart(item.ProductId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <div className="checkout">
          <h3>Subtotal: ${calculateSubtotal()}</h3>
          <button className="my-buttonu" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart1;

