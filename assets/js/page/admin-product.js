const selectCate = document.querySelector(".category_wrapper_form");
const formProduct = document.querySelector("#form_save_product");
const tbodyProduct = document.querySelector(".product_table");
const btnSaveProduct = document.querySelector(".btn_save");

function showCategoryInProduct() {
  //1. Lấy toàn bộ danh mục trong local
  const cateAll = JSON.parse(localStorage.getItem("categories")) || [];
  let htmlOption = '<option value ="">Chọn danh mục</option>';
  cateAll.forEach(function (element) {
    htmlOption =
      htmlOption + `<option value ="${element.id}">${element.name}</option>`;
  });
  //2. Đưa options vào trong select
  selectCate.innerHTML = htmlOption;
}

function handleUpdateProduct() {
  const idUpdate = btnSaveProduct.getAttribute("data-id");
  //1. Tạo ra object cho idEdit
  let objValue = {};
  const inputAll = formProduct.querySelectorAll(".form-control-item");
  inputAll.forEach(function (element) {
    if (element.name === "category_wrapper_form") {
      objValue["category_id"] = element.value;
    } else {
      objValue[element.name] = element.value;
    }
  });
  objValue.id = idUpdate;
  const productType = document.querySelector(".type_product:checked").value;
  objValue.product_type = productType;

  //2. Tạo ra mảng chứa object cần edit và các obj khác
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productUpdate = products.map(function (element) {
    if (element.id === idUpdate) {
      return objValue;
    } else {
      return element;
    }
  });

  //3. Lưu dữ liệu vào localStorage
  localStorage.setItem("products", JSON.stringify(productUpdate));

  //4. Hiển thị dữ liệu từ trong local
  showProductInLocal();

  //5. Reset đến trạng thái thêm mới sản phẩm
  btnSaveProduct.textContent = "Save";
  btnSaveProduct.classList.remove("update");
  btnSaveProduct.removeAttribute("data-id");
}

function validateProductSucsess() {
  if (btnSaveProduct.classList.contains("update")) {
    handleUpdateProduct();
    return;
  }

  //1. Lấy ra value của input và tạo ra obj chưa thông tin sản phẩm
  let objValue = {};
  const inputAll = formProduct.querySelectorAll(".form-control-item");
  inputAll.forEach(function (element) {
    if (element.name === "category_wrapper_form") {
      objValue["category_id"] = element.value;
    } else {
      objValue[element.name] = element.value;
    }
  });
  objValue.id = crypto.randomUUID();
  const productType = document.querySelector(".type_product:checked").value;
  objValue.product_type = productType;

  //2. Đưa obj vào trong mảng
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const productsNew = [objValue, ...products];

  //3. Lưu dữ liệu vào localStorage
  localStorage.setItem("products", JSON.stringify(productsNew));

  //4. Hiển thị dữ liệu từ trong local
  showProductInLocal();
}

function showProductInLocal() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let htmlResult = "";
  products.forEach(function (element) {
    htmlResult =
      htmlResult +
      `<tr>
        <td>${element.name}</td>
        <td>${element.price_product}</td>
        <td>
            <img src="${element.image}" alt="/">
        </td>
        <td>
            <button class="btn_common btn_edit" data-id = "${element.id}">Edit</button>
            <button class="btn_common btn_delete" data-id = "${element.id}">Delete</button>
        </td>
    </tr>`;
  });

  tbodyProduct.innerHTML = htmlResult;
}

function handleProcessProduct(event) {
  const clicked = event.target;

  //Kiểm tra nếu click vào button delete mới xử lý xóa
  if (
    clicked.classList.contains("btn_delete") &&
    confirm("Bạn chắc chắc muốn xóa sản phẩm?")
  ) {
    //1. Lấy ra id của object cần xóa
    const idDelete = clicked.getAttribute("data-id");
    //2. Xóa obj có chưa idDelete
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productsFilter = products.filter(function (element) {
      return element.id !== idDelete;
    });
    //3. Lưu dữ liệu là vào localStorage
    localStorage.setItem("products", JSON.stringify(productsFilter));
    //4. Hiển thị dữ liệu lại ngay lập tức
    showProductInLocal();
  } else if (clicked.classList.contains("btn_edit")) {
    //1. Lay ra id Edit
    const idEdit = clicked.getAttribute("data-id");
    //2. Lay ra obj chua idEdit
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const elementEditing = products.find(function (element) {
      return element.id === idEdit;
    });
    //3. Đưa dữ liệu obj edit lấy được vào trong form
    const inputAll = formProduct.querySelectorAll(".form-control-item");

    //3.1. Đưa value vào input trừ radio
    inputAll.forEach(function (element) {
      const keyName =
        element.name === "category_wrapper_form" ? "category_id" : element.name;
      element.value = elementEditing[keyName];
    });
    //3.2. Đưa value vào radio box
    document.querySelector(
      `.type_product[value="${elementEditing.product_type}"]`
    ).checked = true;

    //4. Phân biệt trạng thái create hay update cho button Save
    btnSaveProduct.textContent = "Update";
    btnSaveProduct.classList.add("update");
    btnSaveProduct.setAttribute("data-id", idEdit);
  }
}

// Hiển thị danh mục khi load lại trang
showCategoryInProduct();
// Hiển thị sản phẩm khi load lại trang
showProductInLocal();
let validateProduct = new Validate({
  container: "#form_save_product",
  btnClassSubmit: "btn_save",
  rules: {
    name: {
      required: true,
    },
    category_wrapper_form: {
      required: true,
    },
    price_product: {
      required: true,
    },
    image: {
      required: true,
    },
    description: {
      required: true,
    },
  },
  message: {
    name_required: "Tên sản phẩm không được để trống.",
  },
  success: validateProductSucsess,
});

//Thêm sự kiện xóa và edit cho sản phẩm
tbodyProduct.addEventListener("click", handleProcessProduct);
