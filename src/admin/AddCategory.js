import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { addCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const handleChange = (event) => {
        setError(false);
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);
        addCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(true);
                setName("");
            }else{
                setError(false);
                setSuccess(true);
                setName("");
            }
        })
    }

    const categoryForm = () =>{
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter category name : </p>
                    <input className="form-control" placeholder="For ex. Summer"
                           onChange={handleChange} value={name}
                        />
                    <button onClick={handleSubmit} className="btn btn-info mt-4">Submit</button>
                </div>
            </form>
        )
    }

    const successMsg = () => {
        if(success){
            return <p className="text-success">Category created successfully !!!</p>
        }
    }

    const errorMsg = () => {
        if(error){
            return <p className="text-success">Failed to add category</p>
        }
    }

    const goBack = () => {
        return(
            <Link className="btn btn-success my-4" to="/admin/dashboard">Go Back</Link>
        )
    }

    return (
        <Base
            title="Create category"
            description="A page for creating category for tshirts"
            className="container bg-info p-4"
        >
            <div className="row bg-white">
                <div className="col-md-8 offset-md-2">
                    {successMsg()}
                    {errorMsg()}
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;