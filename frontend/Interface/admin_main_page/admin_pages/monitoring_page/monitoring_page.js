/**----------------------- Links ------------------------------- */

const agentMonitoringPageLink1 = document.querySelector("#agentMonitoringPageLink1");
const agentMonitoringPageLink2 = document.querySelector("#agentMonitoringPageLink2");

agentMonitoringPageLink1.addEventListener("click", function(){
    window.location.href = "./agent_monitoring_page/agent_monitoring_page.html";
});

agentMonitoringPageLink2.addEventListener("click", function(){
    window.location.href = "./agent_monitoring_page/agent_monitoring_page.html";
});

/**------------------- Page Elements ---------------------------- */

const bytesEnviados = document.querySelector("#bytesEnviados");
const bytesRecebidos  = document.querySelector("#bytesRecebidos");
const pacotesEnviados  = document.querySelector("#pacotesEnviados");
const pacotesRecebidos  = document.querySelector("#pacotesRecebidos");
const erros = document.querySelector("#erros");
const descartes = document.querySelector("#descartes");
const download  = document.querySelector("#download");
const upload  = document.querySelector("#upload");
const ping = document.querySelector("#ping");
const bandwidth = document.querySelector("#bandwidth");
const networkDevicesContainer = document.querySelector("#networkDevicesContainer");



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
        img.src = "../../../Resources/Images/laptop.png";

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

}


function insertNetworkDevicesIntoContainer(datas){

    datas.forEach(data =>{

        let divContainer = document.createElement("div");
        let divIcon = document.createElement("div");
        let divName = document.createElement("div");
        let divIp = document.createElement("div");
        let divMac = document.createElement("div");
        let divState = document.createElement("div");
        let spanIcon = document.createElement("span");
        let spanName = document.createElement("span");
        let spanIp = document.createElement("span");
        let spanMac = document.createElement("span");
        let spanState = document.createElement("span");
        let img = document.createElement("img");


        divIcon.classList.add("icon");
        divName.classList.add("name");
        divIp.classList.add("ip-address");
        divMac.classList.add("mac-address");
        divState.classList.add("state");

        img.src = "../../../Resources/icons/siren-alt.svg";

        spanIcon.appendChild(img);
        spanName.textContent = data[2];
        spanIp.textContent = data[0];
        spanMac.textContent = data[1];
        spanState.textContent = data[3];

        divIcon.appendChild(spanIcon);
        divName.appendChild(spanName);
        divIp.appendChild(spanIp);
        divMac.appendChild(spanMac);
        divState.appendChild(spanState);

        divContainer.appendChild(divIcon);
        divContainer.appendChild(divName);
        divContainer.appendChild(divIp);
        divContainer.appendChild(divMac);
        divContainer.appendChild(divState);

        networkDevicesContainer.appendChild(divContainer);

    });
    
}

//  <div>
//     <div class="icon"><img src="../../../Resources/icons/siren-alt.svg"></div>
//     <div class="name"><span>Lenovo</span></div>
//     <div class="ip-address"><span>192.168.1.11</span></div>
//     <div class="mac-address"><span>ff:ff:ff:ff:ff:ff</span></div>
//     <div class="state"><div></div></div>
//  </div>


const request = {"type": "getData", "page": "monitoring_page"};

 const requestOptions = {
            method : "POST",        // HTTP method that we are using;
            credentials: "include",
            headers : {"Content-Type": "application/json; charset=utf-8"},      // Data format that we are using;
            body : JSON.stringify(request)      // The data that we are sending. JSON format;
        }
    
        fetch("http://localhost:8080/index.php",requestOptions)
        .then(res => res.json())
        .then(data => {
            let stats = JSON.parse(data);
            console.log(stats);
            bytesEnviados.textContent = Math.trunc(stats["bytes_sent"]/ (1024 * 1024)) ?? "0";
            bytesRecebidos.textContent = Math.trunc(stats["bytes_recv"]/ (1024 * 1024)) ?? "0";
            pacotesEnviados.textContent = stats["packets_sent"] ?? "0";
            pacotesRecebidos.textContent = stats["packets_sent"] ?? "0";
            erros.textContent = stats["errin"] ?? "0";
            descartes.textContent = stats["dropin"] ?? "0";
            download.textContent = stats["download"] ?? "0";
            upload.textContent = stats["upload"] ?? "0";
            ping.textContent = stats["ping"] ?? "0";
            bandwidth.textContent = stats["bandwidth"] ?? "0";
            if(stats["agentsData"] != false){ insertAgentsIntoContainer(stats["agentsData"]); }
            if(stats["networkDevices"] != false){ insertNetworkDevicesIntoContainer(stats["networkDevices"]);}
        });