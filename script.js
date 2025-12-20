const container = document.querySelector(".container"); 
const btn = document.querySelector(".signin-btn"); 
btn.onclick = function () { container.classList.toggle("active"); 
    btn.textContent = container.classList.contains("active") ? "Sign Up" : "Sign In"; };