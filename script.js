const container = document.querySelector(".container");
const btn = document.querySelector(".signin-btn");

btn.onclick = function () {
    container.classList.toggle("active");
    btn.textContent = container.classList.contains("active") ? "Sign Up" : "Sign In";
};


const form = document.getElementById("register-Form");
const error = document.getElementById("error");

form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const name = document.getElementById("signup_name").value.trim();
    const email = document.getElementById("signup_email").value.trim();
    const password = document.getElementById("signup_password").value;
    const confirmPassword = document.getElementById("signup_confirmPassword").value;

    const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!nameRegex.test(name)) {
        error.textContent = "Name must be first and last name (e.g. Youssef Mohamed,Eman Refaat)";
        return;
    }

    if (!emailRegex.test(email)) {
        error.textContent = "Please enter a valid email address";
        return;
    }

    if (!passwordRegex.test(password)) {
        error.textContent =
            "Password must be at least 8 characters, contain one capital letter and one number";
        return;
    }

    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match";
        return;
    }

    error.style.color = "green";
    error.textContent = "Account created successfully ✔";

});
