import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        EmpId: "",
        FirstName: "",
        LastName: "",
        EmailId: "",
        Password: "",
        Gender: "",
        Dob: "",
        Department: "",
        Address: "",
        City: "",
        Country: "",
        Phonenumber: "",
        Status: "",
    });

    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/employees/${id}`)
            .then(res => {
                console.log(res.data.Result[0]);
                setEmployee(res.data.Result[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/employees/${id}`, employee);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Edit Employee</h2>
            <form className="row g-3 w-50">
                <div className="col-12">
                    <input type="text" className="form-control" id="id" name="id" value={id} disabled />
                    <label className="form-label">EmpId</label>
                    <input type="text" className="form-control" placeholder='Enter EmpId' autoComplete='off'
                        name="EmpId" value={employee.EmpId} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" placeholder='Enter First Name' autoComplete='off'
                        name="FirstName" value={employee.FirstName} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" placeholder='Enter Last Name' autoComplete='off'
                        name="LastName" value={employee.LastName} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder='Enter Email' autoComplete='off'
                        name="EmailId" value={employee.EmailId} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder='Enter Password' autoComplete='off'
                        name="Password" value={employee.Password} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" placeholder='Enter Gender' autoComplete='off'
                        name="Gender" value={employee.Gender} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control"
                        name="Dob" value={employee.Dob} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Department</label>
                    <input type="text" className="form-control" placeholder='Enter Department' autoComplete='off'
                        name="Department" value={employee.Department} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" placeholder='Enter Address' autoComplete='off'
                        name="Address" value={employee.Address} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" placeholder='Enter City' autoComplete='off'
                        name="City" value={employee.City} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" placeholder='Enter Country' autoComplete='off'
                        name="Country" value={employee.Country} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" placeholder='Enter Phone Number' autoComplete='off'
                        name="Phonenumber" value={employee.Phonenumber} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Status</label>
                    <input type="text" className="form-control" placeholder='Enter Status' autoComplete='off'
                        name="Status" value={employee.Status} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update</button>
</div>
</form>
</div>
);
}

export default EditEmployee;

