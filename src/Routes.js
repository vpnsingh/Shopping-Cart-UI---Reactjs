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
// Admin related component imports
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import Orders from './admin/Orders';
import UpdateProduct from './admin/UpdateProduct';
import ManageCategories from './admin/ManageCategories';
import UpdateCategories from './admin/UpdateCategories';
import Cart from './core/Cart';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/admin/create/categories" exact component={AddCategory} />
                <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategories} />
                <AdminRoute path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
