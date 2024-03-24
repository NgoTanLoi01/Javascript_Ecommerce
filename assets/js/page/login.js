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
  console.log("validate success");
}

let loginInstanceValidate = new Validate({
  container: ".login_form",
  btnClassSubmit: "btn-login",
  rules: rules(),
  message: messages(),
  success: validateSucsess,
});
