//1. chon element
const btnSignUpSelector = document.querySelector(".btn-signup");
const inputAllSelector = document.querySelectorAll(".form-group input");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//validate cho tung field mot (tung o input)
//trong tung o input check se dinh kem cac rule (quay tac validate)

//======================= Start Listener Function======================
function handleSignUpClick(event) {
  event.preventDefault();
  let isNameValid;
  let isEmailValid;
  let isPassValid;
  let isConfirmPassValid;
  //1. Thuc hien validate
  for (let i = 0; i < inputAllSelector.length; i++) {
    let inputSelector = inputAllSelector[i];
    let name = inputSelector.name;
    //validate khong duoc rong
    if (name === "name") {
      isNameValid = validateName(inputSelector);
    } else if (name === "email") {
      isEmailValid = validateEmail(inputSelector);
    } else if (name === "password") {
      isPassValid = validatePassword(inputSelector);
    } else {
      isConfirmPassValid = validateConfirmPasswrod(inputSelector);
    }
  }
  // kiem tra khong co o input nao loi validate
  if (isNameValid && isEmailValid && isPassValid && isConfirmPassValid) {
    console.log('login page');
  }
}

//ham chi chay khi nguoi dung nhap value co su thay doi
function handleChangeValue(event) {
  let inputSelector = event.target;
  let nameInput = inputSelector.name;
  if (nameInput === "name") {
    validateName(inputSelector);
  } else if (nameInput === "email") {
    validateEmail(inputSelector);
  } else if (nameInput === "password") {
    validatePassword(inputSelector);
  } else {
    validateConfirmPasswrod(inputSelector);
  }
}

//======================= End Listener Function======================

//======================= Start Validate Input Function======================
function validateName(inputSelector) {
  let isValid = false;
  //require
  if (!require(inputSelector)) {
    showError(inputSelector, "Tên không được để trống");
  } else {
    showSuccess(inputSelector);
    isValid = true;
  }
  return isValid;
}

function validateEmail(inputSelector) {
  let isValid = false;
  if (!require(inputSelector)) {
    showError(inputSelector, "Email không được để trống");
  } else if (!minLength(inputSelector)) {
    showError(
      inputSelector,
      `Email tối thiểu ${inputSelector.getAttribute("min_length")} kí tự`
    );
  } else if (!emailRegex(inputSelector)) {
    showError(inputSelector, "Email không đúng định dạng");
  } else {
    showSuccess(inputSelector);
    isValid = true;
  }
  return isValid;
}

function validatePassword(inputSelector) {
  let isValid = false;
  if (!require(inputSelector)) {
    showError(inputSelector, "Password không được để trống");
  } else if (!minLength(inputSelector)) {
    showError(
      inputSelector,
      `Password tối thiểu ${inputSelector.getAttribute("min_length")} kí tự`
    );
  } else {
    showSuccess(inputSelector);
    isValid = true;
  }
  return isValid;
}

function validateConfirmPasswrod(inputSelector) {
  let isValid = false;
  if (!require(inputSelector)) {
    showError(inputSelector, "Confirm password không được để trống");
  } else if (!minLength(inputSelector)) {
    showError(
      inputSelector,
      `Confirm password tối thiểu ${inputSelector.getAttribute(
        "min_length"
      )} kí tự`
    );
  } else if (!comparePass(inputSelector)) {
    showError(inputSelector, "Confirm password không trùng với password");
  } else {
    showSuccess(inputSelector);
    isValid = true;
  }
  return isValid;
}
//======================= End Validate Input Function======================

//======================= Start Rules Function======================

function require(inputSelector) {
  return inputSelector.value ? true : false;
}

function minLength(inputSelector) {
  let minLenght = inputSelector.getAttribute("min_length");
  let inputValue = inputSelector.value;
  if (inputValue.length < minLenght) {
    return false;
  }
  return true;
}

function emailRegex(inputSelector) {
  let inputValue = inputSelector.value;
  return regexEmail.test(inputValue);
}

function comparePass(inputSelector) {
  let valueComfirmPass = inputSelector.value;
  let passwordSelector = document.querySelector(
    "." + inputSelector.getAttribute("selector_compare")
  );
  let valuePassword = passwordSelector.value;
  return valueComfirmPass === valuePassword;
}
//======================= End Rules Function======================

//======================= Start Messages Function=================
function showError(inputSelector, message = null) {
  //1.Hien thi mau do cho o input
  inputSelector.classList.add("error");
  //2.Them noi dung loi cho div masage duoi o input
  let divMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".error_message");
  divMessageSelector.textContent = message;
}

function showSuccess(inputSelector) {
  let divMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".error_message");
  inputSelector.classList.remove("error");
  divMessageSelector.textContent = "";
}

//======================= End Messages Function=================

//3. Them su kien cho phan tu
btnSignUpSelector.addEventListener("click", handleSignUpClick);
//Them su kien input cho cac o nhap lieu
for (let i = 0; i < inputAllSelector.length; i++) {
  let inputElement = inputAllSelector[i];
  inputElement.addEventListener("blur", handleChangeValue);
}
