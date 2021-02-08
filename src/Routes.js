import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./core/Home";
import Signin from './user/Signin';
import Signup from './user/Signup';
// routes import
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
// dashboard components
import UserDashboard from './user/UserDashBoard';
import AdminDashboard from './user/AdminDashBoard';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
