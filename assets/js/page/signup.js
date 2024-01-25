//1. chon element
const btnSignUpSelector = document.querySelector(".btn-signup");
const inputNameSelector = document.querySelector(".name");
const inputEmailSelector = document.querySelector(".email");
const inputPasswordSelector = document.querySelector(".password");

const inputAllSelector = document.querySelectorAll(".form-group input");

//2. function xu ly su kien + chay lan dau load
function handleSignUpClick(event) {
  event.preventDefault();
  //1. Thuc hien validate
  for (let i = 0; i < inputAllSelector.length; i++) {
    let inputSelector = inputAllSelector[i];
    let valueInput = inputSelector.value;
    let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
    let name = inputSelector.name;


    //validate khong duoc rong
    if(valueInput === ''){
        //them vien do cho input
        inputSelector.classList.add('error');
        //hien thi message loi
        let message = name + ' không được để trống.';
        divMessageSelector.textContent = message;
    }else if(name === 'name'){
        // validate name toi thieu 3 ky tu
        minLengthValidate(inputSelector, name, 'Tên phải có tối thiểu 3 ký tự.');
    }else if(name === 'email'){
       // validate email toi thieu 3 ky tu
       minLengthValidate(inputSelector, name, 'Email phải có tối thiểu 3 ký tự.');
    }else if(name === 'password'){
        // validate password toi thieu 8 ky tu
        minLengthValidate(inputSelector, name, 'Password phải có tối thiểu 8 ký tự.');
    }
   }
}

//rule validate min-length
function minLengthValidate(inputSelector, name, message){
    let valueInput = inputSelector.value;
    let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
    //optional    
    let minLength = inputSelector.getAttribute('min_length')

    if(valueInput.length < minLength){
        let messageError = name + ' tối thiểu ' + minLength + ' kí tự.';
        if(message){
            messageError = message;
        }
        divMessageSelector.textContent = message;
    }
}

//3. Them su kien cho phan tu
btnSignUpSelector.addEventListener("click", handleSignUpClick);
