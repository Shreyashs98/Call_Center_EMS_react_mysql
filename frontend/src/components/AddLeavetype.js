import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddLeaveType() {
    const [leaveType, setLeaveType] = useState("");
    const [description, setDescription] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const navigate = useNavigate();

    const create = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/leavetype/create", {
            LeaveType: leaveType,
            Description: description,
        })
        .then((response) => {
            console.log(response);
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                navigate('/leavetype');
                alert("Leave type created successfully");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Leave Type</h2>
            <form className="row g-3 w-50">
                <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
                <div className="col-12">
                    <label className="form-label">Leave Type</label>
                    <input type="text" className="form-control" placeholder='Enter Leave Type' autoComplete='off'
                        onChange={(e) => { setLeaveType(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" placeholder='Enter Description' autoComplete='off'
                        onChange={(e) => { setDescription(e.target.value) }} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={create}>Create</button>
                </div>
            </form>
        </div>
    );
}

export default AddLeaveType;
