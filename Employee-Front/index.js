document.getElementById("employeeForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const employee = {
      name: document.getElementById("employeeName").value,
      age: document.getElementById("employeeAge").value,
      salary: document.getElementById("employeeSalary").value,
    };
  
    try {
      const response = await fetch("http://localhost:8081/Employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
  
      if (response.ok) {
        window.location.href = "employee-success.html";
        document.getElementById("employeeForm").reset();
      } else {
        alert("Failed to add employee details.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  