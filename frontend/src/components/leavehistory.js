import axios from 'axios';
import React, { useState, useEffect } from 'react';

function LeaveHistory() {
    const [leaveHistory, setLeaveHistory] = useState([]);

    // Fetch leave history of the logged-in employee from the backend API
    useEffect((id) => {
        axios.get(`http://localhost:3001/leaves`)
            .then((response) => {
                if (response.data.Status === "Success") {
                    setLeaveHistory(response.data.Result);
                } else {
                    console.error("Failed to fetch leave history");
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Leave History</h2>
            <div className="row g-3 w-50">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Leave Type</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveHistory.map((leave) => (
                                <tr key={leave.id}>
                                    <td>{leave.LeaveType}</td>
                                    <td>{leave.FromDate}</td>
                                    <td>{leave.ToDate}</td>
                                    <td>{leave.Description}</td>
                                    <td>{leave.Status === 1 ? 'Approved' : leave.Status === 2 ? 'Rejected' : 'Pending'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LeaveHistory;
