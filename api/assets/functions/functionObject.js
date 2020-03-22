const { randomNumberOutput }                                     = require('./main/randomNumber');
const { convertArabicToRomanOutput, convertRomanToArabicOutput } = require('./main/convertRomanArabicNumbers');
const { convertDistanceOutput }                                  = require('./main/convertDistance');
const { convertTemperatureOutput }                               = require('./main/convertTemperature');
const { armstrongNumberOutput }                                  = require('./main/armstrongNumber');
const { weatherRequestOutput }                                   = require('./main/weatherRequest');
const { convertCurrencyOutput }                                  = require('./main/convertCurrency');
const { calculateAgeOutput }                                     = require('./main/calculateAge');
const { heapAlgorithmOutput }                                    = require('./main/heapAlgorithm');
const { convertEncodingOutput }                                  = require('./main/convertEncoding');

const functionObject = {
    randomNumber        : randomNumberOutput,
    convertArabicToRoman: convertArabicToRomanOutput,
    convertRomanToArabic: convertRomanToArabicOutput,
    convertDistance     : convertDistanceOutput,
    convertTemperature  : convertTemperatureOutput,
    armstrongNumber     : armstrongNumberOutput,
    weatherRequest      : weatherRequestOutput,
    convertCurrency     : convertCurrencyOutput,
    calculateAge        : calculateAgeOutput,
    heapAlgorithm       : heapAlgorithmOutput,
    convertEncoding     : convertEncodingOutput
};

// Choisi la fonction à exécuter
function functionToExecute(option) {
    return functionObject[option];
}

module.exports = functionToExecute;