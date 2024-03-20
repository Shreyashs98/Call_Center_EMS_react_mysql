import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManageLeaveTypes() {
  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/leavetypes')
      .then(res => {
        if(res.data.Status === "Success") {
          setLeaveTypes(res.data.Result);
        } else {
          alert("Error fetching leave types");
        }
      })
      .catch(err => console.error(err));
  }, []);

  // Function to delete a leave type
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/leavetypes/${id}`)
      .then(res => {
        if(res.data.Status === "Success") {
          window.location.reload(true); // Refresh the page after successful deletion
        } else {
          alert("Error deleting leave type");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Manage Leave Types</h3>
      </div>
      <Link to="/create-leavetype" className='btn btn-success'>Add Leave Type</Link>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Description</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveTypes.map(leaveType => (
              <tr key={leaveType.id}>
                <td>{leaveType.LeaveType}</td>
                <td>{leaveType.Description}</td>
                <td>{leaveType.CreationDate}</td>
                <td>
                  <button onClick={() => handleDelete(leaveType.id)} className='btn btn-danger btn-sm'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageLeaveTypes;
