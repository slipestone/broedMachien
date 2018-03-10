$(document).ready( () =>{

//CHART LOGIC
const temperatureCanvasCtx = 
document.getElementById('temperature-chart').getContext('2d')

const temperatureChartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: 'rgba(255, 205, 210, 0.5)'
    }]
  },
  options: {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 36,
          suggestedMax: 39
        }
      }]
    }
  }
}
const temperatureChart = new Chart(temperatureCanvasCtx, 
temperatureChartConfig)

const humidityCanvasCtx = 
document.getElementById('humidity-chart').getContext('2d')

const humidityChartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: 'rgba(197, 202, 233, 0.5)'
   }]
  },
  options: {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 45,
          suggestedMax: 65
        }
      }]
    }
  }
}
const humidityChart = new Chart(humidityCanvasCtx, 
 humidityChartConfig)

const pushData = (arr, value, maxLen) => {
  arr.push(value)
  if (arr.length > maxLen) {
    arr.shift()
  }
}

const humidityDisplay = 
document.getElementById('humidity-display')
const temperatureDisplay =    
document.getElementById('temperature-display')

const fetchTemperature = () => {
  fetch('/temperature')
    .then(results => {
      return results.json()
    })
    .then(data => {
      const now = new Date()
      const timeNow = now.getHours() + ':' + 
 now.getMinutes() + ':' + now.getSeconds()
      pushData(temperatureChartConfig.data.labels, 
timeNow, 50)
      pushData(temperatureChartConfig.data.datasets[0]
.data, data.value, 50)
      temperatureChart.update()
      temperatureDisplay.innerHTML = '<strong>' + 
data.value + '</strong>'
    })
}
//END CHART LOGIC





    //get temp async
    getTempAsync = () => {$.ajax({
        url: "/temperature",
        method: "GET",
        headers: {
            "accept":"application/json;odata=verbose",
        },
        success: function(data){            
            $('#temperature-display').text(data.value);

            //CHART
            const now = new Date()
            const timeNow = now.getHours() + ':' + 
       now.getMinutes() + ':' + now.getSeconds()
            pushData(temperatureChartConfig.data.labels, 
      timeNow, 90)
            pushData(temperatureChartConfig.data.datasets[0]
      .data, data.value, 90)
            temperatureChart.update()
            ///CHART

        },
        error: function (err){
            alert (err);
        }

    });
}

    getHumAsync = () => {$.ajax({
        url: "/humidity",
        method: "GET",
        headers: {
            "accept":"application/json;odata=verbose",
        },
        success: function(data){            
            $('#humidity-display').text(data.value);
            // CHART
            const now = new Date()
          const timeNow = now.getHours() + ':' + 
    now.getMinutes() + ':' + now.getSeconds()
          pushData(humidityChartConfig.data.labels, timeNow,
     90)
          pushData(humidityChartConfig.data.datasets[0].data,
     data.value, 90)
          humidityChart.update()
            // CHART
        },
        error: function (err){
            alert (err);
        }
    

    });
}


    setInterval(() => {
        getTempAsync()
       
      }, 60000)

      setInterval(() => {
        getHumAsync()
      }, 60000)
    
})

