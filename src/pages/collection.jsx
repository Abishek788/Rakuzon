// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/shopcontext';
// import { assets } from '../assets/assets';
// import ProductItem from '../components/Productitem';

// const Collection = () => {
//     const { products,search ,showSearch } = useContext(ShopContext);
//     const [showFilter, setShowFilter] = useState(true);
//     const [filterProducts, setFilterProducts] = useState([])

//     useEffect(()=>{
//         setFilterProducts(products)
//     })

//     return (
//         <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
//             {/* Filter Options */}
            
//             <div className='w-full '>
//                 <div>
 
//       <video
//         loop
//         autoPlay
//         muted
//         playsInline
//         className="w-full h-200% object-cover"
//       >
//         <source src="/vid.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//     <div className='mt-8  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//                 {filterProducts.map((item, index) => (
//                     <ProductItem
//                         key={index}
//                         id={item.id}
//                         image={item.image}
//                         name={item.name}
//                         price={item.price}
//                     />
//                 ))}
//             </div>
//             </div>
//         </div>
//     );
// }

// export default Collection;
// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/shopcontext'; // Ensure the import path is correct
// import ProductItem from '../components/ProductItem'; // Ensure the import path is correct
// import Coll from '../components/Coll';

// const Collection = () => {
//     const { products } = useContext(ShopContext);
//     const [filterProducts, setFilterProducts] = useState([]);

//     // Set filtered products when component loads
//     useEffect(() => {
//         setFilterProducts(products);
//     }, [products]);

//     return (
//         <>
//             <Coll />
            
               
//                 <div className='w-full mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-12'>
//                     {filterProducts.map((item, index) => (
//                         <ProductItem
//                             key={index}
//                             id={item.id}
//                             image={item.image}
//                             name={item.name}
//                             price={item.price}
//                         />
//                     ))}
//                 </div>
           
//         </>
//     );
// }

// export default Collection;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopcontext'; // Ensure the import path is correct
import ProductItem from '../components/ProductItem'; // Ensure the import path is correct
import Coll from '../components/Coll';

const Collection = () => {
    const { products, isLoading, error } = useContext(ShopContext);
    const [filterProducts, setFilterProducts] = useState([]);

    // Set filtered products when component loads or products change
    useEffect(() => {
        if (Array.isArray(products)) {
            setFilterProducts(products);
        } else {
            setFilterProducts([]);
        }
    }, [products]);

    // Check loading and error states
    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Coll />
            <div className='w-full mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-12'>
                {filterProducts.length > 0 ? (
                    filterProducts.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item.productId} // Ensure this matches your data structure
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </>
    );
}

export default Collection;