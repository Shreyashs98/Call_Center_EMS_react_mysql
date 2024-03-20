import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import {RequireToken} from './components/Auth.js'
 
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Employee from "./components/employee";
import Profile from "./components/profile";
import AddEmployee from "./components/addemployee";
import EditEmployee from './components/editemployee'
import ELogin from "./components/employeelogin.js";
import EDashboard from "./components/edashboard.js";
import Leaves from "./components/leaves.js";
import MLeaves from "./components/mleaves.js";
import ManageDepartments from "./components/department.js";
import LeaveType from "./components/leavetype.js";
import AddDepartment from "./components/AddDepartment.js";
import AddLeavetype from "./components/AddLeavetype.js";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/elogin" element={<ELogin />} />
               
              <Route path='/' element={
                  <RequireToken>
                    <Dashboard />
                  </RequireToken>
                  }>
                  <Route path='' element={<Home />}></Route>
                  <Route path='/employee' element={<Employee />}></Route>
                  <Route path='/profile' element={<Profile />}></Route>
                  <Route path='/create' element={<AddEmployee />}></Route>
                  <Route path='/create-department' element={<AddDepartment />}></Route>
                  <Route path='/create-leavetype' element={<AddLeavetype />}></Route>
                  <Route path='/mleaves' element={<MLeaves />}></Route>
                  <Route path="/departments" element={<ManageDepartments />} />
                  <Route path="/leavetype" element={<LeaveType />} />
                  <Route path='/employees/:id' element={<EditEmployee />}></Route>

              </Route>
              <Route path='/edashboard' element={
                  <RequireToken>
                    <EDashboard />
                  </RequireToken>
                  }>
                    </Route>
                    
                  {/* <Route path='/leaves' element={<Leaves />}></Route> */}
              

            </Routes>
        </BrowserRouter>
    </div>
  );
}
   
export default App;