function Validate(options) {
  //1. Lay ra container bao dong form
  const container = document.querySelector(options.container);
  //2. Tat ca cac elements khac query dua vao container
  const btnSignUpSelector = container.querySelector(".btn-signup");
  const rules = options.rules;
  const message = options.message;
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
      let inputSelector = container.querySelector("." + keyInputName);
      let valueInput = inputSelector.value;
      rulesAllForInputItem = rules[keyInputName];
      //reset all errors
      resetErrors(inputSelector);

      for (const rulesItemKey in rulesAllForInputItem) {
        let valueRule = rulesAllForInputItem[rulesItemKey];
        let result = rulesMethod[rulesItemKey](valueInput, valueRule);
        let keyMessage = keyInputName + "_" + rulesItemKey;
        if (!result) {
          //đẩy lỗi vào biến đang lưu trữ
          errors.push({
            elemnetError: inputSelector,
            message: message[keyMessage]
              ? message[keyMessage]
              : keyInputName + " not valid",
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
    inputSelector.classList.remove("error");
    inputSelector.nextElementSibling.textContent = "";
  }

  function showErrors() {
    //hiển thị lỗi
    errors.forEach(function (element) {
      let inputElement = element.elemnetError;
      let divError = inputElement.nextElementSibling;
      inputElement.classList.add("error");
      divError.textContent = element.message;
    });
  }

  //add event listener + data init
  initEventAndData();
}
