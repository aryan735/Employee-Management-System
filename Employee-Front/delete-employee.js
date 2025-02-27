document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    const confirmDeleteButton = document.getElementById("confirmDelete");
    const cancelDeleteButton = document.getElementById("cancelDelete");
    const deleteStatus = document.getElementById("deleteStatus");
  
    if (!id) {
      deleteStatus.innerHTML = "<p class='text-danger'>Invalid employee ID.</p>";
      document.getElementById("deleteConfirmation").style.display = "none";
      return;
    }
  
    confirmDeleteButton.addEventListener("click", async function () {
      try {
        const response = await fetch(`http://localhost:8081/Employee/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          // Show the success message when the employee is deleted
          deleteStatus.innerHTML = `
            <p class='text-success'>This employee is successfully removed.</p>
          `;
          document.getElementById("deleteConfirmation").style.display = "none";
          document.getElementById('goBackButton').style.display = 'block';

        } else {
          deleteStatus.innerHTML = "<p class='text-danger'>Failed to delete employee.</p>";
        }
      } catch (error) {
        console.error("Error:", error);
        deleteStatus.innerHTML = "<p class='text-danger'>An error occurred while deleting the employee.</p>";
      }
    });
  
    cancelDeleteButton.addEventListener("click", function () {
      window.location.href = "all-employees.html"; // Redirect back to the employee list
    });
  });
  