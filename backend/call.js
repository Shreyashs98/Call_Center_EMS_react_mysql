const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Shreyashs98@", // Update with your MySQL password
    database: "call_center_ems_test" // Update with your database name
});

con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
});

// Get all employees
app.get('/employees', (req, res) => {
    const sql = "SELECT * FROM employees";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employees error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM employees WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete employee error in sql"});
        return res.json({Status: "Success"})
    })
})
 

app.post('/create',  async (req, res) => {
    const { EmpId, FirstName, LastName,EmailId , Password, Gender, Dob, Department, Address, City, Country, Phonenumber} = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(Password, 10);
    con.query("INSERT INTO employees (EmpId, FirstName, LastName,EmailId , Password, Gender, Dob, Department, Address, City, Country, Phonenumber,Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1);", 
        [EmpId, FirstName, LastName,EmailId , hashedPassword, Gender, Dob, Department, Address, City, Country, Phonenumber], 
        (err, result) => {
            if(result){
                res.send(result);
            } else {
                res.send({ message: "ENTER CORRECT DETAILS!" });
            }
        }
    );
});


// Get single employee by ID
app.get('/employees/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get employee error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

// Update employee by ID
app.put("/employees/:id", (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, email, department } = req.body;
    const sql = "UPDATE employees SET FirstName = ?, LastName = ?, EmailId = ?, Department = ? WHERE id = ?";
    con.query(sql, [firstName, lastName, email, department, id], (err, result) => {
        if (err) return res.json({Error: "Update employee error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

// Delete employee by ID
app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employees WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Delete employee error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

// Authentication: Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email = ?";
    con.query(sql, [email], async (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0) {
            const match = await bcrypt.compare(password, result[0].Password);
            if(match) {
                const token = jwt.sign({ email: result[0].email }, "your_jwt_secret_key", { expiresIn: '1d' });
                return res.json({ Status: "Success", Token: token });
            } else {
                return res.json({ Status: "Error", Error: "Wrong Email or Password" });
            }
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    });
});

// Authentication: Login
app.post('/employeelogin', (req, res) => {
    const { EmailId, Password } = req.body;
    console.log(req.body);
    const sql = "SELECT * FROM employees WHERE EmailId = ?";
    con.query(sql, [EmailId], async (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0) {
            const match = await bcrypt.compare(Password, result[0].Password);
            if(match) {
                const token = jwt.sign({ email: result[0].email }, "your_jwt_secret_key", { expiresIn: '1d' });
                return res.json({ Status: "Success", Token: token });
            } else {
                return res.json({ Status: "Error", Error: "Wrong Email or Password" });
            }
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    });
});


// Authentication: Register (Admin registration)
app.post('/register', async (req, res) => {
    const { userName, password, email, fullname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO admin (UserName, Password, fullname, email) VALUES (?, ?, ?, ?)";
    con.query(sql, [userName, hashedPassword, fullname, email], (err, result) => {
        if(err) return res.json({ Status: "Error", Error: "Error in query execution" });
        return res.json({ Status: "Success", Result: result });
    });
});

// it will be used in admin only
app.get('/leaves', (req, res) => {
    const sql = "SELECT * FROM leaves";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get leaves error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

// Create a new leave employee only can apply for himself
app.post('/leaves/create', (req, res) => {
    const { LeaveType, ToDate, FromDate, Description, Status, IsRead, empid } = req.body;
    console.log(req.body);
    const sql = "INSERT INTO leaves (LeaveType, ToDate, FromDate, Description, Status, IsRead, empid) VALUES (?, ?, ?, ?, ?, ?, ?)";
    con.query(sql, [LeaveType, ToDate, FromDate, Description, Status, IsRead, empid], (err, result) => {
        if(err) return res.json({Error: "Create leave error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});


app.get('/employeesCount', (req, res) => {
    const sql = "Select count(*) as employee from employees";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
app.get('/adminCount', (req, res) => {
    const sql = "Select count(*) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
app.get('/leaveCount', (req, res) => {
    const sql = "Select count(*) as totalleaves from leaves";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
// /leavesApproved/${id}
app.put("/leavesApproved/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    const sql = "UPDATE leaves SET Status = 1 WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Error: "Update leaves error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});
// /leavesRejected/${id}
app.put("/leavesRejected/:id", (req, res) => {
    const id = req.params.id;

    const sql = "UPDATE leaves SET Status = 2 WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Error: "Update leaves error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

// it will be used in admin only department
app.get('/departments', (req, res) => {
    const sql = "SELECT * FROM departments";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get department error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

// department
app.post('/department/create', (req, res) => {
    const { DepartmentName, DepartmentShortName, DepartmentCode } = req.body;
    console.log(req.body)
    const sql = 'INSERT INTO departments (DepartmentName, DepartmentShortName, DepartmentCode) VALUES (?, ?, ?)';

    con.query(sql, [DepartmentName, DepartmentShortName, DepartmentCode], (err, result) => {
      if (err) {
        console.error('Error creating department:', err);
        return res.json({ Status: 'Error', Message: 'Error creating department' });
      }
      console.log('Department created successfully');
      return res.json({ Status: 'Success', Message: 'Department created successfully' });
    });
  });

// delete department 
app.delete('/departments/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM departments WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Delete department error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

// Get all leave types
app.get('/leavetypes', (req, res) => {
    const sql = "SELECT * FROM leavetype";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get leave types error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});

// Create a new leave type
app.post('/leavetype/create', (req, res) => {
    const { LeaveType, Description } = req.body;
    const sql = 'INSERT INTO leavetype (LeaveType, Description) VALUES (?, ?)';

    con.query(sql, [LeaveType, Description], (err, result) => {
      if (err) {
        console.error('Error creating leave type:', err);
        return res.json({ Status: 'Error', Message: 'Error creating leave type' });
      }
      console.log('Leave type created successfully');
      return res.json({ Status: 'Success', Message: 'Leave type created successfully' });
    });
});

// Delete a leave type 
app.delete('/leavetypes/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM leavetype WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Delete leave type error in SQL"});
        return res.json({Status: "Success", Result: result});
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
