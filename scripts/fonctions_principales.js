/* Fonctions Principales */

// Requête à l'API openweathermap.org
function weatherRequest(url) {
        $.ajax({
            url : url,
            dataType : "json",
            success: function (json) { 
                let city = json.name;
                let showDateTimeValue = timeZone(json);
                if(city === 'Moscou')
                {
                    $('.results').html(`🌎 Position : <a href='https://www.google.com/maps/place/${city}/' class="yellow-color" target="_blank">${city}, RU</a><br>⏰ Date et heure : ${showDateTimeValue}<br>☁️ Météo : ${capitalize(json.weather[0].description)}<br> 🌡️ Température : ${json.main.temp} °C<br> 💧 Humidité : ${json.main.humidity}% <br> <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"/>`); 
                    $("#cityName, #submitWeatherRequest").click(function() {
                        document.location.replace("../../views/function-views/weatherRequest.php");
                    });
                }
                else
                {
                    $('.results').html(`🌎 Position : <a href='https://www.google.com/maps/place/${city}/' class="yellow-color" target="_blank">${city}, ${json.sys.country}</a><br>⏰ Date et heure : ${showDateTimeValue}<br>☁️ Météo : ${capitalize(json.weather[0].description)}<br> 🌡️ Température : ${json.main.temp} °C<br> 💧 Humidité : ${json.main.humidity}% <br> <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"/>`); 
                    $("#cityName, #submitWeatherRequest").click(function() {
                        document.location.replace("../../views/function-views/weatherRequest.php");
                    });
                }
            },
            statusCode: {
                404: function() { 
                    document.location.replace("../error404Weather");
                }
            }
        });
}

// Génère un nombre aléatoire entre un minimum inclus et un maximum inclus 
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (!isNaN(min) && !isNaN(max) && min < max)
    {
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    else {
        return null;
    }
}

// Calcule l'âge de quelqu'un selon la date de naissance
function calculateAge(birthDateEntered) {

    // Les variables de la fonction
    let birthDateDay = parseInt(birthDateEntered[0] + birthDateEntered[1]);
    let birthDateMonth = parseInt((birthDateEntered[3] + birthDateEntered[4]) - 1);
    let birthDateYear = parseInt(birthDateEntered[6] + birthDateEntered[7] + birthDateEntered[8] + birthDateEntered[9]);
    dateTimeUTC('0');
    day = parseInt(day)
    month = parseInt(month - 1);
    year = parseInt(year);

    let dateNow = moment([year, month, day]);
    let birthDate = moment([birthDateYear, birthDateMonth, birthDateDay]);

    // Calcule l'âge - Moment.js
    let ageYears = dateNow.diff(birthDate, 'year');
    birthDate.add(ageYears, 'years');
    
    let ageMonths = dateNow.diff(birthDate, 'months');
    birthDate.add(ageMonths, 'months');
    
    let ageDays = dateNow.diff(birthDate, 'days');

    let isValidDateFunction = isValidDate(birthDateDay + '/' + birthDateMonth + '/' + birthDateYear); 

    // Vérifie si la valeur entrée correspond à une date de naissance valide
    if(isValidDateFunction === true)
    {
        // Si c'est ton anniversaire aujourd'hui
        if(birthDateDay === parseInt(day) && (parseInt(birthDateMonth) + 1) === parseInt(month))
        {
            return 'Vous avez ' + ageYears + ' ans. Joyeux Anniversaire! 🥳';
        }
        else
        {
            return 'Vous avez ' + ageYears + ' ans, ' + ageMonths + ' mois et ' + ageDays + ' jour(s).';
        }
    }
    else 
    {
        return messageError;
    }
}

// Convertis des °C en °F et l'inverse aussi
function convertTemperature(degree, unit) {
    if (!isNaN(degree) && unit === "°C") 
    {
        const temperatureValue = ((degree * 9/5) + 32) + " °F";
        return temperatureValue;
    }
    else if (!isNaN(degree) && unit === "°F")
    {
        const temperatureValue = (degree - 32) * 5/9 + " °C";
        return temperatureValue;
    }
    else 
    {
        return messageError; 
    }
}

// Convertis la longueur (distance) avec les unités allant de picomètre au Téramètre
function convertDistance (firstValue, unitFirstValue, unitFinalValue) {

    let reference = ["pm",null,null,"nm",null,null,"µm",null,null,"mm","cm","dm","m","dam","hm","km",null,null,"Mm",null,null,"Gm",null,null,"Tm"];
    let index1 = reference.indexOf(unitFirstValue); 
    let index2 = reference.indexOf(unitFinalValue);

    // Condition qui vérifie si les valeurs entrées sont justes
    if (!isNaN(firstValue) && typeof unitFirstValue === 'string' && typeof unitFinalValue === 'string' && (index1.toString() && index2.toString()) != '-1')
    {
        // Conversion des longueurs : 
        let difference = index1 - index2; 
        let result = firstValue*Math.pow(10,difference);
        let response = 'Conversion de longueur : ' + formatNumberResult(firstValue).toString() + ' ' + unitFirstValue + ' = ' + formatNumberResult(result) + ' ' + unitFinalValue;
        return response;
    }
    else
    {
        return messageError;
    }
}

// Affiche uniquement les prénoms (qui sont dans la liste) qui commence par la lettre souhaitée
function filterStudents(filteredLetter, students)
{
    let filteredStudents = [];
    for(let i = 0; i < students.length; i++)
    {
        let studentBoucle = capitalize(students[i]);
        if (studentBoucle[0] === filteredLetter) {
            filteredStudents.push(studentBoucle);
        }
    }
    if (filteredStudents.length === 1)
    {
        return ("Prénom qui commence par " + filteredLetter + " : " + filteredStudents + '.');
    }
    else if (filteredStudents.length >= 2)
    {
        // Affiche la liste des prénoms...
        let last = filteredStudents[filteredStudents.length - 1]; // Accéde au dernier élément du tableau
        let totalfilteredLetterStudents = filteredStudents.length;
        filteredStudents.pop(); // Supprime le dernier élément du tableau
        // filteredStudents.join(', ') permet de rajouter un espace entre chaque élément du tableau
        return ("Prénoms qui commence par " + filteredLetter + " (" + totalfilteredLetterStudents + ") : " + filteredStudents.join(', ') + ' et ' + last + '.');
    }
    else
    {
        return ("Il n'y a pas de prénom commencant par " + filteredLetter + ".");
    }
}

// Génère aléatoirement une citation ou un proverbe
function getRandomQuote() {
    let randomNbr = randomNumber(0, (quotes.length - 1));
    let randomQuotes = quotes[randomNbr];
    return  '" ' + randomQuotes["quote"] + ' " <br> <br> - ' + randomQuotes["source"];
}

// Convertis une valeur dans une devise dans une autre devise
function convertCurrency(value, currency, url) {
    $.ajax({
        url : url,
        dataType : "json",
        success: function (jsonFixer) { 
            switch(currency) {
                case '£':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.GBP) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case '$ Américain':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.USD) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case '$ Canadien':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.CAD) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case '$ Australien':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.AUD) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case '$ Mexicain':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.MXN) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case 'CHF':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.CHF) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case '₽':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.RUB) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case 'R$':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.BRL) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case '¥':
                    $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(jsonFixer.rates.JPY) * value)).toFixed(2) + ' ' + currency);
                    $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    break;
                case '€':
                    let rateEUR = jsonFixer.rates.EUR;
                    if (isNaN(rateEUR)) {
                        $('.results').html(formatNumberResult(value) + ' €');
                    } else {
                        $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + ((parseFloat(rateEUR) * value)).toFixed(2) + ' ' + currency);
                        $('.rateDate').html("Dernier rafraîchissement du taux d'échange : " + jsonFixer.date);
                    }
                    break;
                default:
                    $('.results').html(formatNumberResult(value) + ' €');
                    break;
            }
        },
        statusCode: {
            404: function() { 
                document.location.replace("../404.php");
            }
        }
    });
}

// Convertis du texte (encodé en UTF-8) en binaire et l'inverse aussi (source : http://jsfiddle.net/47zwb41o)
// UTF-8 vers Binaire
function utf8ToBin(s) {
    try {
        s = unescape( encodeURIComponent(s));
        var chr, i = 0, l = s.length, out = '';
        for( ; i < l; i ++ ){
            chr = s.charCodeAt( i ).toString(2);
            while(chr.length % 8 != 0 ){ chr = '0' + chr; }
            out += chr;
        }
        return out;
    } catch (error) {
        return s;
    }
}
// Binaire vers UTF-8
function binToUtf8(s){
    try {
        var i = 0, l = s.length, chr, out = '';
        for( ; i < l; i += 8){
            chr = parseInt( s.substr(i, 8 ), 2).toString(16);
            out += '%' + ((chr.length % 2 == 0) ? chr : '0' + chr);
        }
        return decodeURIComponent(out);
    } catch (error) {
        return s;
    }
}

// Convertis un nombre arabe en nombre romain
function convertArabicToRoman(nombre) {
    // Tableau contenant chaque correspondance entre un nombre arabe et un nombre romain
    const correspondances = 
    [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];

    // Initialisation de la variable qui va contenir le résultat de la conversion
    let chiffresRomains = "";

    /* 
        Étapes pour écrire un nombre romain :

        On vérifie quand le nombre arabe est >= à la plus grande valeur possible dans la table de correspondance des nombres romains de haut en bas puis on rajoute la lettre romaine correspondante à la plus grande valeur possible dans la variable chiffresRomains et on soustrait la valeur du chiffre romain qu'on vient d'ajouter au nombre arabe puis on répète l'opération jusqu'à nombre arabe vaut 0...

            Exemple avec 27 :
                27 - X (10) = 17
                17 - X (10) = 7
                7 - V (5) = 2
                2 - I (1) = 1
                1 - I (1) = 0
                XXVII
    */

    function extraireChiffreRomain(valeurLettre, lettres) {
        while (nombre >= valeurLettre) {
            chiffresRomains = chiffresRomains + lettres;
            nombre = nombre - valeurLettre;
        }
    }

    correspondances.forEach(correspondance => {
        extraireChiffreRomain(correspondance[0], correspondance[1]);
    })

    return chiffresRomains;
}

// Convertis un nombre romain en nombre arabe
function convertRomanToArabic(str) {
    var result = 0;
    // the result is now a number, not a string
    var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
    for (var i = 0;i<=decimal.length;i++) {
      while (str.indexOf(roman[i]) === 0){
      //checking for the first characters in the string
        result += decimal[i];
        //adding the decimal value to our result counter
        str = str.replace(roman[i],'');
        //remove the matched Roman letter from the beginning
      }
    }
    return result;
}

// Vérifie si un nombre fait partie des nombres d'Armstrong ou non 
function armstrongNumber(number) {
    let nombreString = number.toString();
    let nombreStringLength = nombreString.length;

    let result = 0;
    let resultString = "";
    for (let i = 0; i < nombreStringLength; i++) {
        result = result + parseInt(nombreString[i])**nombreStringLength;
        resultString = resultString + " + " + nombreString[i] + "<sup>" + nombreStringLength + "</sup>";
    }

    if (result === nombre) {
        return `${formatNumberResult(nombre)} est un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`;
    } else {
        return `${formatNumberResult(nombre)} n'est pas un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`;
    }
}