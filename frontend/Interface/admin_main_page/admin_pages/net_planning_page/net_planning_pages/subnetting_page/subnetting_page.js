const subnetsContainer = document.querySelector("#subnetsContainer")
const limparBtn = document.querySelector("#limparBtn");
const exportarBtn = document.querySelector("#exportarBtn");
 
/*
 <tr>
    <td>192.168.0.0</td>
    <td>192.168.0.1 - 192.168.1.128</td>
    <td>192.168.0.128</td>
    <td>255.255.255.255</td>
</tr>
*/

 function calculateSubnetC(ip_address, CIDR, total_hosts, number_subnets, number_hosts_subnet) {

    document.querySelectorAll('.created-subnet').forEach(subnet => subnet.remove());
    const display_oct_values = [ip_address[0],ip_address[1],ip_address[2], ip_address[3]];
    const prefix =  `${display_oct_values[0]}.${display_oct_values[1]}.${display_oct_values[2]}.`;


      for(let i=0 , j= display_oct_values[3]; i < number_subnets; i++ , j+=number_hosts_subnet){

        let netIP = prefix + `${j}`;
        let broadcastIP =  prefix + `${j + (number_hosts_subnet - 1)}`;
        let validRange = prefix + `${j + 1}` + " " + "-" + " " + prefix + `${j + (number_hosts_subnet - 2)}`; 
        
        let tr = document.createElement("tr");
        tr.classList.add("created-subnet");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        td1.textContent = `${i + 1}`;
        td2.textContent = netIP;
        td3.textContent = validRange;
        td4.textContent = broadcastIP;
        td5.textContent = "255.255.255.0";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        subnetsContainer.appendChild(tr);
    }

    
}

function calculateSubnetB(ip_address, CIDR, total_hosts, number_subnets, number_hosts_subnet){
    
    document.querySelectorAll('.created-subnet').forEach(subnet => subnet.remove());
    let display_oct_values = [ip_address[0],ip_address[1],ip_address[2], 0];
    const prefix =  `${display_oct_values[0]}.${display_oct_values[1]}.`;
    
    let increment = [0,0];
    let repetition = [0,0];


    if((256 - ip_address[2])/ number_subnets >= 1){
        increment[0] = (256 - ip_address[2])/number_subnets;
        increment[1] = 0;
        repetition[0] = (256 - ip_address[2]) / increment[0];
        repetition[1] = 1;
    } else{
        increment[0] = 1
        increment[1] = number_hosts_subnet;
        repetition[0] = number_of_subnets / (256 / number_hosts_subnet);
        repetition[1] =  (256 / number_hosts_subnet);
    }
   
    for(let i = 0 , k=display_oct_values[2]; i < repetition[0]; i++, k+=increment[0]){
        for(let j = 0 , t=display_oct_values[3]; j < repetition[1] ; j++ , t+=increment[1]){
            let netIP = prefix + `${k}.${t}`;
            let broadcastIP = (increment[1] == 0)? prefix + `${(k + increment[0]) - 1}.255` : prefix + `${k}.${(t + increment[1]) - 1}`;
            let validRange = (increment[1] == 0)? prefix + `${k}.${t + 1}` + " " + "-" + " " + prefix + `${(k + increment[0]) - 1}.254` : prefix + `${k}.${t + 1}` + " " + "-" + " " + prefix + `${k}.${(t + increment[1]) - 2}`; 
 
            
            let tr = document.createElement("tr");
            tr.classList.add("created-subnet");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");

            td1.textContent = `${i + 1}`;
            td2.textContent = netIP;
            td3.textContent = validRange;
            td4.textContent = broadcastIP;
            td5.textContent = "255.255.255.0";

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            subnetsContainer.appendChild(tr);

        }
    }
    
}


const ipAddress = document.querySelector("#ipAddress");
const cidr = document.querySelector("#cidr");
const mask = document.querySelector("#mask");
const numberSubnets =document.querySelector("#numberSubnets");
const numberHosts = document.querySelector("#numberHosts");
const calculateBtn = document.querySelector("#calculateBtn");
const resetBtn = document.querySelector("#resetBtn");

calculateBtn.addEventListener("click", function(){
    let ipAddressValue = ipAddress.value.split(".").map(Number);
    let cidrValue = Number(cidr.value);
    // let maskValue = mask.value;
    let numberSubnetsValue = Number(numberSubnets.value);
    let totalNumberHosts = 2**(32 - cidrValue);
    let numberHostsValue = totalNumberHosts / numberSubnetsValue;
    
    
    if(cidrValue >= 24){
        calculateSubnetC(ipAddressValue,cidrValue,totalNumberHosts,numberSubnetsValue,numberHostsValue);
    }else {
        calculateSubnetB(ipAddressValue,cidrValue,totalNumberHosts,numberSubnetsValue,numberHostsValue);
    }
    
});

resetBtn.addEventListener("click", function(){
    ipAddress.value = "";
    cidr.value = "";
    mask.value = "";
    numberHosts.value = "";
    numberSubnets.value = "";
    
});



limparBtn.addEventListener("click", function(){
    document.querySelectorAll('.created-subnet').forEach(subnet => subnet.remove());

});

