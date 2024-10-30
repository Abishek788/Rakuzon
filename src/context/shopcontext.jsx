
// import { createContext, useState, useEffect } from "react";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = '$';
//   const delivery_Fee = 5;
//   const [search, setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]); // New state for products
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//         const response = await fetch('https://uvlnq47ayg.execute-api.us-east-1.amazonaws.com/prod');
//         if (!response.ok) {
//             throw new Error('Failed to fetch products');
//         }
        
//         const data = await response.json();
//         const products = JSON.parse(data.body); // Parsing the body 
//         // console.log('Fetched products:', products);
//         setProducts(products);
//     } catch (err) {
//         console.error('Error fetching products:', err);
//         setError('Failed to load products. Please try again later.');
//     } finally {
//         setIsLoading(false);
//     }
// };


//   const value = {
//     products,
//     currency,
//     delivery_Fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cart,
//     setCart,
//     isLoading,
//     error,
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import { createContext, useState, useEffect } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_Fee = 5;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://xsxwn7an1f.execute-api.us-east-1.amazonaws.com/dev"
      );
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      const products = JSON.parse(data.body);
      setProducts(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    products,
    currency,
    delivery_Fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cart,
    setCart,
    isLoading,
    error,
    userId: user?.username,
    signOut
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;