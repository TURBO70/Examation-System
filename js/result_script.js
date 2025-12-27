const storedAnswers = localStorage.getItem('exam_user_answers');
const userAnswers = storedAnswers ? JSON.parse(storedAnswers) : new Array(questions.length).fill(null);

const total = questions.length;
let correct = 0;

questions.forEach((q, i) => {
  if (q.correct === userAnswers[i]) correct++;
});

const wrong = total - correct;
const percent = Math.round((correct / total) * 100);

let grade = "F";
if (percent >= 85) grade = "A";
else if (percent >= 75) grade = "B";
else if (percent >= 60) grade = "C";
else if (percent >= 50) grade = "D";

document.getElementById("summary").innerHTML =
  SummaryComponent(total, correct, wrong, grade);

document.getElementById("progress").innerHTML =
  ProgressCircle(percent , grade);

const currentUserJSON = localStorage.getItem("currentUser");

if (currentUserJSON) {
  const currentUser = JSON.parse(currentUserJSON);
  const firstName = currentUser.name.trim().split(" ")[0];
  document.getElementById("userMessage").textContent =
    `Congratulations, ${firstName}`;
}

const review = document.getElementById("review");
questions.forEach((q, i) => {
  review.innerHTML += QuestionReviewComponent(q, userAnswers[i], i);
});
