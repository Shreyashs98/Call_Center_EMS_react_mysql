import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const [empId, setEmpId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [department, setDepartment] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [selectedLeaveType, setSelectedLeaveType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/departments")
            .then((response) => {
                if (response.data.Status === "Success") {
                    setLeaveTypes(response.data.Result);
                } else {
                    console.error("Failed to fetch leave types");
                }
            })
            .catch(err => console.error(err));
            
    }, []);
    const create = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/create", {
            EmpId: empId,
            FirstName: firstName,
            LastName: lastName,
            EmailId: email,
            Password: password,
            Gender: gender,
            Dob: dob,
            Department: selectedLeaveType,
            Address: address,
            City: city,
            Country: country,
            Phonenumber: phoneNumber,
           
        })
        .then((response) => {
            console.log(response);
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                navigate('/employee');
                alert("Employee created successfully");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Employee</h2>
            <form className="row g-3 w-50">
                <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
                <div className="col-12">
                    <label className="form-label">EmpId</label>
                    <input type="text" className="form-control" placeholder='Enter EmpId' autoComplete='off'
                        onChange={(e) => { setEmpId(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" placeholder='Enter First Name' autoComplete='off'
                        onChange={(e) => { setFirstName(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" placeholder='Enter Last Name' autoComplete='off'
                        onChange={(e) => { setLastName(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder='Enter Password' autoComplete='off'
                        onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" placeholder='Enter Gender' autoComplete='off'
                        onChange={(e) => { setGender(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control"
                        onChange={(e) => { setDob(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Department Name</label>
                    <select className="form-select" value={selectedLeaveType} onChange={(e) => setSelectedLeaveType(e.target.value)}>
                        <option value="">Select Department Name</option>
                        {leaveTypes.map((leaveType) => (
                            <option key={leaveType.id} value={leaveType.DepartmentName}>{leaveType.DepartmentName}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" placeholder='Enter Address' autoComplete='off'
                        onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" placeholder='Enter City' autoComplete='off'
                        onChange={(e) => { setCity(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" placeholder='Enter Country' autoComplete='off'
                        onChange={(e) => { setCountry(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" placeholder='Enter Phone Number' autoComplete='off'
                        onChange={(e) => { setPhoneNumber(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder='Enter Email' autoComplete='off'
                        onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={create}>Create</button>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;
