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

document.getElementById("userMessage").textContent =
  `Congratulations, Youssef`;

const review = document.getElementById("review");
questions.forEach((q, i) => {
  review.innerHTML += QuestionReviewComponent(q, userAnswers[i], i);
});
