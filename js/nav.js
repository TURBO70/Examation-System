window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const signInBtn = document.getElementById('signInBtn');
  const signUpBtn = document.getElementById('signUpBtn');

  if (isLoggedIn) {
    signInBtn.style.display = 'none';
    signUpBtn.textContent = 'Log out'; 
    signUpBtn.addEventListener('click', () => {
      localStorage.setItem('isLoggedIn', 'false');
      location.reload(); 
    });
  } else {
    signInBtn.style.display = 'inline-block';
    signUpBtn.textContent = 'Sign up';
    signUpBtn.href = 'sign_in.html';
  }
});
