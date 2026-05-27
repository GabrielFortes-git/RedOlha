import psutil
import speedtest
from scapy.all import ARP, Ether, srp
from manuf import manuf
from easysnmp import Session
import os
import time
import requests


#--------------------- Bandwidth & Lantência -----------------------#

try:
    st = speedtest.Speedtest()
    speedTestData = {"download": st.download() / 10**6, "upload": st.upload() / 10**6, "ping": st.results.ping}
    # Download and Upload - Mbps  , ping - ms
except:
    speedTestData = None
    print("ERROR: Failed to execute the speed test!")




#------------------------- net_io_counters information ---------------------------#

try:
    net = psutil.net_io_counters()

    netIOCounters = {
        "bytes_sent": net.bytes_sent,
        "bytes_recv": net.bytes_recv,
        "packets_sent": net.packets_sent,
        "packets_recv": net.packets_recv,
        "errin": net.errin,
        "errout": net.errout,
        "dropin": net.dropin,
        "dropout": net.dropout
    }
except:
    netIOCounters = None
    print("ERROR: Failed to get net IO counters!")




#------------------------ Network Devices -------------------------#


try:
    parser = manuf.MacParser()

    arp_request = ARP(pdst="192.168.1.0/24")
    broadcast = Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request

    answered_list = srp(arp_request_broadcast, timeout=2, verbose=False)[0]

    # print("IP\t\tMAC\t\t\tFabricante")
    # print("-" * 60)

    devices = []

    for sent, received in answered_list:
        mac = received.hwsrc
        manufacturer = parser.get_manuf(mac)
        device = [received.psrc, mac , manufacturer or "Unknown"]
        devices.append(device)


except:
    devices = None
    print("ERROR: Failed to find devices!")


#------------------------- Router Data ---------------------------------#

try:


    ROUTER = '192.168.1.254'    # Next step: Find default gateway;

    # Create an SNMP session to be used for all our requests
    session = Session(hostname= ROUTER, community='public', version=2)

    OIDS = [
        ['description','1.3.6.1.2.1.1.1.0'],
        ['objectID','1.3.6.1.2.1.1.2.0'],
        ['uptime','1.3.6.1.2.1.1.3.0'], # Centésimos de segundo
        ['name','1.3.6.1.2.1.1.5.0'],
        ['location','1.3.6.1.2.1.1.6.0'],
        ['timeSinceLastChange','1.3.6.1.2.1.1.8.0'],
        ['numberOfInterfaces','1.3.6.1.2.1.2.1.0'],
        ]

    datas = {}

    for i in OIDS:
        retrive_data = session.get(i[1])
        datas[i[0]] = retrive_data.value


    # for key, value in datas.items():
    #     print(f"{key} : {value}\n")


    interfaceIDs = []
    getInterfaceIDs = session.walk("1.3.6.1.2.1.2.2.1.1")

    for i in getInterfaceIDs:
        interfaceIDs.append(i.value)

    interfaceCorrespondentNumber = ['2','3','4','5','7','9','10','11','14','15']
    # 1.3.6.1.2.1.2.2.1.5.x   Reference: https://www.net-snmp.org/docs/mibs/interfaces.html#IANAifType
        # ["name",2], 
        # ["type",3], 
        # ["maxPacketSize",4], 
        # ["speed",5] ,    
        # ["status",7] ,   
        # ["lastChange",9] , 
        # ["octetsReceived",10] , 
        # ["packetsDelivered",11] , 
        # ["errors",14] ,    
        # ["discartedPackets",15] , 

    interfaces = []

    #oid = "1.3.6.1.2.1.2.2.1.2." + i 

    for i in interfaceIDs:
        interface = []
        interface.append(i)
        for j in interfaceCorrespondentNumber:
            data = session.get(f"1.3.6.1.2.1.2.2.1."+j+"."+i)
            interface.append(data.value)
            
        interfaces.append(interface)

    routerData = [datas,interfaces]        
    
except:
    routerData = None
    print("ERROR: Failed to retrive data from router!")


# ----------------------- Sending the data collected -------------#

URL = "http://localhost:8080/index.php"

dataCollected = [speedTestData,netIOCounters,devices,routerData]
requestData = {"type":"netData", "data": dataCollected}
response = requests.post(URL, json=requestData)

if(response.status_code == 200):
    print(f"SUCCESS [{response.status_code}: {response.text}]")
else:
    print("ERROR: Request Failed!")


