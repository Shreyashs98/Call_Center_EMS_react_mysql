import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/leaves')
      .then(res => {
        if(res.data.Status === "Success") {
          setLeaves(res.data.Result);
        } else {
          alert("Error fetching leaves");
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleApprove = (id) => {
    axios.put(`http://localhost:3001/leavesApproved/${id}`)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error updating")
      }
    })
    .catch(err => console.error(err));
  };

  const handleReject = (id) => {
    axios.put(`http://localhost:3001/leavesRejected/${id}`)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error deleting employee")
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Manage Leaves</h3>
      </div>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th>Employee Name</th> */}
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(leave => (
              <tr key={leave.id}>
                {/* <td>{leave.employeeName}</td> */}
                <td>{leave.LeaveType}</td>
                <td>{leave.FromDate}</td>
                <td>{leave.ToDate}</td>
                <td>{leave.Description}</td>
                <td>{leave.Status === 1 ? 'Approved' : leave.Status === 2 ? 'Rejected' : 'Pending'}</td>

                <td>
                  {leave.Status === 0 && (
                    <>
                      <button onClick={() => handleApprove(leave.id)} className='btn btn-success btn-sm me-2'>Approve</button>
                      <button onClick={() => handleReject(leave.id)} className='btn btn-danger btn-sm'>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MLeaves;
