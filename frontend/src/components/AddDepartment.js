import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddDepartment() {
    const [departmentName, setDepartmentName] = useState("");
    const [departmentShortName, setDepartmentShortName] = useState("");
    const [departmentCode, setDepartmentCode] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const navigate = useNavigate();

    const create = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/department/create", {
            DepartmentName: departmentName,
            DepartmentShortName: departmentShortName,
            DepartmentCode: departmentCode,
        })
        .then((response) => {
            console.log(response);
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                navigate('/departments');
                alert("Department created successfully");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Department</h2>
            <form className="row g-3 w-50">
                <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
                <div className="col-12">
                    <label className="form-label">Department Name</label>
                    <input type="text" className="form-control" placeholder='Enter Department Name' autoComplete='off'
                        onChange={(e) => { setDepartmentName(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Department Short Name</label>
                    <input type="text" className="form-control" placeholder='Enter Department Short Name' autoComplete='off'
                        onChange={(e) => { setDepartmentShortName(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Department Code</label>
                    <input type="text" className="form-control" placeholder='Enter Department Code' autoComplete='off'
                        onChange={(e) => { setDepartmentCode(e.target.value) }} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={create}>Create</button>
                </div>
            </form>
        </div>
    );
}

export default AddDepartment;
