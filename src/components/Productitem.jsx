
// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../context/shopcontext';

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency, user, cart, setCart } = useContext(ShopContext);
//   const [quantity, setQuantity] = useState(1); // State for quantity

//   const addToCart = async (productId) => {
//     const hardcodedUserId = 'abhisekuser@example.com';

//     const payload = {
//       ProductId: productId,
//       name,
//       image,
//       price,
//       userId: hardcodedUserId,
//       quantity, // Include quantity in the payload
//     };

//     console.log('Adding to cart:', payload); // Log the payload

//     try {
//       const response = await fetch('https://skuy6l8a4j.execute-api.us-east-1.amazonaws.com/prod/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Product added to cart:', data);
//         setCart([...cart, { productId, name, image, price, quantity }]); // Add quantity to cart
//       } else {
//         console.error('Failed to add product to cart');
//       }
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//     }
//   };

//   return (
//     <Link>
//       <div className="hover:scale-105 transition-transform ease-in-out-bottom text-gray-700 cursor-pointer">
//         <div className='overflow-hidden'>
//           <img src={image} alt={name} />
//         </div>
//         <p className='pt-3 pb-1 text-sm'>{name}</p>
//         <p className='text-sm font-medium'>{currency}{price}</p>
        
//         {/* Quantity Input */}
//         <input
//           type="number"
//           min="1"
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//           className="mt-2 w-16 text-center border rounded"
//         />
        
//         <div className="flex justify-center">
//           <div className="w-full flex justify-start">
//             <button
//               className="mt-4 bg-black text-sm font-medium text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none"
//               onClick={() => addToCart(id)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductItem;


import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/shopcontext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency, cart, setCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const addToCart = async (productId) => {
    const hardcodedUserId = 'abhisekuser@example.com';

    const payload = {
      ProductId: productId,
      name,
      image,
      price,
      userId: hardcodedUserId,
      quantity, // Include quantity in the payload
    };

    console.log('Adding to cart:', payload); // Log the payload

    try {
      const response = await fetch('https://skuy6l8a4j.execute-api.us-east-1.amazonaws.com/prod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product added to cart:', data);
        setCart([...cart, { productId, name, image, price, quantity }]); // Add quantity to cart
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="block">
      <div className="hover:scale-105 transition-transform ease-in-out text-gray-700 cursor-pointer">
        <div className='overflow-hidden'>
          <img src={image} alt={name} className="w-full h-auto" /> {/* Responsive image */}
        </div>
        <p className='pt-3 pb-1 text-sm truncate'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
        
        {/* Flexbox for alignment */}
        <div className="flex items-center mt-2">
          {/* Quantity Input */}
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center border rounded focus:outline-none"
          />
          
          {/* Add to Cart Button */}
          <button
            className="ml-4 bg-black text-sm font-medium text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none"
            onClick={() => addToCart(id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
