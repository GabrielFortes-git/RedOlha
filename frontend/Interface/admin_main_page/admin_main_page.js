const numberOfAgents = document.querySelector("#numberOfAgents");
const numberOfDevices = document.querySelector("#numberOfDevices");
const numberOfAlerts = document.querySelector("#numberOfAlerts");
const numberOfCriticAlerts = document.querySelector("#numberOfCriticAlerts");
const download = document.querySelector("#data-download");
const upload = document.querySelector("#data-upload");
const ping = document.querySelector("#data-ping")
const drops = document.querySelector("#data-drops");
const numberRegisters = document.querySelector("#numberRegisters");
const lastRegister = document.querySelector("#lastRegister");
const agentsContainer = document.querySelector("#agentsContainer");
const tableAlerts = document.querySelector("#tableAlerts");


function insertAgentsIntoContainer(data){

    data.forEach(agent => {
        let divContainer = document.createElement("div");
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let divModel = document.createElement("div");
        let divOS = document.createElement("div");
        let divStatus = document.createElement("div");
        let spanModelLabel = document.createElement("span");
        let spanModelValue = document.createElement("span");
        let spanOSLabel = document.createElement("span");
        let spanOSValue = document.createElement("span");
        let statusDivChild1 = document.createElement("div");
        let statusDivChild1Child = document.createElement("div");
        let StatusDivChild2 = document.createElement("div");
        let spanStatusValue = document.createElement("span");
        let img = document.createElement("img");
        img.src = "../Resources/Images/laptop.png";

        divContainer.classList.add("agent-info");
        div1.classList.add("icon");
        divModel.classList.add("model");
        divOS.classList.add("OS");
        divStatus.classList.add("status");

        spanModelLabel.textContent = "Model:";
        spanOSLabel.textContent = "OS:";
        spanModelValue.textContent = agent[0];
        spanOSValue.textContent = agent[1];
        spanStatusValue.textContent = (agent[2] == "up")? "Active" : "Inactive";
        
        div1.appendChild(img);

        divModel.appendChild(spanModelLabel);
        divModel.appendChild(spanModelValue);
        divOS.appendChild(spanOSLabel);
        divOS.appendChild(spanOSValue);

        statusDivChild1.appendChild(statusDivChild1Child);
        StatusDivChild2.appendChild(spanStatusValue);

        divStatus.appendChild(statusDivChild1);
        divStatus.appendChild(StatusDivChild2);

        div2.appendChild(divModel);
        div2.appendChild(divOS);
        div2.appendChild(divStatus);

        divContainer.appendChild(div1);
        divContainer.appendChild(div2);

        agentsContainer.appendChild(divContainer);
        
    });

/*
<div class="agent-info">
    <div class="icon"><img src="../Resources/Images/laptop.png"></div>
    <div>
        <div class="model"><span>Model:</span><span>Acer</span></div>
        <div class="os"><span>OS:</span><span>Linux</span></div>
        <div class="status"> <div> <div></div> </div>  <div><span>Active</span></div> </div>
    </div>
</div>
*/

}


function insertRecentAlerts(alerts){
    alerts.forEach(alert=>{
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let div = document.createElement("div");

        tr.classList.add("alert-row");
        td1.classList.add("td-criticity");
        
        if(alert[1] == "6")
            div.classList.add("td-backgroundColor-level6")
        else if(alert[1] == "8")
            div.classList.add("td-backgroundColor-level8")
        else
            div.classList.add("td-backgroundColor-level10")

        td1.appendChild(div)
        td2.textContent = alert[0];
        td3.textContent = alert[1];
        td4.textContent = alert[2];
        td5.textContent = alert[3];

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)

        tableAlerts.appendChild(tr);

    });

        //   <!-- <tr>
        //                     <td class="td-criticity"><div></div></td>
        //                     <td>10</td>
        //                     <td>1</td>
        //                     <td>Uso de Memoria Virtual (RAM)</td>
        //                     <td>A memória RAM está quase cheia. Feche as abas do navegador ou programas que não está a usar.</td>
        //                 </tr> -->
                         
}

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
            let stats = JSON.parse(data);
            console.log(data);
            numberOfAgents.textContent = stats["numberOfAgents"] ?? "0" ;
            numberOfAlerts.textContent = stats["numberOfAlerts"] ?? "0" ;
            numberOfCriticAlerts.textContent = stats["numberOfCriticAlerts"] ?? "0" ;
            numberOfDevices.textContent =  stats["numberOfDevices"] ?? "0" ;
            download.textContent = stats["download"] ?? "0";
            upload.textContent = stats["upload"] ?? "0";
            ping.textContent = stats["ping"] ?? "0";
            drops.textContent = stats["drops"] ?? "0";
            numberRegisters.textContent = stats["numberRegisters"] ?? "0";
            let lastRegisterDate = stats["lastRegister"].slice(0 , -8) ?? "-";
            lastRegister.textContent = lastRegisterDate;
            if(stats["agentsData"] != false && stats["agentsData"] != null) {insertAgentsIntoContainer(stats["agentsData"]);}
            if(stats["recentAlerts"] != false){insertRecentAlerts(stats["recentAlerts"]);}
        });




/*----------------------------------- LINKS ---------------------------------------*/

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



// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('e3568febf618e252044b', {
  cluster: 'eu'
});

var channel = pusher.subscribe('channel-mychannel');

channel.bind('event-SpeedTestData', function(data) {
  download.textContent = data["download"];
  upload.textContent = data["upload"];
  ping.textContent = data["ping"];
  drops.textContent = data["drops"];
  numberOfDevices.textContent = data["devices"];
});

channel.bind('event-alert', function(data) {

    if(data["recentAlerts"] != false){ 
        document.querySelectorAll('.alert-row').forEach(elemento => {
            elemento.remove();
        });
        insertRecentAlerts(data["recentAlerts"]);
    }
    numberOfAlerts.textContent = stats["numberOfAlerts"];
    numberOfCriticAlerts.textContent = stats["numberOfCriticAlerts"];

});



//==================================================================================================================+
