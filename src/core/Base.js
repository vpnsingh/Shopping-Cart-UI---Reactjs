import React, { Children } from 'react'
import Menu from './Menu';
import "../styles.css";

const Base = ({
    title="My Title",
    description="My Description",
    className="bg-custom m-4",
    children
}) => {

    const date = new Date().getFullYear();

    return (
        <div>
            <Menu />
            <div className="container">
                <div className="jumbotron text-center bg-custom">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer mt-auto">
                <div className="container-fluid footer-color text-white text-center py-1">
                    <p style={{marginBottom: 0}}>Copyright @MERN-Shopping Cart {date}</p>
                </div>
            </footer>


        </div>
    )
}

export default Base;
