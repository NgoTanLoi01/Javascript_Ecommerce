function validateSucsess() {
  //1. Lay ra thong tin cua doanh muc
  const nameCategory = document.querySelector(".category_name").value;
  //2. Tao ra object chua thong tin danh muc
  const newCate = {
    id: crypto.randomUUID(),
    name: nameCategory,
  };
  //3. Dua object vao trong mang category
  let categories = JSON.parse(localStorage.getItem("categories")) || [];
  console.log("categories", categories);
  categories.push(newCate);
  //4. Luu vao trong local
  localStorage.setItem("categories", JSON.stringify(categories));
}

let validateCategory = new Validate({
  container: "#category_form_add",
  btnClassSubmit: "btn_category_save",
  rules: {
    category_name: {
      required: true,
    },
  },
  message: {
    category_name_required: " Danh mục không được để trống.",
  },
  success: validateSucsess,
});
