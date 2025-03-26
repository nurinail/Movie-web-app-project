let getUsersAccounts = JSON.parse(localStorage.getItem("users"));
const loginForm = document.getElementById("login_form");
loginForm.addEventListener("submit", getLogin);
const succesfullyMes = document.getElementById(
  "auth_wrapper_form_successfully"
);

console.log(getUsersAccounts);
function getLogin(e) {
  e.preventDefault();
  const emailInputVal = document.getElementById("loginEmail").value;
  const passwordInputVal = document.getElementById("loginPassword").value;
  getUsersAccounts.map((user) => {
    if (user.email == emailInputVal && user.password == passwordInputVal) {
      setTimeout(() => {
        succesfullyMes.innerHTML = "";
        window.location.href = "../index.html";
      }, 1000);
    } else {
      setTimeout(() => {
        succesfullyMes.style.color = "red";
        succesfullyMes.style.marginLeft = "10rem";
        succesfullyMes.innerHTML = "Şifrə Yanlışdır";
      }, 1100);
    }
  });
}
