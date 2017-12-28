const express = require('express');
const app = express();
const sensor = require('node-dht-sensor');


app.get('/temperature', function (req, res) {
    sensor.read(11, 4, function (err, temperature,
        humidity) {
        if (err) {
            console.error(err);
        }
        res.send(temperature.toFixed(1) + '°C');
    });
});

app.get('/humidity', function (req, res) {
    sensor.read(11, 4, function (err, temperature,
        humidity) {
        if (!err) {
            res.send(humidity.toFixed(1) + '%');

        }
    });
});

app.listen(3000, function () {
    console.log('server is listening on port 3000');
})

