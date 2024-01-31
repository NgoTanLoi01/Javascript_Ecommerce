//1. chon element
const btnSignUpSelector = document.querySelector(".btn-signup");
const inputAllSelector = document.querySelectorAll(".form-group input");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const errorMessageAll = document.querySelectorAll(".error_message");

//validate cho tung field mot (tung o input)
//trong tung o input check se dinh kem cac rule (quay tac validate)

//2. function xu ly su kien + chay lan dau load
function handleSignUpClick(event) {
  event.preventDefault();
  //1. Thuc hien validate
  for (let i = 0; i < inputAllSelector.length; i++) {
    let inputSelector = inputAllSelector[i];
    let valueInput = inputSelector.value;
    let divMessageSelector = inputSelector
      .closest(".form-group")
      .querySelector(".error_message");
    let name = inputSelector.name;

    //validate khong duoc rong
    if (name === "name") {
      //require
      if (!require(inputSelector)) {
        showError(inputSelector, "Tên không được để trống");
      } else {
        showSuccess(inputSelector);
      }
    } else if (name === "email") {
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
      }
    } else if (name === "password") {
      if(!require(inputSelector)){
        showError(inputSelector, "Password không được để trống");
      }else if(!minLength(inputSelector)){
        showError(inputSelector, `Password tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
      }else{
        showSuccess(inputSelector);
      }
    } else {
      if(!require(inputSelector)){
        showError(inputSelector, "Confirm password không được để trống");
      }else if(!minLength(inputSelector)){
        showError(inputSelector, `Confirm password tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
      }else if(!comparePass(inputSelector)){
        showError(inputSelector, "Confirm password không trùng với password");
      }
      else{
        showSuccess(inputSelector);
      }
    }
  }

  //kiem tra khong co o input nao co loi validate
  //1.luu user và localStorege
  //2. redirect den man hinh login
}

//rule require
//output: return true or false
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

function comparePass(inputSelector){
  let valueComfirmPass = inputSelector.value;
  let passwordSelector = document.querySelector('.' + inputSelector.getAttribute('selector_compare'));
  let valuePassword = passwordSelector.value;
  return valueComfirmPass === valuePassword;
}

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

//3. Them su kien cho phan tu
btnSignUpSelector.addEventListener("click", handleSignUpClick);
