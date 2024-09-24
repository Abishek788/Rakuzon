import React, { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../context/shopcontext'; // Ensure the import path is correct

import ProductItem from '../components/Productitem'; // Ensure the import path is correct
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