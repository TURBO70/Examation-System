const page = location.pathname;

if (page.includes("exam.html") || page.includes("result.html")) {
  history.pushState(null, "", location.href);

  window.onpopstate = function () {
    history.pushState(null, "", location.href);
  };
}
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  let user = JSON.parse(localStorage.getItem("currentUser")) || [];
  if (!isLoggedIn) {
    window.location.replace('home.html');
    return;
  }
  if (user.exam_submitted === false || user.exam_submitted === 'false') {
    if (user.exam_started === true || user.exam_started === 'true') {
      user.exam_submitted = true;
      localStorage.setItem("currentUser", JSON.stringify(user));

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(u => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem("users", JSON.stringify(users));
      }
    } else {
      window.location.replace('home.html');
      return;
    }
  }

});
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const storedAnswers = currentUser ? currentUser.exam_answers : null;
const userAnswers = storedAnswers ? storedAnswers : new Array(questions.length).fill(null);

const total = questions.length;
let correct = 0;
const good_sound = new Audio('assets/good.mpeg');
questions.forEach((q, i) => {
  if (q.correct === userAnswers[i]) correct++;
});

const wrong = total - correct;
const percent = Math.round((correct / total) * 100);

let grade = "F", msg = "Hard luck";
if (percent >= 85) grade = "A";
else if (percent >= 75) grade = "B";
else if (percent >= 60) grade = "C";
else if (percent >= 50) grade = "D";

if (percent >= 50) {
  msg = "Congratulations";
}

document.getElementById("summary").innerHTML =
  SummaryComponent(total, correct, wrong, grade);

document.getElementById("progress").innerHTML =
  ProgressCircle(percent, grade);

const currentUserJSON = localStorage.getItem("currentUser");

if (currentUserJSON) {
  const currentUser = JSON.parse(currentUserJSON);
  const firstName = currentUser.name.trim().split(" ")[0];
  document.getElementById("userMessage").textContent =
    `${msg}, ${firstName}`;
}

const review = document.getElementById("review");
questions.forEach((q, i) => {
  review.innerHTML += QuestionReviewComponent(q, userAnswers[i], i);
});
