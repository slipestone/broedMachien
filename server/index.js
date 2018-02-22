//WEB SERVER

const express = require('express');
const path = require('path')
const app = express();
const relais = require('./relais');

const getCachedSensorReadings = require('./get-cached-sensor-readings');

relais.init(5); //init relais on port 5

app.use('/public', express.static(path.join(__dirname,
    'public')))

app.get('/temperature', function (req, res) {

    res.json({ 
        value: getCachedSensorReadings.getTemperature().toFixed(1) 
    })
});

app.get('/humidity', function (req, res) {
    res.json({
        value: getCachedSensorReadings.getHumidity().toFixed(1)
      })
});

app.get('/all', function (req, res) {
    res.json({
        temperature: getCachedSensorReadings.getTemperature().toFixed(1),
        humidity: getCachedSensorReadings.getHumidity().toFixed(1)
    })
});


app.get('/relaisOn', function (req, res) {
    relais.setStatus(1); 
    res.json({
        relais: relais.getStatus().toFixed(0)
    })
});

app.get('/relaisOff', function (req, res) {
    relais.setStatus(0); 
    res.json({
        relais: relais.getStatus().toFixed(0)
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

//setInterval(controlTemperature,1000);

setInterval(controlTemperature,1000);


function controlTemperature(){

    var temp = getCachedSensorReadings.getTemperature()
    if (temp != null && temp >= 37.9) {
        console.log(" temp: "+ temp+")" )
        if (relais.getStatus() === 1) { //if relais is On
            relais.setStatus(0);           //then swithc it off
        }
      

    }
    else if (temp <= 37.4){
        console.log("<= 37 relais is on ("+ temp+")" ) 
        if (relais.getStatus() === 0) { //if relais is On
            relais.setStatus(1);           //then swithc it off
        }
      
    }    
        
}