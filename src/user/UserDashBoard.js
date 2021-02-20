import React from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const UserDashboard = () => {

    const {user: { name, email, role, _id }} = isAuthenticated();

    return (
        <Base title="User Dashboard Page">
             <div className="card mb-4">
                <h4 className="card-header">User Information</h4>
                <table className="table table-hover table-borderless font-weight-bold">
                    <tr className="table-primary">
                        <td>User Name </td>
                        <td>{name}</td>
                    </tr>      
                    <tr className="table-success">
                        <td>Email ID </td>
                        <td>{email}</td>
                    </tr>
                    <tr className="table-secondary">
                        <td>User ID </td>
                        <td>{_id}</td>
                    </tr>
                    <tr className="table-info">
                        <td>User Role </td>
                        <td>{role == 0 ? "Default" : "Admin"}</td>
                    </tr>
                </table>
            </div>
        </Base>
    )
}

export default UserDashboard;