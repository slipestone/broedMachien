const express = require('express');
const path = require('path')
const app = express();
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
    console.log('server is listening on port 3000');
})

