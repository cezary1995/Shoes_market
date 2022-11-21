validateLogin =(data) => {
    // message jest tutaj kluczem z pliku loginUser.php
    console.log(data.message)
    if (data.message === "Zalogowano"){
        window.location.replace("login_passed.html")
    }
    else {
        alert("Invalid Information")
    } 
}
    
validateRegiser =(data) => {
    // message jest tutaj kluczem z pliku loginUser.php
    console.log(data.message)
    if (data.message === "Zarejestrowano"){
        window.location.replace("register_passed.html")
    }
    else {
        alert("Invalid Information")
    } 
}

/* fetchProductData = () => { // brakujetu endpointu! api
        fetch("")
        .then(res => res.json())
        .then(res => manageProductData(res))
    } */

// manageProductData = (data) => {
//     let priceValue = data.price.split(" ")[0]
//     getDifferentCurrecies(priceValue)
//     console.log("Cena w PLN: "+ priceValue)
//     //TO DO: funkcja która pokaze informacje o produkcie
//     let describeProduct = document.getElementById("sales")
//     //describeProduct.innerHTML = `<h5>Wielka promocja! Buty ${data.title} kolor ${data.color}30% taniej!</h5>`

// }


    //Get currience from Api
getDifferentCurrecies = (price) => {
    let usdCur= 'https://api.nbp.pl/api/exchangerates/rates/a/USD?format=json'
    let gbpCur = 'https://api.nbp.pl/api/exchangerates/rates/a/GBP?format=json'
    let eurCur = 'https://api.nbp.pl/api/exchangerates/rates/a/EUR?format=json'
    let clpCur = 'https://api.nbp.pl/api/exchangerates/rates/a/CLP?format=json'
    let hrkCur = 'https://api.nbp.pl/api/exchangerates/rates/a/HRK?format=json'
    fetch(eurCur)
    .then(res => res.json())
    .then(res => {
        console.log("Euro: " + res.rates[0].mid)
        //console.log("Cena w USD: "+ price/res.rates[0].mid)
        let usd_Price = price/res.rates[0].mid

    })
}

    //Get currencie from user - switching on page
   let userCurr = document.getElementsByClassName("dropdown-item").textContent
   console.log(userCurr)
   let currOnPage = document.getElementById("currency")
   if (userCurr === "EUR"){
    console.log("blabla")
    currOnPage.innerText = "EUR"
   }


window.onload = () => {
    
    getDifferentCurrecies()

    const loginForm = document.querySelector("#login") 
    const signUpForm = document.querySelector("#createAccount") 
        
            //Switch beetween login and register form
    document.querySelector('#linkCreateAccount').addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.add("form__hidden")
        signUpForm.classList.remove("form__hidden")
    })

    document.querySelector('#linkLogin').addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.remove("form__hidden")
        signUpForm.classList.add("form__hidden")
    })
    

    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

              //REJESTRACJA
    let registerForm = document.getElementById("createAccount")
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let invalidEmail = document.getElementById("invalidEmail")
        let invalidPassword = document.getElementById("invalidPassword")
        let invalidPassword2 = document.getElementById("invalidPassword2")
        const email = document.getElementById("mail").value
        const password = document.getElementById("pswd").value
        const password2 = document.getElementById("pswd2").value
        
        
        //Register: Check email
        if (email.length == 0){
            invalidEmail.innerText = ""
            invalidEmail.innerText = "Email addres is required!"
            }   
        else if (email.match(emailPattern)){
            invalidEmail.innerText = "" 
         }       
        else {
            invalidEmail.innerText = ""
            invalidEmail.innerText = "Invalid email"
        }

        //Register: Check password
        if (password.length == 0 || password2.length == 0){
            console.log("tralala")
            invalidPassword.innerText =""
            invalidPassword2.innerText =""
            invalidPassword.innerText = "Password is required! Both fields need to be fill in"
            invalidPassword2.innerText = "Password is required! Both fields need to be fill in"
        }
        else if(password != password2){
            invalidPassword.innerText =""
            invalidPassword2.innerText =""
            invalidPassword.innerText = "Passwords aren't the same!"
        }
         else{
             invalidPassword.innerText =""
             invalidPassword2.innerText =""
         }
         
         // Wysłanie danych z formularza rejestracji w postaci obiektu FormData na endpoint registerUser.php
         let body = new FormData()
         body.append("mail", email)
         body.append("password", password)
         fetch("../api/registerUser.php", {method: "POST", body: body})
         .then(res=>res.json())
         .then(res=>validateRegiser(res))
        })
        
        //LOGOWANIE
    let logForm  = document.getElementById("login")
    logForm.addEventListener("submit", (e) => { 
        e.preventDefault()
        const loginMsg = document.getElementById("loginMsg")
        const pswdMsg = document.getElementById("pswdMsg")
        const loginMail = document.getElementById("loginMail").value
        const loginPassword = document.getElementById("loginPassword").value
        
        //Login: check email
        if (loginMail === '' || loginMail == null ){
            loginMsg.innerText = ""
            loginMsg.innerText = "Email addres is required!"
        }
        else if (!loginMail.match(emailPattern)){
            loginMsg.innerText = "" 
            loginMsg.innerText = "invalid format of email"    
         }
        else  {
            loginMsg.innerText = ""
        }

        //Login: check password
        if(loginPassword === '' || loginPassword == null){
            pswdMsg.innerText = ""
            pswdMsg.innerText = "Incorrect password"
        }
        else {
            pswdMsg.innerText = ""
        }
        let body = new FormData()
        body.append("loginMail", loginMail)
        body.append("loginPassword", loginPassword)
        fetch("../api/loginUser.php", {method: "POST", body: body})  
        // po wysłaniu zapytania, odbierany jest response a następnie następuje parsowanie z formatu 
        .then(res=>res.json())
        .then(res=>validateLogin(res))
         
    })
}