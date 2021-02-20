import React, {useState} from "react"
import { Link, Redirect } from "react-router-dom"
import { authenticate, isAuthenticated, signin } from "../auth/helper"
import Base from "../core/Base"

const Signin = () => {
    // state for entire form values
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })

    // destructing the state
    const { email, password, error, loading, didRedirect } = values
    const { user } = isAuthenticated();

    // handle values of form element
    const handleChange = name => event => {
        setValues({...values, error: false, [name] : event.target.value})
    }

    // redirection
    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role == 1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    // on submit form
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            console.log(data)
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{
                authenticate(data, () => {
                    setValues({
                        ...values, 
                        email: "",
                        password: "",
                        didRedirect: true
                    })
                })
            }
        })
        .catch(err => console.log(err))
    }

    const loadingMsg = () => {
        return (
            loading && (<div>
                <div className="alert alert-info">loading .....</div>
            </div>)
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

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <form>
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
        )
    }

    return (
        <Base title="Sign in  page" description="A page for user to sign in">
            {loadingMsg()}
            {errorMsg()}
            {signInForm()}
            {performRedirect()}
            <br/><br/>
        </Base>
    )
}

export default Signin;