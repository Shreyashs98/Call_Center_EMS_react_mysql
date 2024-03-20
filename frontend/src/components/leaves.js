import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Leaves() {
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [selectedLeaveType, setSelectedLeaveType] = useState("");
    const [toDate, setToDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [description, setDescription] = useState("");
    const [createStatus, setCreateStatus] = useState("");
    const navigate = useNavigate();

    // Fetch leave types from the backend API
    useEffect(() => {
        axios.get("http://localhost:3001/leavetypes")
            .then((response) => {
                if (response.data.Status === "Success") {
                    setLeaveTypes(response.data.Result);
                } else {
                    console.error("Failed to fetch leave types");
                }
            })
            .catch(err => console.error(err));
            
    }, []);

    const createLeave = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/leaves/create", {
            LeaveType: selectedLeaveType,
            ToDate: toDate,
            FromDate: fromDate,
            Description: description,
            Status: 0, // Assuming the default status is 0 (pending)
            IsRead: 0, // Assuming the default IsRead is 0 (unread)
            empid: 11 // Assuming empid is hardcoded for now
        })
        .then((response) => {
            console.log(response);
            if (response.data.Status === "Success") {
                setCreateStatus("Leave Request Created");
                setTimeout(() => {
                    navigate('/edashboard');
                }, 2000); // Redirect to dashboard after 2 seconds
            } else {
                setCreateStatus("Failed to create leave request");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Employee Leave Request</h2>
            <form className="row g-3 w-50">
                <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{createStatus}</h1>
                <div className="col-12">
                    <label className="form-label">Leave Type</label>
                    <select className="form-select" value={selectedLeaveType} onChange={(e) => setSelectedLeaveType(e.target.value)}>
                        <option value="">Select Leave Type</option>
                        {leaveTypes.map((leaveType) => (
                            <option key={leaveType.id} value={leaveType.LeaveType}>{leaveType.LeaveType}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12">
                    <label className="form-label">From Date</label>
                    <input type="date" className="form-control" value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="col-12">
                    <label className="form-label">To Date</label>
                    <input type="date" className="form-control" value={toDate}
                        onChange={(e) => setToDate(e.target.value)} />
                </div>
                
                <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" placeholder='Enter Description' autoComplete='off'
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={createLeave}>Create</button>
                </div>
            </form>
        </div>
    );
}

export default Leaves;
