//1. chon element
const btnSignUpSelector = document.querySelector(".btn-signup");
const inputNameSelector = document.querySelector(".name");
const inputEmailSelector = document.querySelector(".email");
const inputPasswordSelector = document.querySelector(".password");

const inputAllSelector = document.querySelectorAll(".form-group input");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const errorMessageAll = document.querySelectorAll('.error_message');

//validate cho tung field mot (tung o input)
//trong tung o input check se dinh kem cac rule (quay tac validate)

//2. function xu ly su kien + chay lan dau load
function handleSignUpClick(event) {
  event.preventDefault();
  let isFormValid = true;
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
      let isRequireValid = requireValidate(inputSelector, name);
      //check thanh cong
      if (isRequireValid) {
        showSuccess(inputSelector, divMessageSelector);
      } 
    } else if (name === "name") {
      // validate name toi thieu 3 ky tu
      minLengthValidate(inputSelector, name, "Tên phải có tối thiểu 3 ký tự.");
    } else if (name === "email") {
      let isMinlengthValid;
      let isEmailRegexValid;
      let isRequireValid = requireValidate(inputSelector, name);
      // validate email toi thieu 3 ky tu
      if (isRequireValid) {
        isMinlengthValid = minLengthValidate(
          inputSelector,
          name,
          "Email phải có tối thiểu 3 ký tự."
        );
      }
      //validate email
      if (isRequireValid && isMinlengthValid) {
        isEmailRegexValid = emailRegexValidate(inputSelector, name);
      }
      //check validate thanh cong
      if (isRequireValid && isMinlengthValid && isEmailRegexValid) {
        showSuccess(inputSelector, divMessageSelector);
      }
    } else if (name === "password") {
      let isRequireValid = requireValidate(inputSelector, name);
      let isMinlengthValid;
      // validate password toi thieu 8 ky tu
      if (isRequireValid) {
        isMinlengthValid = minLengthValidate(
          inputSelector,
          name,
          "password phải có tối thiểu 8 ký tự."
        );
      }
      //check thanh cong
      if (isRequireValid && isMinlengthValid) {
        showSuccess(inputSelector, divMessageSelector);
      }
    } else {
      let isRequireValid = requireValidate(inputSelector, name);
      let isMinlengthValid;
      let isCompareValid;
      // validate password toi thieu 8 ky tu
      if (isRequireValid) {
        isMinlengthValid = minLengthValidate(
          inputSelector,
          name,
          "confirm_password phải có tối thiểu 8 ký tự."
        );
      }

      //validate compare with password
      if(isRequireValid && isMinlengthValid){
        isCompareValid = compareFieldsValidate(inputSelector, name);
      }

      //check thanh cong
      if (isRequireValid && isMinlengthValid && isCompareValid) {
        showSuccess(inputSelector, divMessageSelector);
      }
    }
  }

  //kiem tra khong co o input nao co loi validate
  //1.luu user và localStorege
  //2. redirect den man hinh login
  for(let i = 0; i < errorMessageAll.length; i ++){
    if(errorMessageAll[i].textContent !== ''){
      isFormValid =false;
      break;
    }    
  }
  if(isFormValid){
    console.log('to page login');
  }

}

function showSuccess(inputSelector, divMessageSelector) {
  inputSelector.classList.remove("error");
  divMessageSelector.textContent = "";
}

//rule compare data
function compareFieldsValidate(inputSelector, name, message) {
  let isValid = true;
  let valueInput = inputSelector.value;
  let compareSelectorClass = inputSelector.getAttribute("selector_compare");
  let compareSelector = document.querySelector("." + compareSelectorClass);
  let divMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".error_message");
  if (compareSelector.value !== valueInput) {
    isValid = false;
    inputSelector.classList.add("error");
    //hien thi message loi
    let messageError = 'dữ liệu nhập ở' + name + ' không trùng với dữ liệu nhập ở ' + compareSelectorClass;
    if (message) {
      messageError = message;
    }
    divMessageSelector.textContent = messageError;
  }
  return isValid;
}

//rule require validate
function requireValidate(inputSelector, name, message) {
  let isValid = true;
  let valueInput = inputSelector.value;
  let divMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".error_message");
  if (valueInput === "") {
    isValid = false;
    //them vien do cho input
    inputSelector.classList.add("error");
    //hien thi message loi
    let messageError = name + " không được để trống.";
    if (message) {
      messageError = message;
    }
    divMessageSelector.textContent = messageError;
  }
  return isValid;
}

//rule validate email
function emailRegexValidate(inputSelector, name, message) {
  let isValid = true;
  let valueInput = inputSelector.value;
  let isValueRegex = regexEmail.test(valueInput);
  let divMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".error_message");

  if (isValueRegex === false) {
    isValid = false;
    inputSelector.classList.add("error");
    let messageError = name + " không hợp lệ.";
    if (message) {
      messageError = message;
    }
    divMessageSelector.textContent = messageError;
  }
  return isValid;
}

//rule validate min-length
function minLengthValidate(inputSelector, name, message) {
  let isValid = true;
  let valueInput = inputSelector.value;
  let divMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".error_message");
  //optional
  let minLength = inputSelector.getAttribute("min_length");

  if (valueInput.length < minLength) {
    isValid = false;
    inputSelector.classList.add("error");
    let messageError = name + " tối thiểu " + minLength + " kí tự.";
    if (message) {
      messageError = message;
    }
    divMessageSelector.textContent = messageError;
  }
  return isValid;
}

//3. Them su kien cho phan tu
btnSignUpSelector.addEventListener("click", handleSignUpClick);
