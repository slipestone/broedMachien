
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPI 
var _gpio;


const Fan = {

    init: _init,
    testfan  : _testFan,
    getStatus : _getStatus,
    setStatus : _setStatus
}
module.exports = Relais



function _init(gpioPin) {
    _gpio = new Gpio(gpioPin, 'out'); //use GPIO pin 17, and specify that it is output
}

function _testFan(){

    
        if (_getStatus() === 1) { //if fan is On
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