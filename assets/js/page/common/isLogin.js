function isLoginAlready(){
    // 1. Lay tat ca cac user trong he thong

    const users = JSON.parse(localStorage.getItem('users'));
    const isLoged = users.some(
        function(element){
            return element.status === 'active';
        }
    );

    // Neu user dang login trong he thong thi chuyen sang  -> my-account.html
    if(isLoged){
        window.location.href = '/my-account.html';
    }
}

isLoginAlready();