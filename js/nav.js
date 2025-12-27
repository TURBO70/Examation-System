window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const signInBtn = document.getElementById('signInBtn');
  const signUpBtn = document.getElementById('signUpBtn');
if (isLoggedIn) {
  signInBtn.classList.add('hidden');

  signUpBtn.textContent = 'Log out';
  signUpBtn.classList.add('logout-btn');
  signUpBtn.removeAttribute('href');

  signUpBtn.onclick = () => {
    localStorage.setItem('isLoggedIn', 'false');
    location.reload();
  };

} else {
  signInBtn.classList.remove('hidden');

  signUpBtn.textContent = 'Sign up';
  signUpBtn.classList.remove('logout-btn');
  signUpBtn.href = 'sign_in.html';
}

});
