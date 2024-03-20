import React, {  } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Employee from './employee'
import Leaves from './leaves';
import LeaveHistory from './leavehistory';
 
function EDashboard() {
 
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('Token')
        navigate("/login");
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/edashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">Employee Dashboard</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                           
                            <li>
                                <Link to="/edashboard" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline">Apply Leave</span> 
                                </Link>
                            </li>
                            <li>
                                <Link to="profile" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline">Profile</span>
                                </Link>
                            </li>
                            <li>
                                <button type = 'button' className="btn btn-success" onClick= {signOut}>Sign Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>Call Centre Employee</h4>                     
                    </div>
                    <Leaves />
                    <LeaveHistory />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
 
export default EDashboard