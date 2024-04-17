const selectCate = document.querySelector(".category_wrapper_form");
const formProduct = document.querySelector("#form_save_product");

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

function validateProductSucsess() {
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
            <button class="btn_common btn_edit">Edit</button>
            <button class="btn_common btn_delete">Delete</button>
        </td>
    </tr>`;
  });

  document.querySelector('.product_table').innerHTML = htmlResult;
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
