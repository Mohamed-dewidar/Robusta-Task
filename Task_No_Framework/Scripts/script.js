// Variables to store references to HTML elements
let themeBtn; // Theme toggle button
let bodyElement; // Body Element
let formElement; // Form ELement
let imgLogoElement; // Infinity Logo Image Element
let inputFieldGroups; // array contains div.input-field-group elements
let inputFields; // array contains input.input-field elements
let questionElement; // p.question Element

// script variables
let lightTheme = true; // boolean to toggle the theme

// Wait for the page to load before running the script
addEventListener("load", scriptBegins);

// This function holds the script logic
function scriptBegins() {
  themeBtn = document.querySelector("[data-themeBtn]");
  bodyElement = document.querySelector("body");
  formElement = document.querySelector("form");
  imgLogoElement = document.querySelector("[data-logo]");
  inputFieldGroups = document.querySelectorAll("[data-inputfieldgroup]");
  inputFields = document.querySelectorAll(".input-field");
  questionElement = document.querySelector(".question");

  // check if localstorage contains old theme value
  if (localStorage.getItem("theme")) {
    lightTheme = localStorage.getItem("theme") === "true" ? true : false;
  }

  changeTheme();
  themeBtn.addEventListener("click", changeState);
}


/**
 * This function will 
 * - toggle the class dark-theme to the elements
 * - save the theme value at localstorage
 */
function changeTheme() {
  localStorage.setItem("theme", lightTheme);
  if (lightTheme) {
    // Activate light theme
    bodyElement.classList.remove("dark-theme");
    formElement.classList.remove("dark-theme");
    imgLogoElement.src = "../Assets/infinity-light.gif";
    for (let ele of inputFieldGroups) {
      ele.classList.remove("dark-theme");
    }
    for (let ele of inputFields) {
      ele.classList.remove("dark-theme");
    }
    questionElement.classList.remove("dark-theme");

    themeBtn.classList.remove("dark-theme");
    themeBtn.firstChild.classList.add("fa-moon");
    themeBtn.firstChild.classList.remove("fa-sun");
  } else {
    // Activate dark theme
    bodyElement.classList.add("dark-theme");
    formElement.classList.add("dark-theme");
    imgLogoElement.src = "../Assets/infinity-dark.gif";
    for (let ele of inputFieldGroups) {
      ele.classList.add("dark-theme");
    }
    for (let ele of inputFields) {
      ele.classList.add("dark-theme");
    }
    questionElement.classList.add("dark-theme");
    themeBtn.classList.add("dark-theme");
    themeBtn.firstChild.classList.remove("fa-moon");
    themeBtn.firstChild.classList.add("fa-sun");
  }
}


/**
 * This function will
 * - toggle the state lightTheme 
 * - apply the new theme by calling the changeTheme()
 */
function changeState() {
  lightTheme = !lightTheme;
  changeTheme();
}
