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
    required: "This field is required",
    minlength: "Please enter at latest {min} character",
    regex: "Please enter true format",
    equal_to: "This field not same value",
  };

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
    //Sự kiện nhấn button submit form
    btnSignUpSelector.addEventListener("click", handleSignUpClick);
    //Sự kiện input khi thay đổi value cho element
    container
      .querySelectorAll(`.${formGroupClass} input`)
      .forEach(function (element) {
        element.addEventListener("input", handleInputChange);
      });
  }

  function handleInputChange(event) {
    errors = errors || [];
    const inputSelector = event.target;
    //Xoa bo loi element input ra khoi mang loi
    errors = errors.filter(function (element) {
      return element.elemnetError.name !== inputSelector.name;
    });
    //them loi vao neu element co loi
    validateOneElement(inputSelector);
    resetErrors(inputSelector);
    //Hien thi loi
    showErrors();
  }

  function validateOneElement(element) {
    const valueInput = element.value;
    const keyInputName = element.name;
    const rulesAllForInputItem = rules[keyInputName];

    for (const rulesItemKey in rulesAllForInputItem) {
      const valueRule = rulesAllForInputItem[rulesItemKey];
      const result = rulesMethod[rulesItemKey](valueInput, valueRule);
      const keyMessage = keyInputName + "_" + rulesItemKey;
      if (!result) {
        //đẩy lỗi vào biến đang lưu trữ
        let messageErrDefault = messageDefault[rulesItemKey];
        messageErrDefault = messageErrDefault.replace("{min}", valueRule);
        errors.push({
          elemnetError: element,
          message: message[keyMessage]
            ? message[keyMessage]
            : messageErrDefault,
        });

        return false;
      }
    }
  }

  function handleSignUpClick(event) {
    event.preventDefault();
    errors = [];
    for (const keyInputName in rules) {
      const inputSelector = container.querySelector("." + keyInputName);
      //reset all errors
      resetErrors(inputSelector);
      //CHeck validate passed for one element input
      validateOneElement(inputSelector);
    }
    //Hien thi loi
    showErrors();

    //Goi ham thanh cong khi khong co loi trong form
    if(!errors.length){
      let successForm = options.success;
      successForm();
    }
  }

  function resetErrors(inputSelector) {
    inputSelector.classList.remove(errorClass);
    let divError = inputSelector
      .closest(`.${formGroupClass}`)
      .querySelector(`.${errorMessageClass}`);
    divError.textContent = "";
  }

  function showErrors() {
    if (errors.length) {
      errors.forEach(function (element) {
        let inputElement = element.elemnetError;
        let divError = element.elemnetError
          .closest(`.${formGroupClass}`)
          .querySelector(`.${errorMessageClass}`);
        inputElement.classList.add(errorClass);
        divError.textContent = element.message;
      });
    }
  }
  //add event listener + data init
  initEventAndData();
}
