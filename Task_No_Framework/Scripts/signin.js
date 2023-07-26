var API_URL = "https://private-b2e6827-robustatask.apiary-mock.com";
var API_PATH_SIGNIN = "/auth/login";

// Variables to store references to HTML elements
let emailElement; // Input element for user's email
let emailErrElement; // element for email error message

let passwordElement; // Input element for user's password
let passwordErrElement; // element for password error message

let signinBtn; // Sign IN button element
let signinErrElement; // element for singin error message

// script variables
let emailError = true; // boolean to check if the email is invalid before submit
let passwordError = true; // boolean to check if the password is invalid before submit

// Wait for the page to load before running the script
addEventListener("load", scriptBegins);

// This function holds the script logic
function scriptBegins() {
  emailElement = document.querySelector("[data-email]");
  emailErrElement = document.querySelector("[data-emailErr]");

  passwordElement = document.querySelector("[data-password]");
  passwordErrElement = document.querySelector("[data-passwordErr]");

  signinBtn = document.querySelector("[data-signinBtn]");
  signinErrElement = document.querySelector("[data-signinErr]");

  // Attach eventListeners to The elements
  emailElement.addEventListener("blur", validateEmail);
  passwordElement.addEventListener("blur", validatePassword);
  signinBtn.addEventListener("click", singinHandler);
}

/**
 *
 * - Validation functions to validate each input field
 * - Each function will check value according to regex
 * - <fieldname>Err variable is used to check before submting that all fields are valid
 */

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

function singinHandler(event) {
  event.preventDefault();

  if (emailError || passwordError) {
    return;
  }

  // Show the loading spinner before making the XHR request
  loadingSpinner.style.display = "block";

  // Configure the XHR request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${API_URL}${API_PATH_SIGNIN}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  const body = {
    email: emailElement.value,
    password: passwordElement.value,
  };

  xhr.onload = function () {
    // Hide the loading spinner after the response returns
    loadingSpinner.style.display = "none";

    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
    } else {
      signinErrElement.classList.remove("hide");
      setTimeout(() => {
        signinErrElement.classList.add("hide");
      }, 2000);
    }
  };

  xhr.onerror = function () {
    // Hide the loading spinner after the response returns
    loadingSpinner.style.display = "none";
    signinErrElement.classList.remove("hide");
    setTimeout(() => {
      signinErrElement.classList.add("hide");
    }, 2000);
  };

  xhr.send(body);
}
