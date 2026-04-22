const monitoringModuleLink = document.querySelector("#monitoringModuleLink")
const manutentionModuleLink = document.querySelector("#manutentionModuleLink")
const subnettingModuleLink = document.querySelector("#subnettingModuleLink")

monitoringModuleLink.addEventListener("click", function(){
    window.location.href = "admin_pages/monitoring_page/monitoring_page.html";
});

manutentionModuleLink.addEventListener("click", function(){
    window.location.href = "admin_pages/manutention_page/manutention_page.html";
});


subnettingModuleLink.addEventListener("click", function(){
    window.location.href = "admin_pages/subnetting_page/subnetting_page.html";
});



// /GPDF/RedOlha/frontend/Interface/admin_main_page/admin_pages/monitoring_page/monitoring_page.html