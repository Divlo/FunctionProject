const { randomNumberOutput }                                     = require('./main/randomNumber');
const { convertArabicToRomanOutput, convertRomanToArabicOutput } = require('./main/convertRomanArabicNumbers');
const { convertDistanceOutput }                                  = require('./main/convertDistance');
const { convertTemperatureOutput }                               = require('./main/convertTemperature');
const { armstrongNumberOutput }                                  = require('./main/armstrongNumber');

const functionObject = {
    randomNumber        : randomNumberOutput,
    convertArabicToRoman: convertArabicToRomanOutput,
    convertRomanToArabic: convertRomanToArabicOutput,
    convertDistance     : convertDistanceOutput,
    convertTemperature  : convertTemperatureOutput,
    armstrongNumber     : armstrongNumberOutput
};

// Choisi la fonction à exécuter
function functionToExecute(option) {
    return functionObject[option];
}

module.exports = functionToExecute;