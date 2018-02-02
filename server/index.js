//WEB SERVER

const express = require('express');
const path = require('path')
const app = express();
const relais = require('./relais');
//var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO 
// 
 
//const sensor = require('node-dht-sensor');
//const getSensorReadings = require('./get-sensor-readings')
const getCachedSensorReadings = require('./get-cached-sensor-readings');

app.use('/public', express.static(path.join(__dirname,
    'public')))

app.get('/temperature', function (req, res) {

    res.json({ 
        value: getCachedSensorReadings.getTemperature().toFixed(1) 
    })
});

app.get('/humidity', function (req, res) {
    res.json({
        value: 
    getCachedSensorReadings.getHumidity().toFixed(1)
      })
});



app.listen(3000, function () {
    console.log('server is listening on port 3000 hoor');
}) 
/*
const httpService = require('./httpService');
const getCachedSensorReadings = require('./get-cached-sensor-readings');

httpServer.start(2999);*/

//CONTROL LOGIC

setInterval(controlTemperature,1000);

relais.init(5)
setInterval(controlTemperature,1000);


function controlTemperature(){
    var temp = getCachedSensorReadings.getTemperature()
    if (temp > 38) {
        console.log(">38 relais is off ("+ temp+")" )
        if (relais.getStatus() === 1) { //if relais is On
            relais.setStatus(0);           //then swithc it off
        }
      

    }
    else if (temp <= 37){
        console.log("<= 37 relais is on ("+ temp+")" ) 
        if (relais.getStatus() === 0) { //if relais is On
            relais.getStatus(1);           //then swithc it off
        }
      
    }    
        
}