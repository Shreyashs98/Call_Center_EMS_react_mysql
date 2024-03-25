
  <h1>Call Center Application</h1>

  <p>This is a simple call center application built using React for the frontend and MySQL for the backend. The application allows call center agents to manage employee leaves and employee login.</p>

  <h2>Features</h2>
  

  <h2>Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React, React Router, Axios, Bootstrap (for styling)</li>
    <li><strong>Backend:</strong> Node.js, Express.js, MySQL</li>
    <li><strong>Authentication:</strong> JSON Web Tokens (JWT)</li>
    <li><strong>Database:</strong> MySQL</li>
    <li><strong>Other Tools:</strong> Git (for version control), npm (for package management)</li>
  </ul>

  <h2>Prerequisites</h2>
  <p>Before running this application, make sure you have the following installed:</p>
  <ul>
    <li>Node.js and npm (Node Package Manager)</li>
    <li>MySQL</li>
  </ul>

  <h2>Getting Started</h2>
  <ol>
    <li><strong>Clone the repository:</strong><br>
        <code>git clone https://github.com/Shreyashs98/call-center-app.git</code></li>
    <li><strong>Navigate to the project directory:</strong><br>
        <code>cd call-center-app</code></li>
    <li><strong>Install dependencies:</strong><br>
        <code>npm install</code></li>
    <li><strong>Set up the MySQL database:</strong><br>
        <ul>
          <li>Create a MySQL database named <code>call_center</code>.</li>
          <li>Import the database schema from the <code>database.sql</code> file provided below.</li>
        </ul>
    </li>
    <li><strong>Configure backend environment variables:</strong><br>
        <ul>
          <li>Rename the <code>.env.example</code> file in the <code>backend</code> directory to <code>.env</code>.</li>
          <li>Update the <code>.env</code> file with your MySQL database credentials.</li>
        </ul>
    </li>
    <li><strong>Start the backend server:</strong><br>
        <code>cd backend<br>npm start</code></li>
    <li><strong>Start the frontend development server:</strong><br>
        <code>cd ..<br>npm start</code></li>
    <li><strong>Open the application:</strong><br>
        The application should now be running on <code>http://localhost:3000</code> in your browser.</li>
  </ol>

  <h2>Folder Structure</h2>
  <p>The folder structure of this project is organized as follows:</p>
  <pre>
    call-center-app/
    ├── backend/            # Backend server code
    │   ├── controllers/    # Controllers for handling routes
    │   ├── models/         # Database models
    │   ├── routes/         # API routes
    │   └── ...
    ├── frontend/           # Frontend React application
    │   ├── public/        # Public files
    │   ├── src/           # React components and assets
    │   └── ...
  
  </pre>


  <h2>Contributing</h2>
  <p>Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please feel free to open an issue or create a pull request.</p>

  <h2>License</h2>
  <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>
