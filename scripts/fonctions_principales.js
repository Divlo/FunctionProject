/* Fonctions Principales */

/** 
 * @function weatherRequest
 * @description Affiche la météo et l'heure locale grâce à l'API : openweathermap.org.
 * Le nom de la ville se récupère en Javascript qui créé un cookie pour récupérer cette variable en php. 
 * Ainsi PHP va récupérer le JSON de l'api openweathermap.org puis ajax va se charger d'afficher le résultat.
 * Plus d'informations : {@link /scripts/main.js} et {@link /php/getWeatherJson.php}
 * @requires {@link fonctions_annexes.js: formatNumberResult, dateTimeUTC, showDateTime, capitalize} 
 * @see {@link https://jquery.com/} Requête en AJAX avec jQuery
 * @see {@link https://openweathermap.org/} API de météo
 * @example  
 * Ajoute au DOM de la page dans la div .results, la météo de la ville demandée.
 */ 
function weatherRequest() {
    $.ajax({
        url: '/php/getWeatherJson.php', 
        type: "POST",
            success: function(data) {
                try {
                    const json = jQuery.parseJSON(data);
                    const city = json.name;
                    const showDateTimeValue = dateTimeUTC((json.timezone / 60 / 60).toString()).showDateTimeValue;
                
                    $('.results').html(`🌎 Position : <a href='https://www.google.com/maps/search/?api=1&query=${json.coord.lat},${json.coord.lon}' class="yellow-color" target="_blank">${city}, ${json.sys.country}</a><br>⏰ Date et heure : ${showDateTimeValue}<br>☁️ Météo : ${capitalize(json.weather[0].description)}<br> 🌡️ Température : ${json.main.temp} °C<br> 💧 Humidité : ${json.main.humidity}% <br> <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"/>`); 
                }
                catch(error) {
                    $('.results').html("La ville que vous avez rentré n'existe pas (dans l'API).");
                }
            }
        });
}

/** 
 * @function randomNumber
 * @description Génère un nombre aléatoire entre un minimum inclus et un maximum inclus. 
 * @param {number} min Nombre Minimum 
 * @param {number} max Nombre Maximum 
 * @returns {number} Nombre aléatoire 
 * @example randomNumber(1, 2) → retourne soit 1 ou 2
 */ 
function randomNumber(min, max) {
    if (!isNaN(min) && !isNaN(max)) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    else {
        return messageError;
    }
} 

/** 
 * @function calculateAge
 * @description Calcule l'âge de quelqu'un selon ça date de naissance.
 * @requires {@link fonctions_annexes.js: formatNumberResult, isValidDate} 
 * @requires {@link "external:moment.js"}
 * @see {@link https://momentjs.com/}
 * @param {string} birthDateEntered - Date de naissance (dd/mm/yyyy)
 * @returns {string} - L'âge en jours, mois et années
 * @example calculateAge('31/03/2003')
 */ 
function calculateAge(birthDateEntered) {
    // Les variables de la fonction
    const birthDateDay = parseInt(birthDateEntered.substring(0, 2));
    const birthDateMonth = parseInt((birthDateEntered.substring(3, 5)) - 1);
    const birthDateYear = parseInt(birthDateEntered.substring(6, 10));
    const currentDateObject = dateTimeUTC('0');
    const day = parseInt(currentDateObject.day);
    const month = parseInt(currentDateObject.month - 1);
    const year = parseInt(currentDateObject.year);

    let dateNow = moment([year, month, day]);
    let birthDate = moment([birthDateYear, birthDateMonth, birthDateDay]);

    // Calcule l'âge - Moment.js
    let ageYears = dateNow.diff(birthDate, 'year');
    birthDate.add(ageYears, 'years');
    let ageMonths = dateNow.diff(birthDate, 'months');
    birthDate.add(ageMonths, 'months');
    let ageDays = dateNow.diff(birthDate, 'days');

    const isValidDateFunction = isValidDate(birthDateDay + '/' + birthDateMonth + '/' + birthDateYear, currentDateObject.showDateTimeValue); 

    // Vérifie si la valeur entrée correspond à une date de naissance valide
    if(isValidDateFunction === true && !isNaN(ageDays)) {
        ageYears = formatNumberResult(ageYears);
        // Si c'est ton anniversaire aujourd'hui
        if(birthDateDay === day && parseInt(birthDateMonth) === month) {
            return 'Vous avez ' + ageYears + ' ans. Joyeux Anniversaire! 🥳';
        }
        else {
            return 'Vous avez ' + ageYears + ' ans, ' + ageMonths + ' mois et ' + ageDays + ' jour(s).';
        }
    }
    else {
        return messageError;
    }  
} 

/** 
 * @function convertTemperature
 * @description Convertis des °C en °F et l'inverse aussi.
 * @param {number} degree - Nombre de degrès
 * @param {string} unit - Unité du nombre (°C ou °F)
 * @returns {string} - degree unit = temperatureValue
 * @example convertTemperature(23, '°C') → 23 °C = 73.4 °F
 */
function convertTemperature(degree, unit) {
    if (!isNaN(degree) && unit === "°C") {
        const temperatureValue = ((degree * 9/5) + 32) + " °F";
        return degree + " " + unit + " = " + temperatureValue;
    }
    else if (!isNaN(degree) && unit === "°F") {
        const temperatureValue = (degree - 32) * 5/9 + " °C";
        return degree + " " + unit + " = " + temperatureValue;
    }
    else {
        return messageError; 
    }
} 

/** 
 * @function convertDistance
 * @description Convertis la longueur (distance) avec les unités allant de picomètre au Téramètre.
 * @param {number} firstValue - Le nombre que vous voulez convertir
 * @param {string} unitFirstValue - L'unité du nombre que vous voulez convertir
 * @param {string} unitFinalValue -  L'unité de votre nombre après la conversion
 * @returns {string} - Conversion de longueur : firstValue unitFirstValue = result
 * @example convertDistance(500, 'cm', 'm') → Conversion de longueur : 500 cm = 5 m
 */
function convertDistance (firstValue, unitFirstValue, unitFinalValue) {

    const reference = ["pm",null,null,"nm",null,null,"µm",null,null,"mm","cm","dm","m","dam","hm","km",null,null,"Mm",null,null,"Gm",null,null,"Tm"];
    const index1 = reference.indexOf(unitFirstValue); 
    const index2 = reference.indexOf(unitFinalValue);

    // Condition qui vérifie si les valeurs entrées sont justes
    if (!isNaN(firstValue) && typeof unitFirstValue === 'string' && typeof unitFinalValue === 'string' && (index1.toString() && index2.toString()) != '-1') {
        // Conversion des longueurs : 
        const difference = index1 - index2; 
        const result = firstValue*Math.pow(10,difference);
        return 'Conversion de longueur : ' + formatNumberResult(firstValue).toString() + ' ' + unitFirstValue + ' = ' + formatNumberResult(result) + ' ' + unitFinalValue;
    }
    else {
        return messageError;
    }
} 

/** 
 * @function filterStudents
 * @description Affiche uniquement les prénoms (qui sont dans la liste) qui commencent par la lettre souhaitée.
 * @param {string} filteredLetter - La lettre à filtré
 * @param {array} students - La liste des prénoms
 * @returns {string} - Prénoms qui commence par filteredLetter (totalfilteredLetterStudents) : filteredStudents
 * @example filterStudents('P', ['Prénom1', 'Prénom2', 'Divlo']) → Prénoms qui commence par P (2) : Prénom1 et Prénom2.
 */
function filterStudents(filteredLetter, students)
{
    let filteredStudents = [];
    for(let i = 0; i < students.length; i++) {
        let studentBoucle = capitalize(students[i]);
        if (studentBoucle[0] === filteredLetter) {
            filteredStudents.push(studentBoucle);
        }
    }
    if (filteredStudents.length === 1) {
        return ("Prénom qui commence par " + filteredLetter + " : " + filteredStudents + '.');
    }
    else if (filteredStudents.length >= 2) {
        // Affiche la liste des prénoms...
        const last = filteredStudents[filteredStudents.length - 1]; // Accéde au dernier élément du tableau
        const totalfilteredLetterStudents = filteredStudents.length;
        filteredStudents.pop(); // Supprime le dernier élément du tableau
        // filteredStudents.join(', ') permet de rajouter un espace entre chaque élément du tableau
        return ("Prénoms qui commence par " + filteredLetter + " (" + totalfilteredLetterStudents + ") : " + filteredStudents.join(', ') + ' et ' + last + '.');
    }
    else {
        return ("Il n'y a pas de prénom commencant par " + filteredLetter + ".");
    }
} 

/** 
 * @function getRandomQuote
 * @description Génère aléatoirement une citation ou un proverbe.
 * @requires {@link variables.js: quotes}
 * @requires {@link fonctions_principales.js: randomNumber}
 * @returns {object} - une citation au hasard à partir de la constante 'quotes' dans variables.js
 * @example getRandomQuote() → { quote: "Ne fais jamais rien contre ta conscience, même si l'Etat te le demande.", source: "Albert Einstein" }
 */
function getRandomQuote() {
    return quotes[randomNumber(0, (quotes.length - 1))];
} 

/** 
 * @function convertCurrency
 * @description Convertis une valeur dans une devise dans une autre devise grâce à l'API exchangeratesapi.io.
 * @requires {@link fonctions_annexes.js: formatNumberResult} 
 * @requires {@link variables.js: correspondancesMonnaie}
 * @see {@link https://jquery.com/} Requête en AJAX avec jQuery
 * @see {@link https://api.exchangeratesapi.io/} API de taux de change
 * @param {number} value - la valeur à convertir
 * @param {string} currency - la devise à avoir après conversion
 * @param {string} url - l'url de la requête à l'API en fonction du paramètre dans l'url '?base='
 * @example convertCurrency(50, "$ Américain", "https://api.exchangeratesapi.io/latest?base=EUR") 
 * Ajoute au DOM de la page dans la div .results et .rateDate :
 * 50 EUR = 55.17 $ Américain
 * Dernier rafraîchissement du taux d'échange : 08/11/2019
 */ 
function convertCurrency(value, currency, url) {
    function currencyTest(currencyToTest) {
      for (let index in correspondancesMonnaie) {
        if(currencyToTest === correspondancesMonnaie[index]['currency']) {
          return correspondancesMonnaie[index]['symbol'];
        }
        continue;
      }
    }
    $.ajax({
        url : url,
        dataType : "json",
        success: function (jsonFixer) { 
            try {
              let currencySymboleAPI = eval(`jsonFixer.rates.${currencyTest(currency)}`);
              if (currencySymboleAPI === undefined) {
                currencySymboleAPI = 1;
              } 
              $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + formatNumberResult((currencySymboleAPI * value).toFixed(2)) + ' ' + currency);
              $('.rateDate').html(`Dernier rafraîchissement du taux d'échange : ${jsonFixer.date[8] + jsonFixer.date[9]}/${jsonFixer.date[5] + jsonFixer.date[6]}/${jsonFixer.date[0] + jsonFixer.date[1] + jsonFixer.date[2] + jsonFixer.date[3]}`);
            } 
            catch (error) {
                $('.results').html(messageError);
            }
        }
    });
}

// Convertis des nombres de différentes bases et convertis en UTF-8. (source : http://jsfiddle.net/47zwb41o)
/** 
 * @function decimalToBinary
 * @description Convertis un nombre décimal en binaire.
 * @param {string} value - Le nombre à convertir en string
 * @returns {string} - Le nombre en binaire
 * @example decimalToBinary('2') → '10'
 */
function decimalToBinary(value) {
    value = value.replace(" ", "");
    value = Number(value);
    if (isNaN(value)) {
        return messageError;
    } else {
        return value.toString(2);
    }
} 

/** 
 * @function binaryToDecimal
 * @description Convertis un nombre binaire en décimal.
 * @requires {@link fonctions_annexes.js: formatNumberResult} 
 * @param {string} value - Le nombre à convertir
 * @returns {(number|string)} - Le nombre en décimal soit en nombre ou soit en string si supérieur à 1000 car pour 1000 par exemple formatNumberResult renvoie '1 000'
 * @example binaryToDecimal('10') → 2
 */
function binaryToDecimal(value) {
    const result = parseInt(Number(value), 2);
    if (isNaN(result)) {
        return messageError;
    } else {
        return formatNumberResult(result);
    }
} 

/** 
 * @function decimalToHexadecimal
 * @description Convertis un nombre décimal en hexadécimal.
 * @param {string} value - Le nombre à convertir 
 * @returns {string} - Le nombre en hexadécimal
 * @example decimalToHexadecimal('15') → 'F'
 */
function decimalToHexadecimal(value) {
    value = value.replace(" ", "");
    value = Number(value);
    if (isNaN(value)) {
        return messageError;
    } else {
        return value.toString(16).toUpperCase();
    }
} 

/** 
 * @function hexadecimalToDecimal
 * @description Convertis un nombre hexadécimal en décimal.
 * @requires {@link fonctions_annexes.js: formatNumberResult} 
 * @param {string} value - Le nombre à convertir
 * @returns {(number|string)} - Le nombre en décimal soit en nombre ou soit en string si supérieur à 1000 car pour 1000 par exemple formatNumberResult renvoie '1 000'
 * @example hexadecimalToDecimal('F') → 15
 */
function hexadecimalToDecimal(value) {
    const result = parseInt(value, 16);
    if (isNaN(result)) {
        return messageError;
    } else {
        return formatNumberResult(result);
    }
} 

/** 
 * @function binaryToHexadecimal
 * @description Convertis un nombre binaire en hexadécimal. 
 * @param {string} value - Le nombre à convertir
 * @returns {string} - Le nombre en hexadécimal
 * @example binaryToHexadecimal('1111') → 'F'
 */ 
function binaryToHexadecimal(value) {
    value = Number(value);
    value = parseInt(value, 2);
    if (isNaN(value)) {
        return messageError;
    } else {
        return parseInt(value).toString(16).toUpperCase();
    }   
}

/** 
 * @function hexadecimalToBinary
 * @description Convertis un nombre hexadécimal en binaire. 
 * @param {string} value - Le nombre à convertir
 * @returns {string} - Le nombre en binaire
 * @example hexadecimalToBinary('F') → '1111'
 */ 
function hexadecimalToBinary(value) {
    value = parseInt(value, 16);
    if (isNaN(value)) {
        return messageError;
    } else {
        return parseInt(value).toString(2);
    }
} 

/** 
 * @function textToNumberUnicode
 * @description Convertis chaque caractère d'une string en codePoint Unicode. 
 * @param {string} value - La chaîne de caractère à convertir
 * @returns {string}
 * @example textToNumberUnicode('abc') → '97 98 99'
 */ 
function textToNumberUnicode(string) {
    try {
        let resultat = "";
        for (let index in string) {
          resultat = resultat + string.codePointAt(index) + " ";
        }
        return resultat;
    }
    catch(error) {
        return messageError;
    }
}

/** 
 * @function numberUnicodeToText
 * @description Convertis chaque codePoint Unicode en caractère. 
 * @param {string} string - Nombre Unicode à convertir espacé par un espace à chaque fois
 * @returns {string}
 * @example numberUnicodeToText('97 98 99') → 'abc'
 */  
function numberUnicodeToText(string) {
    try {
        const array = string.split(" ");
        let resultat = "";
        for (let index in array) {
          resultat = resultat + String.fromCodePoint(parseInt(array[index]).toString());
        }
        return resultat;
    }
    catch(error) {
        return messageError;
    }
}

/** 
 * @function textToBinary
 * @description Convertis un Texte en Binaire (UTF-8).
 * @param {string} s - La chaîne de caractère à convertir
 * @returns {string}
 * @example textToBinary('abc') → '01100001 01100010 01100011'
 */
function textToBinary(s) {
    try {
        s = unescape( encodeURIComponent(s));
        let chr, i = 0, l = s.length, out = '';
        for( ; i < l; i ++ ){
            chr = s.charCodeAt( i ).toString(2);
            while(chr.length % 8 != 0 ){ chr = '0' + chr; }
            out += chr;
        }
        return out.replace(/(\d{8})/g, '$1 ').replace(/(^\s+|\s+$)/,'');
    } catch (error) {
        return s;
    }
}

/** 
 * @function binaryToText
 * @description Convertis du Binaire (UTF-8) en Texte.
 * @param {string} s - La chaîne de caractère contenant tous les octets à convertir
 * @returns {string}
 * @example binaryToText('01100001 01100010 01100011') → 'abc'
 */
function binaryToText(s){
    try {
        s = s.replace(/\s/g,'')
        let i = 0, l = s.length, chr, out = '';
        for( ; i < l; i += 8){
            chr = parseInt( s.substr(i, 8 ), 2).toString(16);
            out += '%' + ((chr.length % 2 == 0) ? chr : '0' + chr);
        }
        return decodeURIComponent(out);
    } catch (error) {
        return s;
    }
} 


/** 
 * @function textToHexadecimal
 * @description Convertis un Texte en Hexadécimal (UTF-8).
 * @param {string} s - La chaîne de caractère à convertir
 * @returns {string}
 * @example textToHexadecimal('abc') → '61 62 63'
 */
function textToHexadecimal (s) {
    try {
        s = unescape( encodeURIComponent( s ) );
        let chr, i = 0, l = s.length, out = '';
        for( ; i < l; i++ ){
            chr = s.charCodeAt( i ).toString( 16 );
            out += ( chr.length % 2 == 0 ) ? chr : '0' + chr;
            out += " ";
        }
        return out.toUpperCase();
    }
    catch (error) {
        return s;
    }
}

/** 
 * @function hexadecimalToText
 * @description Convertis de l'Hexadécimal (UTF-8) en Texte.
 * @param {string} s - La chaîne de caractère contenant tous les nombres Hexadécimal à convertir
 * @returns {string}
 * @example hexadecimalToText('61 62 63') → 'abc'
 */
function hexadecimalToText (s) {
    try {
        s = s.replace(/\s/g,'');
        return decodeURIComponent( s.replace( /../g, '%$&' ) );
    }
	catch (error) {
        return s;
    }
}

/** 
 * @function convertArabicToRoman
 * @description Convertis un nombre arabe en nombre romain.
 * @requires {@link variables.js: correspondancesRomainArabe}
 * @param {number} nombre - Le nombre arabe à convertir
 * @returns {string}
 * @example convertArabicToRoman(24) → 'XXIV'
 */
function convertArabicToRoman(nombre) {
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

    correspondancesRomainArabe.forEach(correspondance => {
        extraireChiffreRomain(correspondance[0], correspondance[1]);
    });

    if (chiffresRomains === '') {
        return messageError;
    } else {
        return chiffresRomains;
    }
} 

/** 
 * @function convertRomanToArabic
 * @description Convertis un nombre romain en nombre arabe.
 * @requires {@link variables.js: correspondancesRomainArabe}
 * @param {string} str - Le nombre romain à convertir
 * @returns {number}
 * @example convertRomanToArabic('XXIV') → 24
 */
function convertRomanToArabic(str) {
    let result = 0;
    for (let i = 0;i < correspondancesRomainArabe.length; i++) {
      while (str.indexOf(correspondancesRomainArabe[i][1]) === 0){
        // Ajout de la valeur décimale au résultat
        result += correspondancesRomainArabe[i][0];
        // Supprimer la lettre romaine correspondante du début
        str = str.replace(correspondancesRomainArabe[i][1],'');
      }
    }
    if (str != '') {
        result = 0;
    }
    return result;
} 

/** 
 * @function armstrongNumber
 * @description Vérifie si un nombre fait partie des nombres d'Armstrong.
 * @param {number} number - Le nombre à tester
 * @returns {string}
 * @example armstrongNumber(153) → 153 est un nombre d'Armstrong, car  1<sup>3</sup> + 5<sup>3</sup> + 3<sup>3</sup> = 153.
 */ 
function armstrongNumber(number) {
    let numberString = number.toString();
    let numberStringLength = numberString.length;

    let result = 0;
    let resultString = "";
    for (let i = 0; i < numberStringLength; i++) {
        result = result + parseInt(numberString[i])**numberStringLength;
        resultString = resultString + " + " + numberString[i] + "<sup>" + numberStringLength + "</sup>";
    }

    number = formatNumberResult(number);
    if (result === number) {
        return `${number} est un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`;
    } else {
        return `${number} n'est pas un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`;
    }
} 

/** 
 * @function stringPermutations
 * @description Retourne un tableau contenant toutes les possibilités d'anagramme d'un mot.
 * @param {string} string - La chaîne de caractère à permuter
 * @returns {array}
 * @example stringPermutations('abc') → ["abc", "acb", "bac", "bca", "cab", "cba"]
 */
function stringPermutations(string) {
    let results = [];
  
    if (string.length === 1) {
      results.push(string);
      return results;
    }
  
    for (let i = 0; i < string.length; i++) {
      let firstChar = string[i];
      let charsLeft = string.substring(0, i) + string.substring(i + 1);
      let innerPermutations = stringPermutations(charsLeft);
      for (let i = 0; i < innerPermutations.length; i++) {
        results.push(firstChar + innerPermutations[i]);
      }
    }
    return results;
} 