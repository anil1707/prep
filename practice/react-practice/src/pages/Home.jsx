import React from 'react';

import productData from "../data/productData.json"
import ProductCard from "../commponents/ProductCard"

const Home = () => {
    let products = productData?.data
    return <div style={{display: 'flex', gap: "20px", flexWrap: "wrap"}}>
        {
            products.map(item => {
                return (
                    <ProductCard  product={item}/>
                )
            })
        }
    </div>;
}


export default Home;