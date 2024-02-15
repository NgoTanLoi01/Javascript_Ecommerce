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
    equal_to: 'password'
  },
};

//======================= Start Listener Function======================
function handleSignUpClick(event) {
  event.preventDefault();
  console.log("click button");
}

//3. Them su kien cho phan tu
btnSignUpSelector.addEventListener("click", handleSignUpClick);
