import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper';

const currentTab = (history, path) =>{
    if(history.location.pathname === path){
        return {color:"#22CB5C"};
    }else{
        return {color:"#FFFFFF"};
    }
} 

const Menu = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={currentTab(history, "/")}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart" style={currentTab(history, "/cart")}>
                        Cart
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/user/dashboard" style={currentTab(history, "/dashboard")}>
                            U. Dashboard
                        </Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/dashboard" style={currentTab(history, "/admin/dashboard")}>
                            A. Dashboard
                        </Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={currentTab(history, "/signup")}>
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={currentTab(history, "/signin")}>
                            Sign In
                        </Link>
                    </li>
                </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span className="nav-link text-warning" 
                                onClick={() => signout(() => history.push("/"))}>
                            Sign Out
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu);