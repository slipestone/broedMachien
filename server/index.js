//WEB SERVER

const express = require('express');
const path = require('path')
const app = express();
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO 
var relais = new Gpio(2, 'out'); //use GPIO pin 4, and specify that it is output 
 
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

setInterval(controlTemperature,5000)


function controlTemperature(){
    var temp = getCachedSensorReadings.getTemperature()
    if (temp > 22) {
        console.log(">22 relais is off ("+ temp+")" )
        if (relais.readSync() === 1) { //if relais is On
            relais.writeSync(0);           //then swithc it off
        }
      

    }
    else if (temp < 21){
        console.log("< 21 relais is on ("+ temp+")" ) 
        if (relais.readSync() === 0) { //if relais is On
            relais.writeSync(1);           //then swithc it off
        }
      
    }    
        
}