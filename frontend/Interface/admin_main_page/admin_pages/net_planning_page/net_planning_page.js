const subnettingPageBtn = document.querySelector("#subnet-module-btn");
const netTopologyPageBtn = document.querySelector("#net-topology-module-btn");

subnettingPageBtn.addEventListener("click", function(){
    window.location.href="./net_planning_pages/subnetting_page/subnetting_page.html";
});

netTopologyPageBtn.addEventListener("click", function(){
    window.location.href="./net_planning_pages/net_topology_page/net_topology_page.html";
});