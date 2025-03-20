"use strict";
const signupForm = document.getElementById("signup_form");
const loginForm = document.getElementById("login_form");

signupForm.addEventListener("submit", getSignUp);
function getSignUp(e) {
  e.preventDefault();
  const email = document.getElementById("auth_wrapper_form_email");
  const password = document.getElementById("auth_wrapper_form_password");
  const repeadPassword = document.getElementById(
    "auth_wrapper_form_repead_password"
  );
  const emailWarning = document.getElementById(
    "auth_wrapper_form_email_warning"
  );
  const passwordWarning = document.getElementById(
    "auth_wrapper_form_password_warning"
  );
  const repeadPasswordWarning = document.getElementById(
    "auth_wrapper_form_repead_password_warning"
  );

  let isValid = true;

  if (!email.value) {
    emailWarning.innerHTML = "Can’t be empty";
    email.style.borderBottom="0.1rem solid #FC4747";
    isValid = false;
  } else {
    emailWarning.innerHTML = "";
    email.style.borderBottom="0.1rem solid #5A698F";
    
  }

  if (!password.value) {
    passwordWarning.innerHTML = "Can’t be empty";
    password.style.borderBottom="0.1rem solid #FC4747";
    isValid = false;
  } else {
    passwordWarning.innerHTML = "";
    password.style.borderBottom="0.1rem solid #5A698F";
  }
  if (!repeadPassword.value) {
    repeadPasswordWarning.innerHTML = "Can’t be empty";
    repeadPassword.style.borderBottom="0.1rem solid #FC4747";
    isValid = false;
  } else {
    repeadPasswordWarning.innerHTML = "";
    repeadPassword.style.borderBottom="0.1rem solid #5A698F";
  }
  if (password.value !== repeadPassword.value) {
    repeadPasswordWarning.innerHTML = "Password does not match!";
    repeadPassword.style.borderBottom="0.1rem solid #FC4747";
    isValid = false;
  } else {
    repeadPasswordWarning.innerHTML = "";
    repeadPassword.style.borderBottom="0.1rem solid #5A698F";
  }
  if (isValid) {
    let successfullyWarning = document.getElementById(
      "auth_wrapper_form_successfully"
    );
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = {
      email: email.value,
      password: password.value,
    };
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    email.value = "";
    password.value = "";
    repeadPassword.value = "";
    successfullyWarning.innerHTML = "Account successfully created";
    setTimeout(() => {
      successfullyWarning.innerHTML = "";
    }, 1000);
    setTimeout(() => {
      console.log("object");
      window.location.href = "login.html";
    }, 1500);
  }
}
