document.addEventListener("DOMContentLoaded", async function () {
  // Extract the ID from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // Get the `id` parameter

  if (!id) {
    document.getElementById("employeeDetails").innerHTML = "<p>Invalid employee ID.</p>";
    return;
  }

  try {
    // Fetch the specific employee by ID
    const response = await fetch(`http://localhost:8081/Employee/${id}`);
    if (response.ok) {
      const employee = await response.json();
      document.getElementById("id").textContent = employee.id || "Not Provided";
      document.getElementById("name").textContent = employee.name || "Not Provided";
      document.getElementById("age").textContent = employee.age || "Not Provided";
      document.getElementById("salary").textContent = employee.salary || "Not Provided";
    } else {
      document.getElementById("employeeDetails").innerHTML = "<p>Employee not found.</p>";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("employeeDetails").innerHTML = "<p>An error occurred while fetching the employee details.</p>";
  }
});
