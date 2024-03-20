import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManageDepartments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/departments')
      .then(res => {
        if(res.data.Status === "Success") {
          setDepartments(res.data.Result);
        } else {
          alert("Error fetching departments");
        }
      })
      .catch(err => console.error(err));
  }, []);

  // Function to delete a department
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/departments/${id}`)
      .then(res => {
        if(res.data.Status === "Success") {
          window.location.reload(true); // Refresh the page after successful deletion
        } else {
          alert("Error deleting department");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Manage Departments</h3>
      </div>
      <Link to="/create-department" className='btn btn-success'>Add Department</Link>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Short Name</th>
              <th>Code</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(department => (
              <tr key={department.id}>
                <td>{department.DepartmentName}</td>
                <td>{department.DepartmentShortName}</td>
                <td>{department.DepartmentCode}</td>
                <td>{department.CreationDate}</td>
                <td>
                  <button onClick={() => handleDelete(department.id)} className='btn btn-danger btn-sm'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageDepartments;
