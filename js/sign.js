const container = document.querySelector(".container");
const btn = document.querySelector(".signin-btn");
const forms = document.querySelectorAll("form");
const errors = document.querySelectorAll(".error");
btn.onclick = function () {
    container.classList.toggle("active");
    btn.textContent = container.classList.contains("active") ? "Sign Up" : "Sign In";
    forms.forEach(form => form.reset());
     errors.forEach(er => er.textContent = "");
};
//const container = document.querySelector(".container");

document.getElementById("toSignin").onclick = () => {
  container.classList.add("active");
};

document.getElementById("toSignup").onclick = () => {
  container.classList.remove("active");
};

/////////////////////////////////////////////////////////////////////////
const eyes = document.querySelectorAll(".eye");
eyes.forEach(eye => {
  eye.addEventListener("click", () => {
    const input = eye.previousElementSibling;

    if (input.type === "password") {
      input.type = "text";
      eye.classList.remove("fa-eye");
      eye.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      eye.classList.remove("fa-eye-slash");
      eye.classList.add("fa-eye");
    }
  });
});

/////////////////////////////////////////////////////////////////////////

const signupForm = document.getElementById("signup-form");

  const namee = document.getElementById("signup_name");
    const email = document.getElementById("signup_email");
    const password = document.getElementById("signup_password");
    const confirmPassword = document.getElementById("signup_confirmPassword");

    const NameError = document.getElementById("name_error");
    const EmailError = document.getElementById("email_error");
    const PasswordError = document.getElementById("password_error");
    const RePasswordError = document.getElementById("re_password_error");

    const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    
    namee.addEventListener("blur", () => {
         const nameVal = namee.value.trim();
          if (nameVal === "") {
        NameError.textContent = "Name is required";
    }
     else if (/\d/.test(nameVal)) {
        NameError.textContent = "Numbers are not allowed in name";
    }
     else if (nameVal.length < 3) {
        NameError.textContent = "Invalid Name (too short) ";
    }
    else if (!nameRegex.test(namee.value.trim())) {
        NameError.textContent = "Name must be first and last name (e.g. Youssef Mohamed, Eman Refaat)";
    } else {
        NameError.textContent = "";
    }
    });

    email.addEventListener("blur", () => {
        if (email.value.trim() === "") {
        EmailError.textContent = "Email is required";
    }
      else if (!emailRegex.test(email.value.trim())) {
        EmailError.textContent = "Please enter a valid email address";
    } else {
        EmailError.textContent = "";
    }
});

    password.addEventListener("blur", () => {
         if (password.value.trim() === "") {
        PasswordError.textContent = "Password is required";
    }
      else if (!passwordRegex.test(password.value.trim())) {
        PasswordError.textContent = "Password must be at least 8 characters, contain one capital letter and one number";
    } else {
        PasswordError.textContent = "";
    }
});

   confirmPassword.addEventListener("blur", () => {
     if (confirmPassword.value.trim() === "") {
        RePasswordError.textContent = "Required";
    }
    else if (confirmPassword.value.trim() !== password.value.trim()) {
        RePasswordError.textContent = "Passwords do not match";
    } else {
        RePasswordError.textContent = "";
    }
});

signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    if (!nameRegex.test(namee.value.trim()) ||
        !emailRegex.test(email.value.trim()) ||
        !passwordRegex.test(password.value.trim()) ||
       (confirmPassword.value.trim() !== password.value.trim())
    ) {
        return; 
    }


    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email.value.trim())) {
        EmailError.textContent = "Email already exists!";
        return;
    }

    users.push({name : namee.value.trim(), email: email.value.trim(), password:password.value.trim()});
    localStorage.setItem("users", JSON.stringify(users));

     alert("Account created successfully ✔");
    signupForm.reset();
    
});
/////////////////////////////////////////////////////////////////////////////////////
const signinForm = document.getElementById("signin-form");

const email2 = document.getElementById("signin_email");
const password2 = document.getElementById("signin_password");

const EmailError2 = document.getElementById("email_error2");
const PasswordError2 = document.getElementById("password_error2");

email2.addEventListener("blur", () => {
     if (email2.value.trim() === "") {
        EmailError2.textContent = "Email is required";
    }
      else if (!emailRegex.test(email2.value.trim())) {
        EmailError2.textContent = "Please enter a valid email address";
    } else {
        EmailError2.textContent = "";
    }
});

    password2.addEventListener("blur", () => {
         if (password2.value.trim() === "") {
        PasswordError2.textContent = "Password is required";
    }
   else if (!passwordRegex.test(password2.value.trim())) {
        PasswordError2.textContent = "Password must be at least 8 characters, contain one capital letter and one number";
    } else {
        PasswordError2.textContent = "";
    }
});

signinForm.addEventListener("submit", function(e){
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email2.value.trim() && user.password === password2.value.trim());

    if(user){
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        
        window.location.href = "home.html";
    } else {
        PasswordError2.textContent = "Email or password is incorrect!";
    }
});



