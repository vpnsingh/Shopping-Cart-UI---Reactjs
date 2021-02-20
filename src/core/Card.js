import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({product, addToCart = true, removeFromCart = false, setReload = f => f, reload = undefined}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name : "A Default Product";
    const cardDescription = product ? product.description : "A Default Description For Product";
    const cardPrice = product ? product.price : "A Default Price";

    const addProductToCart = () => {
        addItemToCart(product, () => {
            setRedirect(true);
        })
    }

    const getARedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = addToCart => {
        return(
            addToCart && (
                <button
                    onClick={addProductToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = removeFromCart => {
        return(
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload);
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card border border-main bg-custom text-center">
            <div className="card-header text-capitalize font-weight-bold bg-main">{cardTitle}</div>
            <div className="card-body">
                {getARedirect(redirect)}
                <ImageHelper product={product} />
            <p className="font-weight-normal text-wrap text-capitalize">
                {cardDescription}
            </p>
            <p className="btn btn-second rounded btn-sm px-4">$ {cardPrice}</p>
            <div className="row">
                <div className="col-12">
                    {showAddToCart(addToCart)}
                </div>
                <div className="col-12">
                    {showRemoveFromCart(removeFromCart)}
                </div>
            </div>
            </div>
        </div>
    );
};

export default Card;