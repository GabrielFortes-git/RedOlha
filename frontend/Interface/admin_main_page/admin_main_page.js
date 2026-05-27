/* -------------------- Execute when html is loaded ------------------------*/

const request = {"type": "getData", "page": "admin_main_page"};

 const options = {
            method : "POST",        // HTTP method that we are using;
            credentials: "include",
            headers : {"Content-Type": "application/json; charset=utf-8"},      // Data format that we are using;
            body : JSON.stringify(request)      // The data that we are sending. JSON format;
        }
    
        fetch("http://localhost:8080/index.php",options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });

/*--------------------------------------------------------------------------*/

const monitoringModuleLink = document.querySelector("#monitoringModuleLink");
const manutentionModuleLink = document.querySelector("#manutentionModuleLink");
const netPlanningModuleLink = document.querySelector("#netPlanningModuleLink");
const alertModuleLink = document.querySelector("#alertModuleLink");

monitoringModuleLink.addEventListener("click", function(){
    window.location.href = "./admin_pages/monitoring_page/monitoring_page.html";
});

manutentionModuleLink.addEventListener("click", function(){
    window.location.href = "./admin_pages/manutention_page/manutention_page.html";
});


netPlanningModuleLink.addEventListener("click", function(){
    window.location.href = "./admin_pages/net_planning_page/net_planning_page.html";
});

alertModuleLink.addEventListener("click", function(){
    window.location.href = "./admin_pages/alerts_page/alerts_page.html";
});


//------------------------------------------------ PUSHER JS --------------------------------------------------+



const download = document.querySelector("#data-download");
const upload = document.querySelector("#data-upload");
const ping = document.querySelector("#data-ping")

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('e3568febf618e252044b', {
  cluster: 'eu'
});

var channel = pusher.subscribe('channel-speedTestData');
channel.bind('event-SpeedTestData', function(data) {
  download.textContent = data["download"];
  upload.textContent = data["upload"];
  ping.textContent = data["ping"];
});

//==================================================================================================================+
