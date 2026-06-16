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

registerDeviceLink.addEventListener("click", function(event){
    event.preventDefault()
    registerDeviceArea.classList.add('show');

});

registerDeviceExitBtn.addEventListener("click", function(event){
    event.preventDefault()
    registerDeviceArea.classList.remove('show');
});

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


registerDeviceRegisterBtn.addEventListener("click", function(event){
    event.preventDefault()

    deviceName = deviceNameInput.value.trim(); 
    deviceModel = deviceModelInput.value.trim();
    deviceManufacturer = deviceManufacturerInput.value.trim(); 
    deviceIpAddress = deviceIpAddressInput.value.trim(); 
    deviceMacAddress = deviceMacAddressInput.value.trim(); 
    deviceCategory = deviceCategoryInput.value.trim();
    deviceState = deviceState.valueInput.trim();
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


registerManutentionLink.addEventListener("click", function(){
    registerManutentionArea.classList.add('show');
    const registerManutentionExitBtn = document.querySelector("#registerManutentionExitBtn");
    const registerManutentionResetBtn = document.querySelector("#registerManutentionResetBtn");
    const registerManutentionRegisterBtn = document.querySelector("#registerManutentionRegisterBtn");

    /*---- Form Inputs -------*/
    const manutentionCode = document.querySelector("#manutentionCode");
    const manutentionDate = document.querySelector("#manutentionDate");
    const manutentionDevice = document.querySelector("#manutentionDevice");
    const manutentionDeviceIp = document.querySelector("#manutentionDeviceIp");
    const manutentionDeviceMac = document.querySelector("#manutentionDeviceMac");
    const manutentionType = document.querySelector("#manutentionType");
    const manutentionLevel = document.querySelector("#manutentionLevel");
    const manutentionResponsable = document.querySelector("#manutentionResponsable");
    const manutentionDescription = document.querySelector("#manutentionDescription");
    const manutentionStatus = document.querySelector("#manutentionStatus");
    const manutentionNextManutention = document.querySelector("#manutentionNextManutention");

    registerManutentionExitBtn.addEventListener("click", function(){
        registerManutentionArea.classList.remove('show');
    });

    registerManutentionResetBtn.addEventListener("click", function(){
        manutentionCode.value = ""; 
        manutentionDate.value = ""; 
        manutentionDevice.value = ""; 
        manutentionDeviceIp.value = ""; 
        manutentionDeviceMac.value = ""; 
        manutentionType.value = ""; 
        manutentionLevel.value = ""; 
        manutentionResponsable.value = ""; 
        manutentionDescription.value = "";
        manutentionStatus.value = ""; 
        manutentionNextManutention.value = ""; 
    });


});
