# import psutil
# import speedtest
# from scapy.all import ARP, Ether, srp
# from manuf import manuf
# import os

# #--------------------- Bandwidth & Lantência -----------------------#

# st = speedtest.Speedtest()
# print(f"Download: {st.download() / 10**6:.2f} Mbps")
# print(f"Upload: {st.upload() / 10**6:.2f} Mbps")
# print(f"Ping: {st.results.ping} ms")    # Latência;


# #------------------------- net_io_counters information ---------------------------#

# net = psutil.net_io_counters()

# netIOCounters = {
#     "bytes_sent": net.bytes_sent,
#     "bytes_recv": net.bytes_recv,
#     "packets_sent": net.packets_sent,
#     "packets_recv": net.packets_recv,
#     "errin": net.errin,
#     "errout": net.errout,
#     "dropin": net.dropin,
#     "dropout": net.dropout
# }

# print(netIOCounters)


# #------------------------ Network Devices -------------------------#



# parser = manuf.MacParser()

# arp_request = ARP(pdst="192.168.1.0/24")
# broadcast = Ether(dst="ff:ff:ff:ff:ff:ff")
# arp_request_broadcast = broadcast / arp_request

# answered_list = srp(arp_request_broadcast, timeout=2, verbose=False)[0]

# print("IP\t\tMAC\t\t\tFabricante")
# print("-" * 60)

# for sent, received in answered_list:
#     mac = received.hwsrc
#     manufacturer = parser.get_manuf(mac)
#     print(f"{received.psrc}\t{mac}\t{manufacturer}")
