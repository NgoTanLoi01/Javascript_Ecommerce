function showDataCateFromLocal() {
  //1. Lay toan bo danh muc trong local
  const categories = JSON.parse(localStorage.getItem("categories"));
  //2. Xay dung cau truc HTML cho danh muc
  let htmlResult = "";
  categories.forEach(function (element) {
    htmlResult =
      htmlResult +
      `<tr>
          <td>${element.name}</td>
          <td>
              <button class="btn_common btn_edit">Edit</button>
              <button class="btn_common btn_delete">Delete</button>
          </td>
      </tr>`;
  });

  //2. Dua ket qua toan bo danh muc vao tbody cua table
  document.querySelector('.category_table').innerHTML = htmlResult;
}

function validateSucsess() {
  //1. Lay ra thong tin cua doanh muc
  const nameCategory = document.querySelector(".category_name").value;
  //2. Tao ra object chua thong tin danh muc
  const newCate = {
    id: crypto.randomUUID(),
    name: nameCategory,
  };
  //3. Dua object vao trong mang category
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const categoriesUpdate = [...categories, newCate];
  //4. Luu vao trong local
  localStorage.setItem("categories", JSON.stringify(categoriesUpdate));
  //5. Hien thi du lieu ngay lap tuc khi them thanh cong
  showDataCateFromLocal();
}

// Hien thi du lieu category tu local
showDataCateFromLocal();
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
