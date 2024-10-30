// // import React, { useContext, useState } from 'react';
// // import { ShopContext } from '../context/shopcontext';

// // const ProductItem = ({ id, image, name, price }) => {
// //   const { currency, cart, setCart } = useContext(ShopContext);
// //   const [quantity, setQuantity] = useState(1); // State for quantity

// //   const addToCart = async (productId) => {
// //     const hardcodedUserId = 'abhisekuser@example.com';

// //     const payload = {
// //       ProductId: productId,
// //       name,
// //       image,
// //       price,
// //       userId: hardcodedUserId,
// //       quantity, // Include quantity in the payload
// //     };

// //     console.log('Adding to cart:', payload); // Log the payload

// //     try {
// //       const response = await fetch('https://skuy6l8a4j.execute-api.us-east-1.amazonaws.com/prod/', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         console.log('Product added to cart:', data);
// //         setCart([...cart, { productId, name, image, price, quantity }]); // Add quantity to cart
// //       } else {
// //         console.error('Failed to add product to cart');
// //       }
// //     } catch (error) {
// //       console.error('Error adding product to cart:', error);
// //     }
// //   };

// //   return (
// //     <div className="block">
// //       <div className="hover:scale-105 transition-transform ease-in-out text-gray-700 cursor-pointer">
// //         <div className='overflow-hidden'>
// //           <img src={image} alt={name} className="w-full h-auto" /> {/* Responsive image */}
// //         </div>
// //         <p className='pt-3 pb-1 text-sm truncate'>{name}</p>
// //         <p className='text-sm font-medium'>{currency}{price}</p>
        
// //         {/* Flexbox for alignment */}
// //         <div className="flex items-center mt-2">
// //           {/* Quantity Input */}
// //           <input
// //             type="number"
// //             min="1"
// //             value={quantity}
// //             onChange={(e) => setQuantity(Number(e.target.value))}
// //             className="w-16 text-center border rounded focus:outline-none"
// //           />
          
// //           {/* Add to Cart Button */}
// //           <button
// //             className="ml-4 bg-black text-sm font-medium text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none"
// //             onClick={() => addToCart(id)}
// //           >
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductItem;


// import React, { useContext, useState } from 'react';
// import { ShopContext } from '../context/shopcontext';

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency, cart, setCart, userId } = useContext(ShopContext);
//   const [quantity, setQuantity] = useState(1);

//   const addToCart = async (productId) => {
//     if (!userId) {
//       console.error("User not logged in");
//       // You might want to show a message to the user or redirect to login
//       return;
//     }

//     const payload = {
//       ProductId: productId,
//       name,
//       image,
//       price,
//       userId,
//       quantity,
//     };

//     console.log("Adding to cart:", payload);

//     try {
//       const response = await fetch(
//         "https://8ae3l6yk6l.execute-api.us-east-1.amazonaws.com/dev",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             body: JSON.stringify(payload)}) 
//           // body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Product added to cart:", data);
//         setCart([...cart, { productId, name, image, price, quantity }]);
//       } else {
//         console.error("Failed to add product to cart");
//       }
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   return (
//     <div className="block">
//       <div className="hover:scale-105 transition-transform ease-in-out text-gray-700 cursor-pointer">
//         <div className="overflow-hidden">
//           <img src={image} alt={name} className="w-full h-auto" />
//         </div>
//         <p className="pt-3 pb-1 text-sm truncate">{name}</p>
//         <p className="text-sm font-medium">
//           {currency}
//           {price}
//         </p>

//         <div className="flex items-center mt-2">
//           <input
//             type="number"
//             min="1"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="w-16 text-center border rounded focus:outline-none"
//           />

//           <button
//             className="ml-4 bg-black text-sm font-medium text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none"
//             onClick={() => {
//               console.log("Product ID:", id); // Log the id
//               addToCart(id);
//             }}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductItem;

import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/shopcontext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency, cart, setCart, userId } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false); // State for order animation

  const addToCart = async (productId) => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const payload = {
      ProductId: productId,
      name,
      image,
      price,
      userId,
      quantity,
    };

    console.log("Adding to cart:", payload);

    setIsOrdered(true); // Set ordered state

    try {
      const response = await fetch(
        "https://8ae3l6yk6l.execute-api.us-east-1.amazonaws.com/dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: JSON.stringify(payload) })
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Product added to cart:", data);
        setCart([...cart, { productId, name, image, price, quantity }]);
        
        // Reset the ordered state after a short delay
        setTimeout(() => setIsOrdered(false), 1000); // Delay reset for feedback effect
      } else {
        console.error("Failed to add product to cart");
        setIsOrdered(false);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setIsOrdered(false);
    }
  };

  return (
    <div className="block">
      <div className="hover:scale-105 transition-transform ease-in-out text-gray-700 cursor-pointer">
        <div className="overflow-hidden">
          <img src={image} alt={name} className="w-full h-auto" />
        </div>
        <p className="pt-3 pb-1 text-sm truncate">{name}</p>
        <p className="text-sm font-medium">
          {currency}{price}
        </p>

        <div className="flex items-center mt-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center border rounded focus:outline-none"
          />

          <button
            className={`ml-4 text-sm font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform ${
              isOrdered ? 'bg-white-600 text-black scale-95 rounded-lg ring-2 ring-black p-1' : 'bg-black text-white hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => addToCart(id)}
            disabled={isOrdered} // Disable button temporarily if ordered
          >
            {isOrdered ? 'Order Placed' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
