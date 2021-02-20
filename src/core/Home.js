import React, { useState, useEffect } from 'react';
import "../styles.css";
import { API } from "../backend";
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

const Home = () => {
    
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                console.log("Products", data);
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        loadAllProduct();
    }, [])

    return (
        <Base title="Home Page" description="Welcome to the Tshirt Store">
            <div className="row text-center">
                {products.map( (product, index) => {
                    return(
                        <div className="col-lg-4" key={index}>
                            <Card product={product} />
                         </div>
                    )
                })}
            </div>
        </Base>
    )
}
export default Home;