import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from './Base';
import Card from './Card';
import { loadMyCart } from './helper/cartHelper';
import Paymentb from './Paymentb';


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false)

    const loadAllProducts = products => {
        return(
            <div>
                <h2>Your Products</h2>
                <div className="row">
                {products.map((product, index) => {
                    return(
                        <div className="col-6">
                            <Card 
                                key={index} product={product} 
                                addToCart={false} removeFromCart={true}  
                                setReload={setReload}
                                reload={reload}  
                            />
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }

    const loadCheckout = () => {
        return(
            <div>
                <h2>Checkout Section</h2>
            </div>
        )
    }

    useEffect(() => {
        setProducts(loadMyCart());
    }, [reload])

    return (
        <Base title="Cart Page" description="Ready to chechout">
            <div className="row">
                <div className="col-8">
                    {products.length > 0 ? (
                        loadAllProducts(products)
                    ) : (
                        <div className="jumbotron text-center bg-custom mb-5">
                            <h4>No Products in cart</h4>
                            <Link className="btn-link font-weight-bold">
                                Click here to add some product
                            </Link>
                        </div>
                    )}
                </div>
                <div className="col-4">
                    {
                        isAuthenticated() && (
                            <Paymentb products={products} />
                        )
                    }
                </div>
            </div>
        </Base>
    )
}

export default Cart;