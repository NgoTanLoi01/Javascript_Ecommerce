const tbodyCate = document.querySelector(".category_table");
const categoryInputName = document.querySelector(".category_name");
const buttonSave = document.querySelector(".btn_category_save");

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
              <button data-id ="${element.id}" class="btn_common btn_edit">Edit</button>
              <button data-id ="${element.id}" class="btn_common btn_delete">Delete</button>
          </td>
      </tr>`;
  });

  //2. Dua ket qua toan bo danh muc vao tbody cua table
  tbodyCate.innerHTML = htmlResult;
}

function validateSucsess() {
  if (buttonSave.classList.contains("update")) {
    updateCategory();
  } else {
    addCategory();
  }
}

function updateCategory() {
  //1. Lay ra thong tin cua doanh muc
  const nameCategory = categoryInputName.value;
  //2. Tạo ra dữ liệu update
  //2.1 Lấy ra id update
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  const idUpdate = buttonSave.getAttribute("data-id");
  const categoriesUpdate = categories.map(function (element) {
    if (element.id === idUpdate) {
      return {
        id: element.id,
        name: nameCategory
      };
    } else{
      return element;
    }
  });
  //3. Luu vao localStorage
  localStorage.setItem("categories", JSON.stringify(categoriesUpdate));
  //4. Hien thi du lieu ngay lap tuc khi them thanh cong
  showDataCateFromLocal();
  //5. reset form
  categoryInputName.value = '';
  //6. reset form den trang thai add category
  buttonSave.textContent = 'Save';
  buttonSave.removeAttribute('data-id');
  buttonSave.classList.remove('update');
}

function addCategory() {
  //1. Lay ra thong tin cua doanh muc
  const nameCategory = categoryInputName.value;
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
  //6. reset form
  categoryInputName.value = '';
}

function handleProcessData(event) {
  const clicked = event.target;
  //Lay ra tat ca danh muc trong local
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  //Khi người dùng click và btn delete
  if (
    clicked.classList.contains("btn_delete") &&
    confirm("Bạn chắc chắn muốn delete?")
  ) {
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

  //Khi người dùng click và btn edit
  else if (clicked.classList.contains("btn_edit")) {
    //1. Lấy ra id của element edit
    const idEdit = clicked.getAttribute("data-id");
    //2. Lấy ra object element theo id edit
    // let elementEit = undefined;
    // for(let i = 0; i < categories.length; i++){
    //   if(categories[i].id === idEdit){
    //     elementEit = categories[i];
    //     break;
    //   }
    // }
    const elementEitting = categories.find(function (element) {
      return element.id === idEdit;
    });
    //3. Đưa name lên ô input đang chỉnh sửa
    categoryInputName.value = elementEitting.name;
    //4. Chỉnh sửa để người dùng nhận biết hiện tại đang edit form
    //4.1. Thay đổi text botton update
    buttonSave.textContent = "Update";
    //4.2. Thêm class để biết là update
    buttonSave.classList.add("update");
    //4.3. Thêm id để biết update cho object nào
    buttonSave.setAttribute("data-id", idEdit);
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

tbodyCate.addEventListener("click", handleProcessData);
