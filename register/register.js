const form = document.querySelector('.form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPass = document.getElementById("comfirm");
const checkBox = document.getElementById("checkbox");
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector(".close-btn");
const submit = document.querySelector('button');


// Get user Info
// Checking erorr in form
function showError(input, message) {
    const formValidate = input.parentElement;
    formValidate.className = "form-validate error";
    const small = formValidate.querySelector("small");
    small.innerText = message;
}

function showSuccess(input) {
    const formValidate = input.parentElement;
    formValidate.className = "form-validate success";
}

//Check if email is valid 
function checkValid(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true
    } else {
        showError(input, "Email is not valid");
        return false
    }
}

const url = 'http://209.97.141.22:3000'
// Check required input
function createUser(email, firstName, lastName, password) {
   let userValue = {
        'p_email': `${email.value}`,
       'p_first_name': `${firstName.value}`,
       'p_last_name': `${lastName.value}`,
       'p_pass': `${password.value}`
    }
    fetch(`${url}/rpc/register_user`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'x-api-key': '9c1d3c3c-1cc4-4c31-8915-ce2217b1d72f',
             'Accept':'application/vnd.pgrst.object+json'
        },
            body: JSON.stringify(userValue), 
        
    })
    .then(response => response.json())
    .then((displayResult))
    .catch((error)=>{
        console.error("Error", error);
    })

}


//Check user and redirect
function displayResult(user){
    if (user.code == "23514"){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User already exit!',
        })
    }
    if (user.message === "Success"){
        window.location.href = '/login/index.html';
        console.log(user.message);
    }
  
}

// check user input
function checkInputField(inputField){
    inputField.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getUpper(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
    
}


// Get input lenght
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getUpper(input)} must be at least ${min} character`);
        return false
    } else if (input.value.length > max) {
        showError(input, `${getUpper(input)} must be less than ${max} character`);
        return false
    }
    else {
        showSuccess(input)
        return true
    }
}

// Get upper case
function getUpper(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check password match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Password do not match");
        return false
    }else{
        return true
    }
}

// Get all user input




form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkInputField([firstName,lastName, email, password, confirmPass]);
    checkLength(firstName, 3, 15);
    checkLength(lastName, 3, 15);
    checkLength(password, 6, 20);
    checkValid(email);
    checkPasswordsMatch(password, confirmPass);
    if (checkLength(firstName, 3, 15)){
        if (checkLength(lastName, 3, 15)){
            if (checkLength(password, 6, 20)){
                if (checkValid(email)){
                    if (checkPasswordsMatch(password, confirmPass)){
                        createUser(email.value, firstName.value, lastName.value, password.value);
                    }
                }
            }
        }
    }
   
});





