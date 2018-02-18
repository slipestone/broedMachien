var Gpio = require('onoff').Gpio; //include onoff to interact with the GPI 
var _gpio;



const Relais = {

    init: _init,
    testRelais  : _testRelais,
    getStatus : _getStatus,
    setStatus : _setStatus
}


module.exports = Relais

function _init(gpioPin) {
    _gpio = new Gpio(gpioPin, 'out'); //use GPIO pin 4, and specify that it is output
}

function _testRelais(){

    
        if (_getStatus() === 1) { //if relais is On
            _setStatus(0);           //then swithc it off
        }
        else {
            _setStatus(1);
        }
    
}

function _getStatus() {
 return _gpio.readSync();

}

function _setStatus (status) {
    _gpio.writeSync(status);
}