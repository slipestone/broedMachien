//WEB SERVER

const express = require('express');
const path = require('path')
const app = express();
const relais = require('./relais');
const fan = require('./fan.js');

const getCachedSensorReadings = require('./get-cached-sensor-readings');

relais.init(5); //init relais on port 5
fan.init(20); //init relais on port 5

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


app.get('/relais', function (req, res) {    
    res.json({
        relais: relais.getStatus().toFixed(0)
    })
});


app.get('/relais/1', function (req, res) {
    relais.setStatus(1); 
    res.json({
        relais: relais.getStatus().toFixed(0)
    })
});

app.get('/relais/0', function (req, res) {
    relais.setStatus(0); 
    res.json({
        relais: relais.getStatus().toFixed(0)
    })

    app.get('/fan', function (req, res) {        
        res.json({
            fan: fan.getStatus().toFixed(0)
        })
    });
    


app.get('/fan/1', function (req, res) {
    fan.setStatus(1); 
    res.json({
        fan: fan.getStatus().toFixed(0)
    })
});

app.get('/fan/0', function (req, res) {
    fan.setStatus(0); 
    res.json({
        fan: relais.getStatus().toFixed(0)
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

setInterval(controlEnvironment,1000);


function controlEnvironment(){

    var temp = getCachedSensorReadings.getTemperature()
    var hum = getCachedSensorReadings.getHumidity()
    //CONTROL TEMP
    if (temp != null && temp >= 37.9) {
        console.log(" temp > 37.9 (bulb off) "+ temp )
        if (relais.getStatus() === 1) { //if relais is On
            relais.setStatus(0);           //then swithc it off
        }
    }
    else if (temp != null && temp <= 37.4){
        console.log(" temp < 37.4 (bulb on) "+ temp )
        if (relais.getStatus() === 0) { //if relais is Off
            relais.setStatus(1);           //then swithc it on
        }      
    }
    
    //CONTROL HUM
    if (hum != null && hum >= 49) {
        console.log(" hum > 49 (fan On) "+ hum )
        if (fan.getStatus() === 0) { //if fan is On
            fan.setStatus(1);           //then swithc it off
        }
    }
    else if (hum != null && hum <= 47){
        console.log(" hum <47 (fan off) "+ hum )
        if (fan.getStatus() === 1) { //if fan is On
            fan.setStatus(0);           //then switch it off
        }
      
    }
        
}