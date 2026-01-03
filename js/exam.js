const page = location.pathname;

if (page.includes("exam.html") || page.includes("result.html")) {
  history.pushState(null, "", location.href);

  window.onpopstate = function () {
    history.pushState(null, "", location.href);
  };
}
document.addEventListener('DOMContentLoaded', () => {
  let user = JSON.parse(localStorage.getItem("currentUser")) || [];
  if (user.exam_submitted === true || user.exam_submitted === 'true') {
    window.location.replace('result.html');
    return;
  }


});

let currentQuestionIndex = 0;
let userAnswers = [];
let flaggedQuestions = new Set();
let examStartTime = null;
let examDuration = 6 * 60;
let timeRemaining = examDuration;
let timerInterval = null;

let shuffledQuestions = [];
let originalIndexMap = [];



function initExam() {
  examStartTime = Date.now();
  userAnswers = new Array(questions.length).fill(null);
  currentQuestionIndex = 0;
  flaggedQuestions.clear();

  const indices = Array.from({ length: questions.length }, (_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  originalIndexMap = indices;
  shuffledQuestions = indices.map(idx => questions[idx]);

  startTimer();
  renderQuestionNavigation();
  loadQuestion(0);
  updateAnsweredCount();
}

const time_out_sound = new Audio('assets/Time_out.mpeg');
const tin = new Audio('assets/tin.mpeg');
function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;

    if (timeRemaining === 5 * 60) {
      tin.play();
      document.getElementById('my_modal_3').showModal();
    }

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timeRemaining = 0;
      autoSubmit();
      return;
    }

    updateTimerDisplay();
  }, 1000);

  updateTimerDisplay();

}

function updateTimerDisplay() {
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;


  const timerElement = document.getElementById('timerDisplay');

  timerElement.textContent =
    `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;


  if (timeRemaining <= 5 * 60) {
    timerElement.classList.add('text-red-600', 'font-extrabold');
  } else {
    timerElement.classList.remove('text-red-600', 'font-extrabold');
  }

  const progress = (timeRemaining / examDuration) * 100;

  document.getElementById('timerProgress').value = progress;


}

function loadQuestion(index) {


  if (index < 0 || index >= questions.length) return;

  currentQuestionIndex = index;
  const question = shuffledQuestions[index];

  document.getElementById('questionText').textContent = `${index + 1}. ${question.question}`;

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';



  question.options.forEach((option, i) => {

    const div = document.createElement('div');
    div.className = 'flex items-center p-5 border-2 border-gray-400 rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-600 hover:bg-blue-50';

    if (userAnswers[originalIndexMap[index]] === option) {
      div.classList.add('bg-blue-100', 'border-blue-700');
    }

    const radio = document.createElement('input');


    radio.type = 'radio';
    radio.name = 'questionOption';
    radio.value = option;
    radio.id = `opt-${i}`;
    radio.checked = userAnswers[originalIndexMap[index]] === option;
    radio.className = 'radio radio-primary mr-4';


    const label = document.createElement('label');
    label.htmlFor = `opt-${i}`;

    label.className = 'flex-1 cursor-pointer text-lg font-medium text-gray-900';
    label.textContent = option;

    radio.addEventListener('change', () => selectAnswer(option));

    div.appendChild(radio);
    div.appendChild(label);

    container.appendChild(div);

  });


  updateBookmarkButton();
  updateNavigationButtons();
  updateQuestionNavigation();


}



function selectAnswer(answer) {

  const originalIndex = originalIndexMap[currentQuestionIndex];
  userAnswers[originalIndex] = answer;

  updateAnsweredCount();


  loadQuestion(currentQuestionIndex);
}

function updateAnsweredCount() {

  const answered = userAnswers.filter(a => a !== null).length;

  document.getElementById('answeredCount').textContent = answered;
  document.getElementById('totalQuestions').textContent = questions.length;
}

function toggleBookmark() {
  if (flaggedQuestions.has(currentQuestionIndex)) {
    flaggedQuestions.delete(currentQuestionIndex);
  } else {
    flaggedQuestions.add(currentQuestionIndex);
  }


  updateBookmarkButton();

  updateQuestionNavigation();

}



function updateBookmarkButton() {


  const btn = document.getElementById('bookmarkBtn');
  if (flaggedQuestions.has(currentQuestionIndex)) {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>`;
  } else {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>`;
  }

}



function updateNavigationButtons() {
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  prev.disabled = currentQuestionIndex === 0;
  next.disabled = currentQuestionIndex === questions.length - 1;


  prev.style.opacity = prev.disabled ? '0.6' : '1';
  next.style.opacity = next.disabled ? '0.6' : '1';
}


function goToPrevious() {
  if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1);
}


function goToNext() {
  if (currentQuestionIndex < questions.length - 1) loadQuestion(currentQuestionIndex + 1);
}

function renderQuestionNavigation() {
  const nav = document.getElementById('questionNav');
  nav.innerHTML = '';


  for (let displayIndex = 0; displayIndex < questions.length; displayIndex++) {
    const btn = document.createElement('button');
    btn.className = 'btn w-full h-12 rounded-lg font-bold text-sm flex items-center justify-between px-4 transition-colors duration-200';
    btn.dataset.displayIndex = displayIndex;



    const textSpan = document.createElement('span');
    textSpan.textContent = `Question ${displayIndex + 1}`;
    btn.appendChild(textSpan);

    const rightSlot = document.createElement('span');
    rightSlot.className = 'w-8 text-right';
    btn.appendChild(rightSlot);



    btn.addEventListener('click', () => loadQuestion(displayIndex));
    nav.appendChild(btn);
  }



  updateQuestionNavigation();
}

function updateQuestionNavigation() {
  const buttons = document.querySelectorAll('#questionNav button');


  buttons.forEach(btn => {
    const displayIndex = parseInt(btn.dataset.displayIndex);

    btn.classList.remove('bg-gray-200', 'bg-success', 'bg-warning', 'custom-current', 'hover:bg-gray-300', 'hover:bg-success/90', 'hover:bg-warning/90', 'hover:opacity-90');

    const textSpan = btn.querySelector('span:first-child');
    const rightSlot = btn.querySelector('span:last-child');

    textSpan.className = 'text-gray-800';

    rightSlot.innerHTML = '';
    rightSlot.className = 'w-8 text-right';

    if (displayIndex === currentQuestionIndex) {
      btn.classList.add('custom-current', 'hover:opacity-90');
      textSpan.className = 'text-white';
    }
    else if (userAnswers[originalIndexMap[displayIndex]] !== null) {
      btn.classList.add('custom-current', 'hover:opacity-90');
      textSpan.className = 'text-white';
    }
    else {
      btn.classList.add('bg-gray-200', 'hover:bg-gray-300');
    }


    if (flaggedQuestions.has(displayIndex)) {
      btn.classList.remove('bg-gray-200', 'bg-success', 'custom-current');

      btn.classList.add('bg-warning', 'hover:bg-warning/90');
      textSpan.className = 'text-warning-content';
      rightSlot.innerHTML = '🚩';
      rightSlot.className = 'w-8 text-right text-lg';
    }


  });

}


function showSubmitModal() {
  const answered = userAnswers.filter(a => a !== null).length;

  if (answered < questions.length) {
    document.getElementById('finalAnsweredCount').textContent = answered;
    document.getElementById('finalTotalQuestions').textContent = questions.length;
    document.getElementById('my_modal_4').showModal();
  } else {
    document.getElementById('my_modal_1').showModal();
  }
}

function saveExamResult() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    currentUser.exam_submitted = true;
    currentUser.exam_answers = userAnswers;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
      users[userIndex] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
}

function confirmSubmit() {
  clearInterval(timerInterval);
  saveExamResult();
  window.location.replace('result.html');
}

function cancelSubmit() {
  document.getElementById('submitModal').close();
}


function autoSubmit() {
  time_out_sound.play();
  document.getElementById('my_modal_2').showModal();
}


document.addEventListener('DOMContentLoaded', () => {
  initExam();

  document.getElementById('prevBtn').addEventListener('click', goToPrevious);
  document.getElementById('nextBtn').addEventListener('click', goToNext);
  document.getElementById('bookmarkBtn').addEventListener('click', toggleBookmark);

  document.getElementById('submitBtn').addEventListener('click', showSubmitModal);
  document.getElementById('confirmSubmitBtn').addEventListener('click', confirmSubmit);
  document.getElementById('cancelSubmitBtn').addEventListener('click', cancelSubmit);


  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();

  });


  window.addEventListener('beforeunload', (e) => {
    if (timeRemaining > 0) {
      e.preventDefault();
      e.returnValue = '';
    }

  });
});


function closeModal(id) {
  document.getElementById(id).close();
}