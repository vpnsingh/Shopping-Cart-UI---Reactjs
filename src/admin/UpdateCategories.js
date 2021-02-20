import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategories = ({match}) => {
    const { user, token } = isAuthenticated();

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const preload = categoryId => {
        getCategory(categoryId).then(data => {
            //console.log(data);
            if (data.error) {
                setError(true);
            } else {
                setName(data.name);
            }
        });
    };

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const handleChange = (event) => {
        setError(false);
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);
        updateCategory(match.params.categoryId, user._id, token, {name})
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


    const successMessage = () => (
        <div
        className="alert alert-success mt-3"
        style={{ display: success ? "" : "none" }}
        >
        <h4>Category updated successfully</h4>
        </div>
    );

    const updateCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Update category name : </p>
                <input className="form-control" placeholder="For ex. Summer"
                        onChange={handleChange} value={name}
                    />
                <button onClick={handleSubmit} className="btn btn-info mt-4">Update</button>
            </div>
        </form>
    );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategories;
