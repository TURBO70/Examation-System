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
const examModal = document.getElementById("my_modal_5");
const cancelExam = document.getElementById("cancelExam");

startExamBtn.onclick = () => {
  examModal.showModal();
};

cancelExam.onclick = () => {
  examModal.close();
};


const confirmStartExam = document.getElementById("confirmStartExam");
const loginModal = document.getElementById("login_modal");
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
confirmStartExam.onclick = () => {
  examModal.close();

  if (!isLoggedIn) {
    loginModal.showModal();
  } else {
    location.replace("exam.html");
  }
};
document.getElementById("goToLogin").onclick = () => {
  location.replace("sign_in.html?mode=signin");
};

}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initHomePage);
} else {
  initHomePage();
}

