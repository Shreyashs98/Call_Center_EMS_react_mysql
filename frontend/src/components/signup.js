import React, { useState } from "react";
import Axios from "axios";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    const register = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/register", {
            userName: userName,
            email: email,
            password: password,
            fullname: fullname
        }).then((response) => {
            console.log(response);
            if(response.data.Status === "Success"){
                setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
            } else {
                setRegisterStatus("Error: " + response.data.Error);
            }
        }).catch((error) => {
            console.error('Error:', error);
            setRegisterStatus("Error: " + error.message);
        });
    };

    return (
        <div className="container" style={{ paddingTop: 60 }}>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Create Your Account</p>
                            </div>
                            <p><h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1></p>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your Name"
                                    onChange={(e) => { setUserName(e.target.value) }}
                                    required
                                />
                                <label className="form-label">Username</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your Email Address" required
                                />
                                <label className="form-label">Email address</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    onChange={(e) => { setFullName(e.target.value) }} placeholder="Enter your Full Name" required
                                />
                                <label className="form-label">Full Name</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" required
                                />
                                <label className="form-label">Password</label>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg" onClick={register}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
