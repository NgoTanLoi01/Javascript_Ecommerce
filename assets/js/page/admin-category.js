function showDataCateFromLocal() {
  //1. Lay toan bo danh muc trong local
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  //2. Xay dung cau truc HTML cho danh muc
  let htmlResult = "";
  categories.forEach(function (element) {
    htmlResult =
      htmlResult +
      `<tr>
          <td>${element.name}</td>
          <td>
              <button class="btn_common btn_edit">Edit</button>
              <button data-id ="${element.id}" class="btn_common btn_delete">Delete</button>
          </td>
      </tr>`;
  });

  //2. Dua ket qua toan bo danh muc vao tbody cua table
  document.querySelector(".category_table").innerHTML = htmlResult;
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
  const categoriesUpdate = [newCate, ...categories];
  //4. Luu vao trong local
  localStorage.setItem("categories", JSON.stringify(categoriesUpdate));
  //5. Hien thi du lieu ngay lap tuc khi them thanh cong
  showDataCateFromLocal();
}

function handleProcessData(event) {
  const clicked = event.target;
  //Lay ra tat ca danh muc trong local
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  if (clicked.classList.contains("btn_delete") && confirm('Bạn chắc chắn muốn delete?')) {
    const idDelete = clicked.getAttribute("data-id");
    // mảng lọc ra các phần tử cần delete
    const categoriesFilter = categories.filter(function (element) {
      return element.id !== idDelete;
    });

    //Lưu vào localStorage
    localStorage.setItem("categories", JSON.stringify(categoriesFilter));
    //5. Hien thi du lieu ngay lap tuc khi them thanh cong -- Rerender app
    showDataCateFromLocal();
  }
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

document
  .querySelector(".category_table")
  .addEventListener("click", handleProcessData);
