import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
 
function Employee() {
  const [employees, setEmployees] = useState([])
 
  useEffect(() => {
    axios.get('http://localhost:3001/employees')
      .then(res => {
        if(res.data.Status === "Success") {
          setEmployees(res.data.Result);
        } else {
          alert("Error fetching employees")
        }
      })
      .catch(err => console.error(err));
  }, [])
 
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(res => {
        if(res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error deleting employee")
        }
      })
      .catch(err => console.error(err));
  }
 
  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>EmpId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.EmpId}</td>
                <td>{employee.FirstName} {employee.LastName}</td>
                <td>{employee.EmailId}</td>
                <td>{employee.Department}</td>
                <td>
                  <Link to={`/employees/${employee.id}`} className='btn btn-primary btn-sm me-2'>Edit</Link>
                  <button onClick={() => handleDelete(employee.id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
 
export default Employee
