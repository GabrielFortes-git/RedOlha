


/*---------------------------------------------------- CHART - BATTERY ---------------------------------------------------------------*/

var options1 = {
  series: [0],
  chart: {
    height: 220,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#e7e7e7',
        strokeWidth: '97%',
        margin: 5,
      },
      dataLabels: {
        name: { show: false },
        value: {
          offsetY: -2,
          fontSize: '32px',
          formatter: function (val) {
            return val + '%'
          },
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91],
    },
  },
  labels: ['Score'],
}



/*---------------------------------------------------- CHART - CPU ---------------------------------------------------------------*/

let cpuData = [];
var cpuLabels = [];

var options2 = {
   chart: {
        id: 'chartCPU',
        type: 'area',
        height: 250,
        animations: {
            enabled: false
        }
    },
  series: [
    {
      name: 'CPU',
      data: [], 
    },
  ],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  // CONFIGURAÇÃO DO EIXO Y PARA 0-100%
  yaxis: {
    min: 0,
    max: 100,
    type: 'category',
    categories : [],
    tickAmount: 5, 
    labels: {
      formatter: function (value) {
        return value + "%";
      }
    }
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z',
    ],
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
    y: {
      formatter: function (value) {
        return value + "%";
      }
    }
  },
}



/*---------------------------------------------------- CHART - RAM ---------------------------------------------------------------*/

let ramData = [];
let ramLabels = [];


var options3 = {
  chart: {
        id: 'chartRAM',
        type: 'area',
        height: 250,
        animations: {
            enabled: false 
        }
    },
  series: [
    {
      name: 'RAM',
      data: [],
    },
  ],
  colors: ['#64be58'], 
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
   yaxis: {
    min: 0,
    max: 100,
    type: 'category',
    categories : [],
    tickAmount: 5, 
    labels: {
      formatter: function (value) {
        return value + "%";
      }
    }
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z',
    ],
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
    y: {
      formatter: function (value) {
        return value + "%";
      }
    }
  },
}


/*---------------------------------------------------- CHART - SWAP ---------------------------------------------------------------*/


var options4 = {
  series: [
    {
      name: 'SWAP',
      data: [0, 0, 0,0 ,0 , 0, 0],
    },
  ],
  colors: ['#daa161'], 
  chart: {
    height: 250,
    type: 'area',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
   yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5,
    labels: {
      formatter: function (value) {
        return value + "%";
      }
    }
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z',
    ],
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
}



/*---------------------------------------------------- CHART - DISK ---------------------------------------------------------------*/


var options5 = {
  series: [44, 55],
  labels : ["Used","Free"],
  chart: {
    width: 280,
    type: 'donut',
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  legend: {
    position: 'right',
    offsetY: 0,
    height: 230,
  },
}





/*---------------------------------------------------- CHART - CPU Frequency ---------------------------------------------------------------*/

var options6 = {
  series: [0],
  chart: {
    height: 250,
    type: 'gauge',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 15,
        size: '70%',
      },
      dataLabels: {
        name: {
          show: true,
          offsetY: -20,
          fontSize: '16px',
          color: '#999',
        },
        value: {
          show: true,
          fontSize: '40px',
          fontWeight: 700,
          offsetY: 6,
          formatter: function (val) {
            return val + '%'
          },
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#ABE5A1'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'round',
  },
  labels: ['CPU Frequency'],
}





/*---------------------------------------------------- CHART - AVG SYS LOAD---------------------------------------------------------------*/


var options7 = {
  series: [
    {
      name: 'Average System Load',
      data: [1.61133, 0.708496, 0.425293], // Os seus novos dados decimais pequenos
    },
  ],
  chart: {
    type: 'bar',
    height: 250,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      '1 min',
      '5 min',
      '15 min',
    ],
  },
  yaxis: {
    min: 0,            // Garante que o gráfico começa no zero
    max: 3,            // Limite superior fixo apropriado para os seus dados
    stepSize: 1,       // Força a escala a andar estritamente de 1 em 1 segundo
    labels: {
      formatter: function (value) {
        return value + "s"; // Adiciona o sufixo de segundos aos inteiros (0s, 1s, 2s, 3s)
      }
    }
  }
}


/*==================================================================================================================================================*/

var chartBattery = new ApexCharts(document.querySelector('#chartContainerBattery'), options1)
chartBattery.render()


var chartCPU = new ApexCharts(document.querySelector('#chartContainerCPU'), options2)
chartCPU.render()

var chartRAM = new ApexCharts(document.querySelector('#chartContainerRAM'), options3)
chartRAM.render()

var chartSWAP = new ApexCharts(document.querySelector('#chartContainerSWAP'), options4)
chartSWAP.render()



var chartDisk = new ApexCharts(document.querySelector('#chartContainerDisk'), options5)
chartDisk.render()

var chartCPUFreq = new ApexCharts(document.querySelector('#chartContainerCPUFreq'), options6)
chartCPUFreq.render()

var chartSysLoad = new ApexCharts(document.querySelector('#chartContainerSysLoad'), options7)
chartSysLoad.render()

/*==================================================================================================================================================*/



const machineModel = document.querySelector("#machine-model");
const machineManufacturer = document.querySelector("#machine-manufacturer");
const machineOS = document.querySelector("#machine-os");
const machineVersion = document.querySelector("#machine-version");
const machineState = document.querySelector("#machine-state");

let battery = 0;
let diskUsageUsed = 0;
let diskUsageFree =  0;

const totalDiskUsage = document.querySelector("#totalDiskUsage");

let cpu = 0;
let ram = 0;
let swap = 0;

let cpuFrequency = 0;
const cpuMaxFrequency = document.querySelector("#cpuMaxFrequency");
const cpuMinFrequency = document.querySelector("#cpuMinFrequency");

const cpuTimesUser = document.querySelector("#cpuTimesUser");
const cpuTimesNice = document.querySelector("#cpuTimesNice");
const cpuTimesSystem = document.querySelector("#cpuTimesSystem");
const cpuTimesIdel = document.querySelector("#cpuTimesIdel");
const cpuTimesIowait = document.querySelector("#cpuTimesIowait");
const cpuTimesIrq = document.querySelector("#cpuTimesIrq");

const cpuStatsSwitches  = document.querySelector("#cpuStatsSwitches");
const cpuStatsInterrupts  = document.querySelector("#cpuStatsInterrupts");
const cpuStatsSoftInterrupts = document.querySelector("#cpuStatsSoftInterrupts");
const cpuStatsSyscalls = document.querySelector("#cpuStatsSyscalls");

let avgSysLoad = 0;

const bytesSend = document.querySelector("#bytesSend");
const bytesRecv = document.querySelector("#bytesRecv");
const packetsSend = document.querySelector("#packetsSend");
const packetsRecv = document.querySelector("#packetsRecv");
const errin = document.querySelector("#errin");
const errout = document.querySelector("#errout");
const dropin = document.querySelector("#dropin");
const dropout = document.querySelector("#dropout");



const request = {"type": "getData", "page": "agent_monitoring_page"};

 const requestOptions = {
            method : "POST",        // HTTP method that we are using;
            credentials: "include",
            headers : {"Content-Type": "application/json; charset=utf-8"},      // Data format that we are using;
            body : JSON.stringify(request)      // The data that we are sending. JSON format;
        }
    
        fetch("http://localhost:8080/index.php",requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(typeof(data));

          machineModel.textContent = data["agent_details"][0] ;
          machineManufacturer.textContent = data["agent_details"][1] ;
          machineOS.textContent = data["agent_details"][2] ;
          machineVersion.textContent = data["agent_details"][3] ;
          machineState.textContent = data["agent_details"][4] ;

          battery = Math.round(parseFloat(data["battery"]));
          chartBattery.updateSeries([battery]);

          totalDiskUsage.textContent = `${Math.round(data["disk_usage"][0]/1024)} GB` ;
          diskUsageUsed = Math.round(data["disk_usage"][1]/1024);
          diskUsageFree = Math.round(data["disk_usage"][2]/1024);
          chartDisk.updateSeries([diskUsageUsed, diskUsageFree])

          // cpu = data["cpu"];
          // cpuData = [
          //           Math.round(parseFloat(cpu[0])),
          //           Math.round(parseFloat(cpu[1])),
          //           Math.round(parseFloat(cpu[2])),
          //           Math.round(parseFloat(cpu[3])),
          //           Math.round(parseFloat(cpu[4])),
          //           Math.round(parseFloat(cpu[5])),
          //           Math.round(parseFloat(cpu[6]))
          // ]
          // chartCPU.updateSeries( [{
          //       name: 'CPU',
          //       data: cpuData
          //     }]);



          // ram = data["ram"];

          // ramData = [
          //     Math.round(parseFloat(ram[0])),
          //     Math.round(parseFloat(ram[1])),
          //     Math.round(parseFloat(ram[2])),
          //     Math.round(parseFloat(ram[3])),
          //     Math.round(parseFloat(ram[4])),
          //     Math.round(parseFloat(ram[5])),
          //     Math.round(parseFloat(ram[6]))
          //   ]

          chartRAM.updateSeries([{
            name: 'RAM',
            data: ramData
          }])



          swap = data["swap"];
          chartSWAP.updateSeries([{
            name : 'RAM',
            data : [
                Math.round(parseFloat(swap[0])),
                Math.round(parseFloat(swap[1])),
                Math.round(parseFloat(swap[2])),
                Math.round(parseFloat(swap[3])),
                Math.round(parseFloat(swap[4])),
                Math.round(parseFloat(swap[5])),
                Math.round(parseFloat(swap[6]))
            ]
          }])

          const maxFreq = parseFloat(data["cpu_frequency"][1]);
          const minFreq = parseFloat(data["cpu_frequency"][2]);
          const currentFreq = parseFloat(data["cpu_frequency"][0]);

          cpuMaxFrequency.textContent = maxFreq;
          cpuMinFrequency.textContent = minFreq;

          cpuFrequency = Math.round((currentFreq / maxFreq) * 100);
          chartCPUFreq.updateSeries([cpuFrequency]);

          cpuTimesUser.textContent = data["cpu_times"][0];
          cpuTimesNice.textContent = data["cpu_times"][1];
          cpuTimesSystem.textContent = data["cpu_times"][2];
          cpuTimesIdel.textContent = data["cpu_times"][3];
          cpuTimesIowait.textContent = data["cpu_times"][4];
          cpuTimesIrq.textContent = data["cpu_times"][5];

          cpuStatsSwitches.textContent  = data["cpu_stats"][0];
          cpuStatsInterrupts.textContent  = data["cpu_stats"][1];
          cpuStatsSoftInterrupts.textContent = data["cpu_stats"][2];
          cpuStatsSyscalls.textContent = data["cpu_stats"][3];

          let avgSysLoad = data["avg_sys_load"];
          const avg1min =  parseFloat(avgSysLoad[0]).toFixed(2);
          const avg5min = parseFloat(avgSysLoad[1]).toFixed(2);
          const avg15min = parseFloat(avgSysLoad[2]).toFixed(2);

          chartSysLoad.updateSeries([{
            name : 'Average System Load',
            data : [
              avg1min,
              avg5min,
              avg15min
            ]
          }])



          bytesSend.textContent = data["io_counters"][0] ;
          bytesRecv.textContent = data["io_counters"][1] ;
          packetsSend.textContent = data["io_counters"][2] ;
          packetsRecv.textContent = data["io_counters"][3] ;
          errin.textContent = data["io_counters"][4] ;
          errout.textContent = data["io_counters"][5] ;
          dropin.textContent = data["io_counters"][6] ;
          dropout.textContent = data["io_counters"][7] ;


        });



/*==================================================================================================================================================*/


var pusher = new Pusher('e3568febf618e252044b', {
  cluster: 'eu'
});

var channel = pusher.subscribe('channel-mychannel');
  channel.bind('event-agent-cpu-battery', function(data) {
      
          battery = Math.round(parseFloat(data["battery"]));
          chartBattery.updateSeries([battery]);

       // Gera o carimbo de tempo único (Garante que o gráfico não quebra)
        const agora = new Date();
        const tempoUnico = agora.toLocaleTimeString('pt-PT', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        cpuData.push(Math.round(parseFloat(data["cpu"])));
        cpuLabels.push(tempoUnico);


chartCPU.updateOptions({
    series: [{
        name: 'CPU',
        data: cpuData
    }],
    xaxis: {
      type: 'category',
        categories: cpuLabels
    }
}, true, true); 

window.dispatchEvent(new Event('resize'));
         

});

var channel = pusher.subscribe('channel-mychannel');
  channel.bind('event-agent-disk-usage', function(data) {

  
        diskUsageUsed = Math.round(data["used"]/1024);
        diskUsageFree = Math.round(data["free"]/1024);
        chartDisk.updateSeries([diskUsageUsed, diskUsageFree])
        
     });
     

var channel = pusher.subscribe('channel-mychannel');
  channel.bind('event-agent-virtual-memory', function(data) {

      const agora = new Date();
        const tempoUnico = agora.toLocaleTimeString('pt-PT', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        ramData.push(Math.round(parseFloat(data["percent"])));
        ramLabels.push(tempoUnico);


chartRAM.updateOptions({
    series: [{
        name: 'RAM',
        data: ramData
    }],
    xaxis: {
      type: 'category',
        categories: ramLabels
    }
}, true, true); 

window.dispatchEvent(new Event('resize'));
        
     });


     var channel = pusher.subscribe('channel-mychannel');
  channel.bind('event-agent-cpu-frequency', function(data) {

         const currentFreq = parseFloat(data["current"]);
         const maxFreq = parseFloat(data["max"]);

        newCpuFrequency = Math.round(( currentFreq / maxFreq) * 100);
          chartCPUFreq.updateSeries([newCpuFrequency]);
        
     });

        var channel = pusher.subscribe('channel-mychannel');
  channel.bind('event-agent-avg-load', function(data) {

          const avg1min =  parseFloat(data["one"]).toFixed(2);
          const avg5min = parseFloat(data["five"]).toFixed(2);
          const avg15min = parseFloat(data["fifteen"]).toFixed(2);

         chartSysLoad.updateSeries([{
    name: 'Average System Load',
    data: [
        avg1min,
        avg5min,
        avg15min
    ]
}]);
        
     });


   var channel = pusher.subscribe('channel-mychannel');
  channel.bind('event-agent-cpu-times', function(data) {

          cpuTimesUser.textContent = data["user"];
          cpuTimesNice.textContent = data["nice"];
          cpuTimesSystem.textContent = data["system_time"];
          cpuTimesIdel.textContent = data["idle"];
          cpuTimesIowait.textContent = data["iowait"];
          cpuTimesIrq.textContent = data["irq"];
        
     });
     

      var channel = pusher.subscribe('channel-mychannel');
  channel.bind('event-agent-cpu-stats', function(data) {

          cpuStatsSwitches.textContent  = data["switches"];
          cpuStatsInterrupts.textContent  = data["interrupts"];
          cpuStatsSoftInterrupts.textContent = data["soft_interrupts"];
          cpuStatsSyscalls.textContent = data["syscalls"];
        
     });


       var channel = pusher.subscribe('channel-mychannel');
  channel.bind('event-agent-io-counters', function(data) {

        bytesSend.textContent = data["bytes_sent"];
        bytesRecv.textContent = data["bytes_recv"];
        packetsSend.textContent = data["packets_sent"];
        packetsRecv.textContent = data["packets_recv"];
        errin.textContent = data["errin"];
        errout.textContent = data["errout"];
        dropin.textContent = data["dropin"];
        dropout.textContent = data["dropout"];
        
     });
     

/*==================================================================================================================================================*/


