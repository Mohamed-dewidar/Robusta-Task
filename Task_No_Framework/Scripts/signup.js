var API_URL = "https://private-b2e6827-robustatask.apiary-mock.com";
var API_PATH_SIGNUP = "/auth/register";
var API_PATH_SIGNIN = "/auth/login";

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

// script variables
let fullNameError = false; // boolean to check if the fullname is invalid before submit
let emailError = false; // boolean to check if the email is invalid before submit
let userNameError = false; // boolean to check if the username is invalid before submit
let passwordError = false; // boolean to check if the password is invalid before submit
let confirmPasswordError = false; // boolean to check if the confirm password is invalid before submit

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

  // Attach eventListeners to The elements
  fullNameElement.addEventListener("blur", validateFullname);
  emailElement.addEventListener("blur", validateEmail);
  userNameElement.addEventListener("blur", validateUsername);
  passwordElement.addEventListener("blur", validatePassword);
  confirmPasswordElemnt.addEventListener("blur", validateConfirmPassword);
}

/**
 *
 * - Validation functions to validate each input field
 * - Each function will check value according to regex
 * - <fieldname>Err variable is used to check before submting that all fields are valid
 */

function validateFullname(event) {
  let fullName = event.target.value.trim();

  if (!validator.matches(fullName, /^[A-Za-z\s]+$/)) {
    fullNameElement.classList.add("invalid");
    fullNameErrElement.classList.remove("hide");
    fullNameError = true;
    return;
  }
  fullNameElement.classList.remove("invalid");
  fullNameErrElement.classList.add("hide");
  fullNameError = false;
}

function validateEmail(event) {
  let email = event.target.value.trim();

  if (!validator.isEmail(email)) {
    emailElement.classList.add("invalid");
    emailErrElement.classList.remove("hide");
    emailError = true;
    return;
  }

  emailElement.classList.remove("invalid");
  emailErrElement.classList.add("hide");
  emailError = false;
}

function validateUsername(event) {
  let userName = event.target.value.trim();

  if (!validator.isAlpha(userName)) {
    userNameElement.classList.add("invalid");
    userNameErrElement.classList.remove("hide");
    userNameError = true;
    return;
  }

  userNameElement.classList.remove("invalid");
  userNameErrElement.classList.add("hide");
  userNameError = false;
}

function validatePassword(event) {
  let password = event.target.value;
  let errMsgs = isValidPassword(password);

  if (errMsgs.length) {
    while (passwordErrElement.firstChild) {
      passwordErrElement.removeChild(passwordErrElement.firstChild);
    }
    passwordElement.classList.add("invalid");
    passwordErrElement.classList.remove("hide");
    passwordError = true;

    for (let msg of errMsgs) {
      const newListItem = document.createElement("li");
      newListItem.textContent = msg;
      passwordErrElement.appendChild(newListItem);
    }

    return;
  }

  passwordElement.classList.remove("invalid");
  passwordErrElement.classList.add("hide");
  passwordError = false;
}

function validateConfirmPassword(event) {
  let confirmPassword = event.target.value;
  console.log(passwordElement.value)
  if (confirmPassword !== passwordElement.value) {
    confirmPasswordElemnt.classList.add("invalid");
    confirmPasswordErrElemnt.classList.remove("hide");
    confirmPasswordError = true;
    return;
  }
  confirmPasswordElemnt.classList.remove("invalid");
  confirmPasswordErrElemnt.classList.add("hide");
  confirmPasswordError = false;
}

/**
 *
 * This function takes an input param the password
 * It check that password is valid
 * It returns an error messages array
 * Thar array will be used to disp;ay the error messages for missing password pattern
 */
function isValidPassword(password) {
  let errMsgs = [];
  // Validate password length (at least 8 characters)
  if (!validator.isLength(password, { min: 8 })) {
    errMsgs.push("Password must be at least 8 characters long.");
  }

  // Validate at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errMsgs.push("at least one uppercase letter.");
  }

  // Validate at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errMsgs.push("at least one lowercase letter.");
  }

  // Validate at least one special character
  if (!/[@$!%*#?&]/.test(password)) {
    errMsgs.push("least one special character");
  }

  // Validate at least one digit (number)
  if (!/\d/.test(password)) {
    errMsgs.push("at least one number");
  }

  return errMsgs;
}
