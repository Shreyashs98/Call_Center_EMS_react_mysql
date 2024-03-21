import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LeaveHistory from './leavehistory'


function Home() {
  const [adminCount, setAdminCount] = useState()
  const [employeeCount, setEmployeeCount] = useState()
  const [leave, setLeave] = useState()

  useEffect(() => {
    axios.get('http://localhost:3001/adminCount')
      .then(res => {
        setAdminCount(res.data[0].admin)
      }).catch(err => console.log(err));

    axios.get('http://localhost:3001/employeesCount')
      .then(res => {
        setEmployeeCount(res.data[0].employee)
      }).catch(err => console.log(err));

    axios.get('http://localhost:3001/leaveCount')
      .then(res => {
        setLeave(res.data[0].totalleaves)
      }).catch(err => console.log(err));

  }, [])

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div style={{ ...boxStyle, backgroundColor: '#ff9800' }} className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div style={{ ...boxStyle, backgroundColor: '#2196f3' }} className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {employeeCount}</h5>
          </div>
        </div>
        <div style={{ ...boxStyle, backgroundColor: '#4caf50' }} className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Pending Requests</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {leave}</h5>
          </div>
        </div>
      </div>
      
      {/* Increase the size of the div containing LeaveHistory */}
      <div>
        <LeaveHistory />
      </div>
    </div>
  )
}

// Define inline CSS
const boxStyle = {
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  textAlign: 'center',
  color: '#fff', // Text color
};

export default Home
