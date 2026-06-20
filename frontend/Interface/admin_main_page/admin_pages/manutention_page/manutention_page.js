// const codeInput = document.querySelector("#code");
// const submit = document.querySelector("#submit");

//  // Forms submit the data automatically, prevent this default action;
//    document.querySelectorAll("form").forEach(form => {
//     form.addEventListener("submit", e => {
//         e.preventDefault();
//     });
//     });


// submit.addEventListener("click", function(){
//     const code = codeInput.value  ;
//     const request = {"type": "email","code":code};
    
//      const options = {
//                 method : "POST",        // HTTP method that we are using;
//                 headers : {"Content-Type": "application/json; charset=utf-8"},      // Data format that we are using;
//                 body : JSON.stringify(request)      // The data that we are sending. JSON format;
//             }
        
//     fetch("http://localhost:8080/index.php",options)
//     .then(res => res.json())
//     .then(data => {
//         alert(JSON.stringify(data));
//     });

// });


const registerDeviceLink = document.querySelector("#registerDeviceLink");
const registerDeviceArea = document.querySelector("#registerDeviceArea");
const registerManutentionLink = document.querySelector("#registerManutentionLink");
const registerManutentionArea = document.querySelector("#registerManutentionArea");


let deviceNameInput = document.querySelector("#deviceName");
let deviceModelInput = document.querySelector("#deviceModel");
let deviceCategoryInput = document.querySelector("#deviceCategory");
let deviceManufacturerInput = document.querySelector("#deviceManufacturer");
let deviceStateInput = document.querySelector("#deviceState");
let deviceIpAddressInput = document.querySelector("#deviceIpAddress");
let deviceMacAddressInput = document.querySelector("#deviceMacAddress");
let deviceSerialNumberInput = document.querySelector("#deviceSerialNumber");

const registerDeviceExitBtn = document.querySelector("#registerDeviceExitBtn");
const registerDeviceResetBtn = document.querySelector("#registerDeviceResetBtn");
const registerDeviceRegisterBtn = document.querySelector("#registerDeviceRegisterBtn");

let manutentionCodeInput = document.querySelector("#manutentionCode");
let manutentionDateInput = document.querySelector("#manutentionDate");
let manutentionDeviceInput = document.querySelector("#manutentionDevice");
let manutentionDeviceIpInput = document.querySelector("#manutentionDeviceIp");
let manutentionDeviceMacInput = document.querySelector("#manutentionDeviceMac");
let manutentionTypeInput = document.querySelector("#manutentionType");
let manutentionLevelInput = document.querySelector("#manutentionLevel");
let manutentionResponsableInput = document.querySelector("#manutentionResponsable");
let manutentionDescriptionInput = document.querySelector("#manutentionDescription");
let manutentionStatusInput = document.querySelector("#manutentionStatus");
let manutentionNextManutentionInput = document.querySelector("#manutentionNextManutention");

const registerManutentionExitBtn = document.querySelector("#registerManutentionExitBtn");
const registerManutentionResetBtn = document.querySelector("#registerManutentionResetBtn");
const registerManutentionRegisterBtn = document.querySelector("#registerManutentionRegisterBtn");

const manutentionHistoryLink = document.querySelector("#manutentionHistoryLink");
const manutentionHistoryArea = document.querySelector("#manutentionHistoryArea");
const manutentionHistoryExitBtn = document.querySelector("#manutentionHistoryExitBtn");


if(registerDeviceLink){
    registerDeviceLink.addEventListener("click", function(event){
        event.preventDefault()
        registerDeviceArea.classList.add('show');
    
    });
}

if(registerDeviceExitBtn){
    registerDeviceExitBtn.addEventListener("click", function(event){
        event.preventDefault()
        registerDeviceArea.classList.remove('show');
    });
}

if(registerDeviceResetBtn){
    registerDeviceResetBtn.addEventListener("click", function(event){
        event.preventDefault()
    
            deviceNameInput.value = ""; 
            deviceModelInput.value = "";
            deviceManufacturerInput.value = ""; 
            deviceIpAddressInput.value = ""; 
            deviceMacAddressInput.value = ""; 
            deviceCategoryInput.value = "";
            deviceStateInput.value = "";
            deviceSerialNumberInput.value = "";
    });
}

if(registerDeviceRegisterBtn){

    registerDeviceRegisterBtn.addEventListener("click", function(event){
        event.preventDefault()
    
        deviceName = deviceNameInput.value.trim(); 
        deviceModel = deviceModelInput.value.trim();
        deviceManufacturer = deviceManufacturerInput.value.trim(); 
        deviceIpAddress = deviceIpAddressInput.value.trim(); 
        deviceMacAddress = deviceMacAddressInput.value.trim(); 
        deviceCategory = deviceCategoryInput.value;
        deviceState = deviceStateInput.value;
        deviceSerialNumber = deviceSerialNumberInput.value.trim();
    
        const request = {
            "type": "manutentionRegisterDevice",
            "name" : deviceName,
            "model" : deviceModel,
            "manufacturer" : deviceManufacturer,
            "ipAddress": deviceIpAddress,
            "macAddress": deviceMacAddress,
            "category": deviceCategory,
            "state": deviceState,
            "serialNumber": deviceSerialNumber
            };
    
    
            const options = {
                method : "POST",        // HTTP method that we are using;
                credentials: "include",
                headers : {"Content-Type": "application/json; charset=utf-8"},      // Data format that we are using;
                body : JSON.stringify(request)      // The data that we are sending. JSON format;
            }
        
            fetch("http://localhost:8080/index.php",options)
            .then(res => res.json())
            .then(data => {
                if(data.message == true){
                    alert("Device Registered!");
                }else{
                    alert("Failed!");
                }
            });
    
        });
}

if(registerManutentionLink){

    registerManutentionLink.addEventListener("click", function(){
        registerManutentionArea.classList.add('show');
    });
}

if(registerManutentionExitBtn){
    registerManutentionExitBtn.addEventListener("click", function(){
        registerManutentionArea.classList.remove('show');
    });
}

if(registerManutentionResetBtn){

    registerManutentionResetBtn.addEventListener("click", function(){
        manutentionCodeInput.value = ""; 
        manutentionDateInput.value = ""; 
        manutentionDeviceInput.value = ""; 
        manutentionDeviceIpInput.value = ""; 
        manutentionDeviceMacInput.value = ""; 
        manutentionTypeInput.value = ""; 
        manutentionLevelInput.value = ""; 
        manutentionResponsableInput.value = ""; 
        manutentionDescriptionInput.value = "";
        manutentionStatusInput.value = ""; 
        manutentionNextManutentionInput.value = ""; 
    });
}


if(registerManutentionRegisterBtn){
    registerManutentionRegisterBtn.addEventListener("click", function(event){

        event.preventDefault()

        manutentionCode = manutentionCodeInput.value.trim() ;
        manutentionDate = manutentionDateInput.value ;
        manutentionDevice = manutentionDeviceInput.value.trim() ?? "Not Defined" ;
        manutentionDeviceIp = manutentionDeviceIpInput.value.trim() ;
        manutentionDeviceMac = manutentionDeviceMacInput.value.trim() ;
        manutentionType = manutentionTypeInput.value ;
        manutentionLevel = manutentionLevelInput.value ;
        manutentionResponsable = manutentionResponsableInput.value ;
        manutentionDescription = manutentionDescriptionInput.value;
        manutentionStatus = manutentionStatusInput.value ;
        manutentionNextManutention = manutentionNextManutentionInput.value;

    const request = {
            "type": "manutentionRegisterManutention",
            "code": manutentionCode,
            "date" : manutentionDate , 
            "device" : "asus",
            "device_ip": manutentionDeviceIp ,
            "device_mac": manutentionDeviceMac ,
            "manutention_type": manutentionType ,
            "level": manutentionLevel ,
            "responsable": manutentionResponsable ,
            "description": manutentionDescription ,
            "status": manutentionStatus ,
            "next_manutention": manutentionNextManutention ,
            };

            console.log(request);
    
    
            const options = {
                method : "POST",        // HTTP method that we are using;
                credentials: "include",
                headers : {"Content-Type": "application/json; charset=utf-8"},      // Data format that we are using;
                body : JSON.stringify(request)      // The data that we are sending. JSON format;
            }
        
            fetch("http://localhost:8080/index.php",options)
            .then(res => res.json())
            .then(data => {
                if(data.message == true){
                    alert("Manutention Registered!");
                }else{
                    alert("Failed");
                }
            });
}
    )};



if(manutentionHistoryLink){
    manutentionHistoryLink.addEventListener("click", function(){
        manutentionHistoryArea.classList.add("show");
    });
}

if(manutentionHistoryExitBtn){
    manutentionHistoryExitBtn.addEventListener("click", function(){
        manutentionHistoryArea.classList.remove("show");
    });
}