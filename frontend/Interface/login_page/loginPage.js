const loginAncor = document.querySelector("#loginAncor");
const registerAncor = document.querySelector("#registerAncor");
const loginContainer = document.querySelector("#login");
const registerContainer = document.querySelector("#register");
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const usernameLogin = document.querySelector("#usernameLogin");
const passwordLogin = document.querySelector("#passwordLogin");
const usernameRegister = document.querySelector("#usernameRegister");
const emailRegistered = document.querySelector("#emailRegister");
const passwordRegister = document.querySelector("#passwordRegister");
const confirmPasswordRegister = document.querySelector("#confirmPasswordRegister");
    

    
    // Forms submit the data automatically, prevent this default action;
    document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
        e.preventDefault();
    });
    });

    
    // Switch pages when clicking the ancor ( login to register and vice versa); 
    
    registerAncor.addEventListener("click", function(){
        event.preventDefault()
        loginContainer.classList.remove("show");
        registerContainer.classList.add("show");
    });

    loginAncor.addEventListener("click", function(){
        event.preventDefault()
        registerContainer.classList.remove("show");
        loginContainer.classList.add("show");
    });


    // function showLoginErrorMessage(){
    
    // }
    
    // Send a POST request to "index.php", when user click the login button;
    
    loginBtn.addEventListener("click", function(){
    
        const username = usernameLogin.value.trim();
        const password = passwordLogin.value.trim();
        const request = {"type": "login","username": username , "password": password};
    
        const options = {
            method : "POST",        // HTTP method that we are using;
            credentials: "include",
            headers : {"Content-Type": "application/json; charset=utf-8"},      // Data format that we are using;
            body : JSON.stringify(request)      // The data that we are sending. JSON format;
        }
    
        fetch("http://localhost:8080/index.php",options)
        .then(res => res.json())
        .then(data => {
              if(data.success == true){
                if(data["role"] == 'admin'){
                    window.location.href = "../admin_main_page/admin_main_page.html";
                }else{
                    window.location.href = "../user_main_page/user_main_page.html";
                    // /GPDF/RedOlha/frontend/Interface/user_main_page/admin_main_page.html
                }
            }else{
                alert("Incorrect username or password!");
                // showLoginErrorMessage();
            }
        });
    
    });
    
    
    registerBtn.addEventListener("click", function(){
        const username = usernameRegister.value.trim();
        const password = passwordRegister.value.trim();
        const confirmPassword = confirmPasswordRegister.value.trim();
        const email = emailRegistered.value.trim();
        if(password === confirmPassword){
    
            const request = {"type": "register","username": username , "email": email, "password": password};
        
            const options = {
                method : "POST",   
                credentials: "include",
                headers : {"Content-Type": "application/json; charset=utf-8"},      
                body : JSON.stringify(request), 
            }
        
            fetch("http://localhost:8080/index.php",options)
            .then(res => res.json())
            .then(data => {
                if(data[0] == true){
                    alert("User successefully registered!");
                     // module.switchFormsRegisterToLogin();
                }else{
                    alert("User not registered!");
                }
                  
            });
    
        }else{
            alert("Passwords dont' correspond!");
        }
    
    
    });





