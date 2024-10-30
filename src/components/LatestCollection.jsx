
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopcontext'; // Update the correct path for ShopContext
import Title from './title'; // Ensure correct path for Title component
import ProductItem from './Productitem'; // Ensure correct path for ProductItem component

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    useEffect(() => {
        // Shuffle the products and get the first 10
        const shuffledProducts = shuffleArray([...products]);
        setLatestProducts(shuffledProducts.slice(0, 10));
    }, [products]); // Dependency array should include products

    return (
        <div className="my-10">
            <div className='text-center py-8 text-3xl'>
                <Title text1='LATEST' text2='COLLECTION' />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item.ProductId}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
