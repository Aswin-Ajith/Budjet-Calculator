let loginbox = document.getElementById('login');
let registerbox = document.getElementById('register')
let registerName = document.getElementById('register-name')
let registerEmail = document.getElementById('register-email')
let registerPassword = document.getElementById('register-password')

function loginswitch(event) {
    event.preventDefault()
    loginbox.style.transform = ('translateY(-100%)')
    registerbox.style.transform = ('translateY(-100%)')
}

function registerswitch(event) {
    event.preventDefault()
    loginbox.style.transform = ('translateY(0%)')
    registerbox.style.transform = ('translateY(0%)')
}

function registerAccount() {
    if (registerName.value == "" || registerEmail.value == "" || registerPassword.value == "") {
        alert('Please Enter All The Fields')
    }
    else {
        if (registerEmail in localStorage) {
            alert('Account already exists')
        }
        else {
            var mailFormat = /\S+@\S+\.\S+/;
            if (registerEmail.value.match(mailFormat)) {
                let account = {
                    username: registerName.value,
                    email: registerEmail.value,
                    password: registerPassword.value,
                    income: 0,
                    balance: 0,
                    expense: 0
                }

                localStorage.setItem(registerEmail.value, JSON.stringify(account))
                alert('Account registered successfully')
                window.location = './index.html'

            }
            else {
                alert("Invalid email address");
                registerPassword.value = "";
            }

        }
    }
}

function loginAccount() {
    let loginEmail = document.getElementById('login-email')
    let loginPassword = document.getElementById('login-password')

    if (loginEmail.value == "" || loginPassword.value == "") {
        alert('Please Enter All The Fields')
    }
    else {
        if (loginEmail.value in localStorage) {
            const userData = JSON.parse(localStorage.getItem(loginEmail.value))
            // console.log(userData);
            if (loginPassword.value == userData.password) {
                localStorage.setItem('Logged In', JSON.stringify(userData))
                window.location = './home.html';
            }
            else {
                alert('Incorrect password')
            }
        }
        else {
            alert('Acccount does not exists')
        }
    }
}


loggedUser = JSON.parse(localStorage.getItem('Logged In'))
// console.log(loggedUser);
welcome.innerHTML = `<h5 class="text-secondary text-center fs-1 mt-4" id="welcome">Welcome ${loggedUser.username}</h5>`

function formatDate(d){
    date= d.getDate();
    month= d.getMonth();
    year= d.getFullYear();
    hours= d.getHours();
    minutes= d.getMinutes();

    formattedDate= `${date}-${month}-${year} ${hours}:${minutes}`
    return formattedDate
}

function addIncome() {
    incomeType = document.getElementById('income-type').value
    incomeAmount = document.getElementById('income-amount').value

     
    if (incomeType == "" || incomeAmount == "") {
        alert('Enter both the fields to add income')
    }
    else {
        loggedUser.income += parseInt(incomeAmount);
        loggedUser.balance += parseInt(incomeAmount);
        localStorage.setItem("Logged In", JSON.stringify(loggedUser))
        location.reload();

        

    }

}


function addExpense() {
    expenseType = document.getElementById('expense-type').value;
    expenseAmount = document.getElementById('expense-amount').value;

    if (expenseType == "" || expenseAmount == "") {
        alert('Enter both the fields to add expense')
    }
    else {
        if (expenseAmount > loggedUser.balance) {
            alert('Insufficient Balance')
        }
        else {
            loggedUser.expense += parseInt(expenseAmount);
            loggedUser.balance -= parseInt(expenseAmount);
            localStorage.setItem("Logged In", JSON.stringify(loggedUser));
            location.reload();
            }
            
        }

    }




function clearAll() {
    if (confirm('Do you want to clear all data?') == true) {
        loggedUser.balance = 0;
        loggedUser.expense = 0;
        loggedUser.income = 0;
        localStorage.setItem('Logged In', JSON.stringify(loggedUser))
        window.location = './home.html';
    }
}


totalIncome.innerHTML = `<h2 id="totalIncome" class="text-white">Total Income: ${loggedUser.income}/-</h2>`

totalExpense.innerHTML = `<h2 id="totalExpense" class="text-white">Total Expense: ${loggedUser.expense}/-</h2>`

balance.innerHTML = `<h2 id="balance" class="text-center text-white bg-primary rounded-3">Balance: ${loggedUser.balance}/-</h2>`



function printDetails(){
    window.print();
}


function logout(){
    localStorage.setItem(loggedUser.email,JSON.stringify(loggedUser))
    localStorage.removeItem('Logged In');
    window.location='./index.html'
}