const form = document.querySelector('.form');
// const formValidate = document.querySelector('.form-validate');
const email = document.getElementById('email')
const password = document.getElementById('password');
// const errorMessage = document.querySelector('small')

let valid_input = true;

// Show success function
function ShowSuccess(input){
    const formValidate = input.parentElement;
    formValidate.className = 'form-validate success';
}
// Show success function
function ShowError(input, message){
    const formValidate = input.parentElement;
    formValidate.className = 'form-validate error';
    const errorMessage = formValidate.querySelector('small');
    errorMessage.innerText = message;
   
}

// Store and get data from API
const url = 'http://209.97.141.22:3000'
// Check required input
function createUser(email, password) {
    let userValue = {
        'email': email,
        'pass': password
    }
    fetch(`${url}/rpc/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': '9c1d3c3c-1cc4-4c31-8915-ce2217b1d72f',
            'Accept': 'application/vnd.pgrst.object+json'
        },
        body: JSON.stringify(userValue),

    })
    .then((response)=> {
        // console.log(response, 'ressssss')
       return response.json()
    })
    .then((data)=>{
        console.log(data, 'datttttaaaa')
        if(data.code === '28P01'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email or password!',
            })
        }else{
          
        }
        if(data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = '/home-page/index.html';
        }
    })
    .catch((error) => {
        console.error("Error", error);
    });
}



function checkInput(inputField){
    inputField.forEach(input => {
        if (input.value.trim() === "") {
            ShowError(input, `${getUpper(input)} is required`);
            valid_input = false
        }else{
            ShowSuccess(input);
            valid_input = true
        }
    });
}

// Check valid email
//Check if email is valid 
function checkValid(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        ShowSuccess(input);
        valid_input = true
    } else {
        ShowError(input, "Email is not valid");
        valid_input = false
    }
}

// password validation
function checkPass(input, min, max){
    if(input.value.length < min){
        ShowError(input, `${getUpper(input)} must at least ${min} character`)
    }
    else if(input.value.length > max){
        ShowError(input,`${getUpper(input)} must be lesser ${max} character`)
        valid_input = false
    }
    else{
        ShowSuccess(input)
        valid_input = true
    }
}


// convert to upper case
function getUpper(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}



form.addEventListener('submit', function(e){
    e.preventDefault();
   
    checkInput([email, password]);
    checkValid(email);
    checkPass(password, 6, 20);
    if (valid_input == true){
        createUser(email.value, password.value)
    }
})