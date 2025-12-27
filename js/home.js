function initHomePage() {
  const homeNameElement = document.getElementById("home_name");
  if (homeNameElement) {
    const currentUserJSON = localStorage.getItem("currentUser");
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON);
      const firstName = currentUser.name.trim().split(" ")[0];
      homeNameElement.textContent = `Welcome, ${firstName}!`;
    } else {
      homeNameElement.textContent = `Welcome, Student!`;
    }
  }

  const startExamBtn = document.getElementById("startExamBtn");
  if (startExamBtn) {
    startExamBtn.addEventListener("click", function() {
      window.location.href = "exam.html";
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initHomePage);
} else {
  initHomePage();
}