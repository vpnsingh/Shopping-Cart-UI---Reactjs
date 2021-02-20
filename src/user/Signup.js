import React, {useState} from "react"
import { Link } from "react-router-dom"
import Base from "../core/Base"
import { signup } from "../auth/helper/index"

const Signup = () => {
    // state for entire form values
    const[values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    // destructing the state
    const {name, email, password, error, success} = values;

    // handle values of form element
    const handleChange = name => event => {
        setValues({...values, error: false, [name] : event.target.value})
    }

    // on submit form
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            console.log(data)
            if(data.error){
                setValues({...values, error: data.error, success:false})
            }else{
                setValues({
                    ...values, 
                    name: "",
                    email: "",
                    password: "",
                    success: true
                })
            }
        })
        .catch(err => {
                console.log(err);
                alert(err);  
            }  
        )
    }

    const successMsg = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        New user was registered. For Signin <Link to="/signin">Click Here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMsg = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    // Sign up form
    const signUpForm = () => {
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" type="text" 
                                onChange={handleChange("name")} value={name} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" type="text" 
                                onChange={handleChange("email")} value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" 
                                onChange={handleChange("password")} value={password}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
            </div>
        )
    }

    return (
        <Base title="Sign up  page" description="A page for user to sign up">
            {successMsg()}
            {errorMsg()}
            {signUpForm()}
        </Base>
    )
}

export default Signup;