document.addEventListener("DOMContentLoaded", async function () {
  // Extract the ID from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const statusMessage = document.getElementById("statusMessage");
  const editEmployeeForm = document.getElementById("editEmployeeForm");

  if (!id) {
    statusMessage.innerHTML = "<p class='text-danger'>Invalid employee ID.</p>";
    return;
  }

  try {
    // Fetch the current employee details
    const response = await fetch(`http://localhost:8081/Employee/${id}`);
    if (response.ok) {
      const employee = await response.json();
      // Populate the form with current employee data
      document.getElementById("employeeId").value = employee.id;
      document.getElementById("name").value = employee.name;
      document.getElementById("age").value = employee.age;
      document.getElementById("salary").value = employee.salary;
    } else {
      statusMessage.innerHTML = "<p class='text-danger'>Employee not found.</p>";
    }
  } catch (error) {
    console.error("Error:", error);
    statusMessage.innerHTML = "<p class='text-danger'>An error occurred while fetching the employee details.</p>";
  }

  // Handle form submission to update employee details
  editEmployeeForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const updatedEmployee = {
      id: document.getElementById("employeeId").value,
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      salary: document.getElementById("salary").value,
    };

    try {
      const response = await fetch(`http://localhost:8081/Employee/${updatedEmployee.id}`, {
        method: "PUT", // HTTP PUT request to update the employee
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (response.ok) {
        statusMessage.innerHTML = "<p class='text-success'>Employee updated successfully.</p>";
        window.location.href = "all-employees.html";

      } else {
        statusMessage.innerHTML = "<p class='text-danger'>Failed to update employee.</p>";
      }
    } catch (error) {
      console.error("Error:", error);
      statusMessage.innerHTML = "<p class='text-danger'>An error occurred while updating the employee.</p>";
    }
  });
});
