//WEB SERVER

const express = require('express');
const path = require('path')
const app = express();
const relais = require('./relais');
const fan = require('./fan.js');
const configEnvironment = 
{
    minTemp :  37.4,
    maxTemp : 37.9,
    minHum  : 52,
    maxHum  : 54
}

var forcedRelaisState = 2; //2= Auto, 1=On,0=Off
var forcedFanState = 2; //2= Auto, 1=On,0=Off
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

app.get('/status', function (req, res) {
    res.json({
        environment : {
            temperature: getCachedSensorReadings.getTemperature().toFixed(1),
            humidity: getCachedSensorReadings.getHumidity().toFixed(1),
            relais: relais.getStatus().toFixed(0),
            fan: fan.getStatus().toFixed(0)
        },
        configuration : {
            minTemperature : configEnvironment.minTemp,
            maxTemperature : configEnvironment.maxTemp,
            minHumidity : configEnvironment.minHum,
            maxHumidity : configEnvironment.maxHum,
            FanForcedStated : forcedFanState,
            relaisForcedState: forcedRelaisState
        }

    })
});


app.get('/relais', function (req, res) {    
    res.json({
        relais: relais.getStatus().toFixed(0)
    })
});


app.get('/relais/1', function (req, res) {
    forcedRelaisState = 1;
    relais.setStatus(1);     
    res.json({
        relais: relais.getStatus().toFixed(0)
    })
});

app.get('/relais/0', function (req, res) {
    forcedRelaisState = 0;
    relais.setStatus(0); 
    res.json({
        relais: relais.getStatus().toFixed(0)
    })
})

    app.get('/relais/2', function (req, res) {
        forcedRelaisState = 2;        
        res.json({
            relais: relais.getStatus().toFixed(0)
        })
    })



app.get('/fan', function (req, res) {        
    res.json({
        fan: fan.getStatus().toFixed(0)
    })
});
    


app.get('/fan/1', function (req, res) {
    forcedFanState = 1;
    fan.setStatus(1); 
    res.json({
        fan: fan.getStatus().toFixed(0)
    })
});


app.get('/fan/0', function (req, res) {
    forcedFanState = 0;
    fan.setStatus(0); 
    res.json({
        fan: relais.getStatus().toFixed(0)
    })
})

app.get('/fan/2', function (req, res) {
    forcedFanState = 2;        
    res.json({
        fan: relais.getStatus().toFixed(0)
    })    
});


app.listen(3000, function () {
    console.log('server is listening on port 3000 hoor');
});
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
    if (temp != null && temp >= configEnvironment.maxTemp) {
        console.log(" temp > "+ configEnvironment.maxTemp + " (bulb off) "+ temp )
        if (forcedRelaisState === 2 && relais.getStatus() === 1 ) { //if relais is On
            relais.setStatus(0);           //then swithc it off
        }
    }
    else if (temp != null && temp <= configEnvironment.minTemp){
        console.log(" temp < "+ configEnvironment.minTemp +" (bulb on) "+ temp )
        if (forcedRelaisState === 2 && relais.getStatus() === 0) { //if relais is Off
            relais.setStatus(1);           //then swithc it on
        }      
    }
    
    //CONTROL HUM
    if (hum != null && hum >= configEnvironment.maxHum) {
        console.log(" hum > "+ configEnvironment.maxHum +" (fan On) "+ hum )
        if (forcedFanState === 2 && fan.getStatus() === 0) { //if fan is On
            fan.setStatus(1);           //then swithc it off
        }
    }
    else if (hum != null && hum <= configEnvironment.minHum){
        console.log(" hum < "+ configEnvironment.minHum +" (fan off) "+ hum )
        if (forcedFanState === 2 && fan.getStatus() === 1) { //if fan is On
            fan.setStatus(0);           //then switch it off
        } 
    }       
}