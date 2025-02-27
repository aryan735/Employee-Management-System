// all-employees.js

// Function to fetch all employees from the API
async function fetchAllEmployees() {
    try {
        // Make a GET request to the API endpoint
        const response = await fetch('http://localhost:8081/Employee');  // Ensure the URL is correct
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }
        
        // Parse the JSON response
        const employees = await response.json();
        
        // Call function to display employees
        displayEmployees(employees);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to display the list of employees
function displayEmployees(employees) {
    const employeesList = document.getElementById('employeeTableBody');
    
    // Clear the current content of the table
    employeesList.innerHTML = '';
    
    // Loop through each employee and create a table row for each
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        
        // Create and append table data for each column
        row.innerHTML = `
        
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.salary}</td>
            <td>
            <a href="edit-employee.html?id=${employee.id}" class="btn btn-sm btn-success">Edit Employee</a>
                <a href="view-details.html?id=${employee.id}" class="btn btn-sm btn-primary">View Details</a>
                <a href="delete-employee.html?id=${employee.id}" class="btn btn-sm btn-danger">Delete</a>
              </td>
        `;
        
        employeesList.appendChild(row);
    });
}

// Initialize the function to fetch and display employees on page load
window.onload = () => {
    fetchAllEmployees();
};
