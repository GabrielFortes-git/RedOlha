import psutil
import platform
import socket
import json
import random
import string
import getpass
import ifaddr

FILE = "agentCode.json"

def findDeviceEspecifications():
    try:
        with open("/sys/devices/virtual/dmi/id/product_name") as f:
            model = f.read().strip()

        with open("/sys/devices/virtual/dmi/id/sys_vendor") as f:
            manufacturer = f.read().strip()

        return {
                "manufacturer" : manufacturer,
                "model" : model
                }
    except:
        return {
                "manufacturer" : "not found",
                "model" : "not found"
                }

def findIpAddress():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 1))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

    # adapters = ifaddr.get_adapters()
    # for adapter in adapters:
    #     # eth0 is the default interface in Docker containers
    #     if adapter.nice_name == 'eth0':
    #         for ip in adapter.ips:
    #             if isinstance(ip.ip, str) and '.' in ip.ip:
    #                 return ip.ip
    # return "unknown"




def generate_random_string(length):
    # Define the pool of characters (letters and digits)
    characters = string.ascii_letters + string.digits
    
    # Use random.choices to pick 'length' characters and join them
    random_string = ''.join(random.choices(characters, k=length))
    return random_string

def convert_bytes_to_megabytes(num):
    mb = (num / 1024)/1024
    return int(mb)


def getSystemLevelData():
    while(True):

        os = platform.system()
        release = platform.release()
        machineArchitecture = platform.machine()
        deviceEspecifications = findDeviceEspecifications()
        manufacturer = deviceEspecifications["manufacturer"]
        model = deviceEspecifications["model"]
        processor = platform.processor()

        #------------------------------------ IP ----------------------------------#

        ipAddress = findIpAddress()

        # --------------------------------------  CPU times -----------------------------------------------#
        # Return system CPU times as a named tuple. Every attribute represents the seconds the CPU has spent in the given mode

        getCpuTimes = list(psutil.cpu_times())
        cpuTimes = {
            "user": getCpuTimes[0],
            "nice": getCpuTimes[1],
            "system": getCpuTimes[2],
            "idle": getCpuTimes[3],
            "iowait": getCpuTimes[4],
            "irq": getCpuTimes[5],
            "softirq": getCpuTimes[6],
            "steal": getCpuTimes[7],
            "guest": getCpuTimes[8],
        }


        #scputimes(user=383.63, nice=36.46, system=195.25, idle=10804.76, iowait=45.17, irq=0.0, softirq=9.01, steal=0.0, guest=0.0, guest_nice=0.0)
        #     user - time spent by normal processes executing in user mode
        #    nice - time spent by priority processes executing in user mode
        #    system - time spent by processes executing in kernel mode
        #   idle - time when system was idle
        #    iowait - time spent waiting for I/O to complete. This is not accounted in idle time counter.
        #    irq - time spent for servicing hardware interrupts
        #    softirq - time spent for servicing software interrupts
        #    steal - time spent by other operating systems running in a virtualized environment
        #    guest - time spent running a virtual CPU for guest operating systems under the control of the Linux kernel


        #-------------------------------- CPU utilization as a percentage ------------------------------------#

        cpuUsage = psutil.cpu_percent(interval = 1)

        #---------------------------- The number of CPUs (cores) in the system ------------------------------------#

        physicalCoreCount = psutil.cpu_count()
        logicalCoreCount = psutil.cpu_count(logical=True)


        #-------------------------------------------- CPU statistics ------------------------------------------------#

        getCpuStats = list(psutil.cpu_stats())
        cpuStats = {
            "ctx_switches": getCpuStats[0],
            "interrupts": getCpuStats[1],
            "soft_interrupts": getCpuStats[2],
            "syscalls": getCpuStats[3]
        }

        #   ctx_switches - number of context switches since boot.
        #   interrupts - number of interrupts since boot.
        #   soft_interrupts - number of software interrupts since boot.
        #   syscalls - number of system calls since boot. Always set to 0 in Ubuntu.

        #------------------------ CPU frequency - current, min and max frequencies expressed in Mhz ---------------------------------#

        getCpuFrequency = list(psutil.cpu_freq())
        cpuFrequency = {
            "current": round(getCpuFrequency[0], 2),
            "min": round(getCpuFrequency[1], 2),
            "max": round(getCpuFrequency[2], 2),
        }


        # -------------------------------- Average system load in last 1, 5 and 15 minuts -------------------------------------#

        getAverageSystemLoad = psutil.getloadavg()
        averageSystemLoad = {
            "oneMin": getAverageSystemLoad[0],
            "fiveMin": getAverageSystemLoad[1],
            "fifteenMin": getAverageSystemLoad[2]
        }

        #--------------------------------------------- System memory usage ----------------------------------------------------#

        getMemoryUsage = list(psutil.virtual_memory())
        virtualMemory = {
            "total": convert_bytes_to_megabytes(getMemoryUsage[0]),
            "available": convert_bytes_to_megabytes(getMemoryUsage[1]),
            "percent": convert_bytes_to_megabytes(getMemoryUsage[2]),
            "used": convert_bytes_to_megabytes(getMemoryUsage[3]),
            "free": convert_bytes_to_megabytes(getMemoryUsage[4]),
            "active": convert_bytes_to_megabytes(getMemoryUsage[5]),
            "inactive": convert_bytes_to_megabytes(getMemoryUsage[6]),
            "buffers": convert_bytes_to_megabytes(getMemoryUsage[7]),
            "cached": convert_bytes_to_megabytes(getMemoryUsage[8]),
            "shared": convert_bytes_to_megabytes(getMemoryUsage[9]),
            "slab": convert_bytes_to_megabytes(getMemoryUsage[10]),
        }


        #total=16449527808, available=2891665408, percent=82.4, used=12736483328, free=1182068736, active=4800262144,
        #  inactive=9354018816, buffers=73732096, cached=2457243648, shared=683372544, slab=654286848)

        #    total - total physical memory excluding swap.
        #    available - the memory that can be given instantly to processes without the system going into swap.
        #    used - memory used.
        #    free - memory not used at and is readily available
        #    active - memory currently in use or very recently used.
        #    inactive - memory that is marked as not used.
        #    buffers - cache data like file system metadata.
        #    cached - cached data
        #    shared - memory that may be accessed by multiple processes.

        # --------------------------------------------- Swap memory statistics ---------------------------------------------------#

        getSwapMemoryStats = list(psutil.swap_memory())
        swapMemoryStats = {
            "total": convert_bytes_to_megabytes(getSwapMemoryStats[0]),
            "used": convert_bytes_to_megabytes(getSwapMemoryStats[1]),
            "percent": convert_bytes_to_megabytes(getSwapMemoryStats[2]),     
        }

        #   total - total swap memory in bytes
        #   used - used swap memory in bytes
        #   free - free swap memory in bytes
        #   percent - the percentage usage that is calculated as (total - available) / total * 100
        #   sin - the number of bytes the system has swapped in from disk
        #   sout - the number of bytes the system has swapped out from disk


        #---------------------  Disk usage ------------------------------#


        getDiskUsage = psutil.disk_usage("/")
        diskUsage = {
                "total": convert_bytes_to_megabytes(getDiskUsage[0]),
                "used": convert_bytes_to_megabytes(getDiskUsage[1]),
                "free": convert_bytes_to_megabytes(getDiskUsage[2]),
                "percent": convert_bytes_to_megabytes(getDiskUsage[3]),
                }


    #----------------- Net I/O counters ---------------------#
    # Return system-wide network I/O statistics as a named tuple including the following attributes:


        getNetIOCounters = psutil.net_io_counters(pernic=False, nowrap=True)
        netIOCounters = {
            "bytes_sent": convert_bytes_to_megabytes(getNetIOCounters[0]),
            "bytes_recv": convert_bytes_to_megabytes(getNetIOCounters[1]),
            "packets_sent": convert_bytes_to_megabytes(getNetIOCounters[2]),
            "packets_recv": convert_bytes_to_megabytes(getNetIOCounters[3]),
            "errin": convert_bytes_to_megabytes(getNetIOCounters[4]),
            "errout": convert_bytes_to_megabytes(getNetIOCounters[5]),
            "dropin": convert_bytes_to_megabytes(getNetIOCounters[6]),
            "dropout": convert_bytes_to_megabytes(getNetIOCounters[7])
        }

        #     bytes_sent: number of bytes sent
        #     bytes_recv: number of bytes received
        #     packets_sent: number of packets sent
        #     packets_recv: number of packets received
        #     errin: total number of errors while receiving
        #     errout: total number of errors while sending
        #     dropin: total number of incoming packets which were dropped
        #     dropout: total number of outgoing packets which were dropped (always 0 on macOS and BSD)


        #---------------------------------- Battery percentage ----------------------------#
        getBatteryPercentage = psutil.sensors_battery()
        batteryPercentage = getBatteryPercentage[0]
 
        #---------------------- Boot time ---------------------------#
        bootTime = psutil.boot_time()  
        
        # Need to be converted to this format (yyyy/mm/dd - H:M:S)

        #---------------------- User ------------------------#

        user = getpass.getuser()

        # --------------------------------------- Organize the collected data ------------------------------------------#


        with open(FILE, 'r', encoding='utf-8') as file:
            data = json.load(file)

        if(data["code"] == None):
            data["code"] = generate_random_string(10)
            agentCode = data["code"]

            with open(FILE, 'w', encoding='utf-8') as file:
                json.dump(data, file, indent=4)

        else:
            agentCode = data["code"]


        systemlevelData = {
            "code": agentCode,
            "os":os,
            "release":release,
            "architecture":machineArchitecture,
            "manufacturer":manufacturer,
            "model":model,
            "ipAddress": ipAddress,
            "cpuTimes": cpuTimes,
            "cpuUsage": cpuUsage,
            "physicalCoreCount": physicalCoreCount,
            "logicalCoreCount": logicalCoreCount,
            "cpuStats": cpuStats,
            "cpuFrequency": cpuFrequency,
            "averageSystemLoad": averageSystemLoad,
            "virtualMemory": virtualMemory,
            "swapMemoryStats": swapMemoryStats,
            "diskUsage": diskUsage,
            "netIOCounters": netIOCounters,
            "batteryPercentage": batteryPercentage,
            "bootTime": bootTime,
            "user" : user
            }
        
        return systemlevelData
    
   
