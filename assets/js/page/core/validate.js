function Validate(options) {
  //1. Lay ra container bao dong form
  const container = document.querySelector(options.container);
  //2. Tat ca cac elements khac query dua vao container
  const btnSignUpSelector = container.querySelector(".btn-signup");
  const rules = options.rules;
  const message = options.message;

  const rulesMethod = {
    required: function (valueInput, valueRule) {
      console.log("valueRule", valueRule);
    },
    minlength: function (valueInput, valueRule) {
      console.log("valueRule", valueRule);
    },
    email: function (valueInput, valueRule) {
      console.log("valueRule", valueRule);
    },
    equal_to: function (valueInput, valueRule) {
      console.log("valueRule", valueRule);
    },
  };

  function initEventAndData() {
    btnSignUpSelector.addEventListener("click", handleSignUpClick);
  }

  function handleSignUpClick(event) {
    event.preventDefault();
    for (const keyInputName in rules) {
      let inputSelector = container.querySelector("." + keyInputName);
      let valueInput = inputSelector.value;
      console.log("valueInput", valueInput);
      console.log("keyInputName", keyInputName);
      console.log("rules for item input", rules[keyInputName]);

      rulesAllForInputItem = rules[keyInputName];

      for (const rulesItemKey in rulesAllForInputItem) {
        let valueRule = rulesAllForInputItem[rulesItemKey];
        rulesMethod[rulesItemKey](valueInput, valueRule);
      }
    }
  }

  //add event listener + data init
  initEventAndData();
}
