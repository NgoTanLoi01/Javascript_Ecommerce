//1. chon element
const btnSignUpSelector = document.querySelector(".btn-signup");
const inputAllSelector = document.querySelectorAll(".form-group input");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// input
const rules = {
  name: {
    required: true,
  },
  email: {
    required: true,
    minlength: 3,
    email: true,
  },
  password: {
    required: true,
    minlength: 8,
  },
  confirm_password: {
    required: true,
    minlength: 8,
    equal_to: "password",
  },
};

const methodsRule = {
  required: (valueInput, paramsInput) => {
    console.log("required running");
    return valueInput !== "";
  },
  minlength: function (valueInput, paramsInput) {
    console.log("minlength running");
    return valueInput.lenth >= paramsInput;
  },
  email: function (valueInput, paramsInput) {
    console.log("email running");
    return regexEmail.test(valueInput);
  },
  equal_to: function (valueInput, paramsInput) {
    console.log("equal_to running");
    let passSelector = document.querySelector('.' + paramsInput);
    let valuePass = passSelector.value;
    return valuePass === valueInput;
  },
};

//======================= Start Listener Function======================
function handleSignUpClick(event) {
  event.preventDefault();
  //loop qua tung phan tu input validate
  for (const keyNameInput in rules) {
    let inputElement = document.querySelector("." + keyNameInput);
    let valueInput = inputElement.value;
    console.log(inputElement);
    let ruleAllForInput = rules[keyNameInput];
    //loop qua tung rule validate cua input day
    for (const ruleItemKey in ruleAllForInput) {
      let paramsInput = ruleAllForInput[ruleItemKey];
      let result = methodsRule[ruleItemKey](valueInput, paramsInput);
      console.log("result", result);
    }
  }
}

//3. Them su kien cho phan tu
btnSignUpSelector.addEventListener("click", handleSignUpClick);
