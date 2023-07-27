var API_URL = "https://private-b2e6827-robustatask.apiary-mock.com";
var API_PATH_SIGNUP = "/auth/register";

// Variables to store references to HTML elements
let fullNameElement; // Input element for user's full name
let fullNameErrElement; // element for fullname error message

let emailElement; // Input element for user's email
let emailErrElement; // element for email error message

let userNameElement; // Input element for user's username
let userNameErrElement; // element for username error message

let passwordElement; // Input element for user's password
let passwordErrElement; // element for password error message

let confirmPasswordElemnt; // Input element for user's confirm password
let confirmPasswordErrElemnt; // element for confirm password error message

let signupBtn; // Sign Up button element
let signupErrElement; // element for singup error message

// script variables
let fullNameError = true; // boolean to check if the fullname is invalid before submit
let emailError = true; // boolean to check if the email is invalid before submit
let userNameError = true; // boolean to check if the username is invalid before submit
let passwordError = true; // boolean to check if the password is invalid before submit
let confirmPasswordError = true; // boolean to check if the confirm password is invalid before submit

// Wait for the page to load before running the script
addEventListener("load", scriptBegins);

// This function holds the script logic
function scriptBegins() {
  fullNameElement = document.querySelector("[data-fullname]");
  fullNameErrElement = document.querySelector("[data-fullnameErr]");

  emailElement = document.querySelector("[data-email]");
  emailErrElement = document.querySelector("[data-emailErr]");

  userNameElement = document.querySelector("[data-username]");
  userNameErrElement = document.querySelector("[data-usernameErr]");

  passwordElement = document.querySelector("[data-password]");
  passwordErrElement = document.querySelector("[data-passwordErr]");

  confirmPasswordElemnt = document.querySelector("[data-confirmPassword]");
  confirmPasswordErrElemnt = document.querySelector(
    "[data-confirmPasswordErr]",
  );

  signupBtn = document.querySelector("[data-signupBtn]");
  signupErrElement = document.querySelector("[data-signupErr]");

  // Attach eventListeners to The elements
  fullNameElement.addEventListener("blur", validateFullname);
  emailElement.addEventListener("blur", validateEmail);
  userNameElement.addEventListener("blur", validateUsername);
  passwordElement.addEventListener("blur", validatePassword);
  confirmPasswordElemnt.addEventListener("blur", validateConfirmPassword);
  signupBtn.addEventListener("click", singupHandler);
}

/**
 *
 * - Validation functions to validate each input field
 * - Each function will check value according to regex
 * - <fieldname>Err variable is used to check before submting that all fields are valid
 */

function validateFullname(event) {
  let fullName = event.target.value.trim();

  // don't show errors, if user lose focus and field empty
  if (!fullName) {
    return;
  }

  // show errors, if user lose focus and field invalid
  if (!validator.matches(fullName, /^[A-Za-z\s]+$/)) {
    fullNameElement.parentElement.classList.add("invalid");
    fullNameErrElement.classList.remove("hide");
    fullNameError = true;
    return;
  }

  // field is valid
  fullNameElement.parentElement.classList.remove("invalid");
  fullNameErrElement.classList.add("hide");
  fullNameError = false;
}

function validateEmail(event) {
  let email = event.target.value.trim();

  // don't show errors, if user lose focus and field empty
  if (!email) {
    return;
  }

  // show errors, if user lose focus and field invalid
  if (!validator.isEmail(email)) {
    emailElement.parentElement.classList.add("invalid");
    emailErrElement.classList.remove("hide");
    emailError = true;
    return;
  }

  // field is valid
  emailElement.parentElement.classList.remove("invalid");
  emailErrElement.classList.add("hide");
  emailError = false;
}

function validateUsername(event) {
  let userName = event.target.value.trim();

  // don't show errors, if used lose focus and field empty
  if (!userName) {
    return;
  }

  // show errors, if user lose focus and field invalid
  if (!validator.isAlpha(userName)) {
    userNameElement.parentElement.classList.add("invalid");
    userNameErrElement.classList.remove("hide");
    userNameError = true;
    return;
  }

  // field is valid
  userNameElement.parentElement.classList.remove("invalid");
  userNameErrElement.classList.add("hide");
  userNameError = false;
}

function validatePassword(event) {
  let password = event.target.value;
  let errMsgs = isValidPassword(password);

  // don't show errors, if user lose focus and field empty
  if (!password) {
    return;
  }

  // show errors, if user lose focus and field invalid
  if (errMsgs.length) {
    while (passwordErrElement.firstChild) {
      passwordErrElement.removeChild(passwordErrElement.firstChild);
    }
    passwordElement.parentElement.classList.add("invalid");
    passwordErrElement.classList.remove("hide");
    passwordError = true;

    for (let msg of errMsgs) {
      const newListItem = document.createElement("li");
      newListItem.textContent = msg;
      passwordErrElement.appendChild(newListItem);
    }

    return;
  }

  // field is valid
  passwordElement.parentElement.classList.remove("invalid");
  passwordErrElement.classList.add("hide");
  passwordError = false;
}

function validateConfirmPassword(event) {
  let confirmPassword = event.target.value;

  // don't show errors, if user lose focus and field empty
  if (!confirmPassword) {
    return;
  }

  // show errors, if user lose focus and field invalid
  if (confirmPassword !== passwordElement.value) {
    confirmPasswordElemnt.parentElement.classList.add("invalid");
    confirmPasswordErrElemnt.classList.remove("hide");
    confirmPasswordError = true;
    return;
  }

  // field is valid
  confirmPasswordElemnt.parentElement.classList.remove("invalid");
  confirmPasswordErrElemnt.classList.add("hide");
  confirmPasswordError = false;
}

/**
 *
 * This function takes an input param the password
 * It check that password is valid
 * It returns an error messages array
 * Thar array will be used to display the error messages for missing password pattern
 */
function isValidPassword(password) {
  let errMsgs = [];
  // Validate password length (at least 8 characters)
  if (!validator.isLength(password, { min: 8 })) {
    errMsgs.push("Password must be at least 8 characters long.");
  }

  // Validate at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errMsgs.push("At least one uppercase letter.");
  }

  // Validate at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errMsgs.push("At least one lowercase letter.");
  }

  // Validate at least one special character
  if (!/[@$!%*#?&]/.test(password)) {
    errMsgs.push("At least one special character.");
  }

  // Validate at least one digit (number)
  if (!/\d/.test(password)) {
    errMsgs.push("At least one number.");
  }

  return errMsgs;
}

/**
 *
 * This Function will get called when click the submit button
 * - It will return and do no thing if any validation Error where presented
 * - otherwise it will send the request to server, then wait response
 */
async function singupHandler(event) {
  event.preventDefault();


  // show errors, if user submit and data not valid
  if (
    !event.target.form.reportValidity() ||
    fullNameError ||
    emailError ||
    userNameError ||
    passwordError ||
    confirmPasswordError
  ) {
    return;
  }

  // Show the loading spinner before making the XHR request
  loadingSpinner.style.display = "block";

  const body = {
    name: fullNameElement.value,
    email: emailElement.value,
    username: userNameElement.value,
    password: passwordElement.value,
  };

  try {
    // Send form data to the server using Fetch API
    let res = await fetch(`${API_URL}${API_PATH_SIGNUP}`, {
      method: "POST",
      body: body,
    });
    let data = await res.json();
    signupErrElement.textContent = data.message;
    signupErrElement.style.color = "green";
    console.log(data);
  } catch (e) {
    signupErrElement.textContent = "Something went wrong";
  }

  signupErrElement.classList.remove("hide");
  setTimeout(() => {
    signupErrElement.classList.add("hide");
    window.location.href = "../Html/signin.html";
  }, 2000);
  loadingSpinner.style.display = "none";
}
