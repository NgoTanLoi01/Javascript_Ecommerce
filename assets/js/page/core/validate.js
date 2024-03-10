function Validate(options) {
  //Khai bao bien co options
  const btnClassSubmit = options.btnClassSubmit || "btn-signup";
  const errorClass = options.errorClass || "error";
  const errorMessageClass = options.errorMessageClass || "error_message";
  const formGroupClass = options.formGroupClass || "form-group";
  const rules = options.rules;
  const message = options.message;
// Truy van Dom cua thu vien
  const container = document.querySelector(options.container);
  const btnSignUpSelector = container.querySelector("." + btnClassSubmit);

  const messageDefault = {
    required: 'This field is required',
    minlength: 'Please enter at latest {min} character',
    regex: 'Please enter true format',
    equal_to: 'This field not same value'
  }

  let errors;

  const rulesMethod = {
    required: function (valueInput, valueRule) {
      return valueInput !== "";
    },
    minlength: function (valueInput, valueRule) {
      return valueInput.length >= valueRule;
    },
    regex: function (valueInput, valueRule) {
      return valueRule.test(valueInput);
    },
    equal_to: function (valueInput, valueRule) {
      let passSelector = container.querySelector("." + valueRule);
      let valuePass = passSelector.value;
      return valueInput === valuePass;
    },
  };

  function initEventAndData() {
    btnSignUpSelector.addEventListener("click", handleSignUpClick);
  }

  function handleSignUpClick(event) {
    event.preventDefault();
    errors = [];
    for (const keyInputName in rules) {
      const inputSelector = container.querySelector("." + keyInputName);
      const valueInput = inputSelector.value;
      const rulesAllForInputItem = rules[keyInputName];
      //reset all errors
      resetErrors(inputSelector);

      for (const rulesItemKey in rulesAllForInputItem) {
        const valueRule = rulesAllForInputItem[rulesItemKey];
        const result = rulesMethod[rulesItemKey](valueInput, valueRule);
        const keyMessage = keyInputName + "_" + rulesItemKey;
        if (!result) {
          //đẩy lỗi vào biến đang lưu trữ
          let messageErrDefault = messageDefault[rulesItemKey];
          messageErrDefault = messageErrDefault.replace('{min}', valueRule);
          errors.push({
            elemnetError: inputSelector,
            message: message[keyMessage]
              ? message[keyMessage]
              : messageErrDefault
          });

          break;
        }
      }
    }
    if (errors.length) {
      showErrors();
    }
  }

  function resetErrors(inputSelector) {
    inputSelector.classList.remove(errorClass);
    let divError = inputSelector.closest(`.${formGroupClass}`).querySelector(`.${errorMessageClass}`);
    divError.textContent = "";
  }

  function showErrors() {
    //hiển thị lỗi
    errors.forEach(function (element) {
      let inputElement = element.elemnetError;
      let divError = element.elemnetError.closest(`.${formGroupClass}`).querySelector(`.${errorMessageClass}`);
      inputElement.classList.add(errorClass);
      divError.textContent = element.message;
    });
  }

  //add event listener + data init
  initEventAndData();
}
