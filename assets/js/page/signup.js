let signupInstanceValidate = new Validate({
  container: ".form_register",
  rules: {
    name: {
      required: true,
    },
    email: {
      required: true,
      minlength: 3,
      regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
  },
  message: {
    name_required: "Tên không được để trống",
    email_required: "Email không được để trống",
    email_regex: "Email không đúng định dạng",
  },
  success: function () {
    //1. Lay du lieu tu input
    let dataForm = {};
    let users = JSON.parse(localStorage.getItem("users")) || [];
    //check email is exit
    const email = document.querySelector(".form_register .email").value;
    //Su dung some de check email trung nhau
    let isEmailExit = users.some(
      function (element) {
        return element.email === email;
      }
    );

    //Check thu cong email trung nhau
    // false;
    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].email === email) {
    //     isEmailExit = true;
    //     break;
    //   }
    // }
    console.log("isEmaiExit", isEmailExit);

    //Neu email chua ton tai thi them user vao local
    if (!isEmailExit) {
      document
        .querySelectorAll(".form_register input")
        .forEach(function (element) {
          if (element.name !== "confirm_password") {
            dataForm[element.name] = element.value;
          }
        });
      //2.1 Create data users array
      dataForm["id"] = crypto.randomUUID();
      users.push(dataForm);
      //2.2 Save to localStorage
      localStorage.setItem("users", JSON.stringify(users));
    }
  },
});
