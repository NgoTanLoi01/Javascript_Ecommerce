function rules() {
  return {
    email: {
      required: true,
      minlength: 3,
      regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      required: true,
      minlength: 8,
    },
  };
}

function messages() {
  return {
    name_required: "Tên không được để trống",
    email_required: "Email không được để trống",
    email_regex: "Email không đúng định dạng",
  };
}

function validateSucsess() {
  //1. lay thong tin email va password khi submit form
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  //2. so sanh email va pass voi tat ca users trong he thong
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length) {
    users.forEach(function (element) {
      if (element.email === email && element.password === password) {
        element.status = "active";
      } else {
        element.status = "";
      }
    });
    //3. cap nhat vao localStorage
    localStorage.setItem("users", JSON.stringify(users));
    //4. chuyen den man hinh admin or home
    window.location.href = '/my-account.html';
  }
}

let loginInstanceValidate = new Validate({
  container: ".login_form",
  btnClassSubmit: "btn-login",
  rules: rules(),
  message: messages(),
  success: validateSucsess,
});
