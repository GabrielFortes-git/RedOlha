const codeInput = document.querySelector("#code");
const submit = document.querySelector("#submit");

 // Forms submit the data automatically, prevent this default action;
   document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
        e.preventDefault();
    });
    });


submit.addEventListener("click", function(){
    const code = codeInput.value  ;
    const request = {"type": "email","code":code};
    
     const options = {
                method : "POST",        // HTTP method that we are using;
                headers : {"Content-Type": "application/json; charset=utf-8"},      // Data format that we are using;
                body : JSON.stringify(request)      // The data that we are sending. JSON format;
            }
        
    fetch("http://localhost:8080/index.php",options)
    .then(res => res.json())
    .then(data => {
        alert(JSON.stringify(data));
    });

});
