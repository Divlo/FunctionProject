const { randomNumberOutput } = require('./main/randomNumber')
const convertRomanArabicNumbersOutput = require('./main/convertRomanArabicNumbers')
const convertDistanceOutput = require('./main/convertDistance')
const convertTemperatureOutput = require('./main/convertTemperature')
const armstrongNumberOutput = require('./main/armstrongNumber')
const weatherRequestOutput = require('./main/weatherRequest')
const convertCurrencyOutput = require('./main/convertCurrency')
const calculateAgeOutput = require('./main/calculateAge')
const heapAlgorithmOutput = require('./main/heapAlgorithm')
const convertEncodingOutput = require('./main/convertEncoding')
const randomQuote = require('./main/randomQuote')
const rightPriceOutput = require('./main/rightPrice')
const isPalindromeOutput = require('./main/isPalindrome')
const findLongestWordOutput = require('./main/findLongestWord')
const fibonacciOutput = require('./main/fibonacci')
const sortArrayOutput = require('./main/sortArray')

const functionObject = {
  randomNumber: randomNumberOutput,
  convertRomanArabicNumbers: convertRomanArabicNumbersOutput,
  convertDistance: convertDistanceOutput,
  convertTemperature: convertTemperatureOutput,
  armstrongNumber: armstrongNumberOutput,
  weatherRequest: weatherRequestOutput,
  convertCurrency: convertCurrencyOutput,
  calculateAge: calculateAgeOutput,
  heapAlgorithm: heapAlgorithmOutput,
  convertEncoding: convertEncodingOutput,
  randomQuote: randomQuote,
  rightPrice: rightPriceOutput,
  isPalindrome: isPalindromeOutput,
  findLongestWord: findLongestWordOutput,
  fibonacci: fibonacciOutput,
  sortArray: sortArrayOutput
}

// Choisi la fonction à exécuter
function functionToExecute (option) {
  return functionObject[option]
}

module.exports = functionToExecute
