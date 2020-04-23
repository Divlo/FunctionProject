/* categories */
INSERT INTO `categories` (`id`, `name`, `color`, `createdAt`, `updatedAt`) VALUES
(1, '✨ Utilitaires', '#720fc0', '2020-03-20 00:00:00', '2020-03-20 00:00:00'),
(2, '💻 Algorithmes', '#0a4c82', '2020-03-20 00:00:00', '2020-03-20 00:00:00'),
(3, '🕹️ Jeux', '#a10b0b', '2020-03-20 00:00:00', '2020-03-20 00:00:00'),
(4, '📝 Divers', '#333434', '2020-03-20 00:00:00', '2020-03-20 00:00:00');

/* functions */
INSERT INTO `functions` (`id`, `title`, `slug`, `description`, `image`, `type`, `article`, `utilizationForm`, `isOnline`, `createdAt`, `updatedAt`, `categorieId`) VALUES
(1, 'Météo', 'weatherRequest', 'Affiche la météo et l\'heure locale.', '/images/functions/weatherRequest.png', 'form', NULL, '[{\"name\": \"cityName\", \"type\": \"text\", \"label\": \"Entrez le nom d\'une ville :\", \"placeholder\": \"(e.g : Paris, FR)\"}]', 1, '2019-08-16 00:00:00', '2020-04-16 17:34:49', 1),
(2, 'Nombre aléatoire', 'randomNumber', 'Génère un nombre aléatoire entre un minimum inclus et un maximum inclus.', '/images/functions/randomNumber.png', 'form', NULL, '[{\"name\": \"min\", \"type\": \"integer\", \"label\": \"Entrez la valeur minimale :\", \"placeholder\": \"(e.g : 1)\"}, {\"name\": \"max\", \"type\": \"integer\", \"label\": \"Entrez la valeur maximale :\", \"placeholder\": \"(e.g : 100)\"}]', 1, '2019-08-16 00:00:00', '2020-04-21 14:43:40', 2),
(3, 'Quel âge avez-vous ?', 'calculateAge', 'Calcule l\'âge selon la date de naissance.', '/images/functions/calculateAge.png', 'form', NULL, '[{\"name\": \"birthDate\", \"type\": \"calendar\", \"label\": \"Entrez la date de naissance au format (dd/mm/yyyy) :\", \"placeholder\": \"Sélectionnez une date\"}]', 1, '2019-08-16 00:00:00', '2020-04-17 16:54:27', 1),
(4, 'Conversion de Température', 'convertTemperature', 'Convertis des Degré Celsius en Degré Fahrenheit et l\'inverse aussi.', '/images/functions/convertTemperature.png', 'form', NULL, '[{\"name\": \"degree\", \"type\": \"float\", \"label\": \"Entrez la température\", \"placeholder\": \"(e.g : 23)\"}, {\"name\": \"unitToConvert\", \"type\": \"select\", \"label\": \"Convertir en : \", \"options\": [{\"name\": \"Degré Celsius (°C)\", \"value\": \"°C\"}, {\"name\": \"Degré Fahrenheit (°F)\", \"value\": \"°F\"}], \"placeholder\": \"\"}]', 1, '2019-08-16 00:00:00', '2020-04-21 16:52:11', 1),
(5, 'Conversion de Distance', 'convertDistance', 'Convertis la longueur (distance) avec les unités allant de picomètre au Téramètre.', '/images/functions/convertDistance.png', 'form', NULL, '[{\"name\": \"number\", \"type\": \"float\", \"label\": \"Entrez la distance que vous voulez convertir :\", \"placeholder\": \"(e.g : 50)\"}, {\"name\": \"numberUnit\", \"type\": \"select\", \"label\": \"L\'unité du nombre que vous voulez convertir : \", \"options\": [{\"name\": \"Picomètre (pm)\", \"value\": \"pm\"}, {\"name\": \"Nanomètre (nm)\", \"value\": \"nm\"}, {\"name\": \"Micromètre (µm)\", \"value\": \"µm\"}, {\"name\": \"Millimètre (mm)\", \"value\": \"mm\"}, {\"name\": \"Centimètre (cm)\", \"value\": \"cm\"}, {\"name\": \"Décimètre (dm)\", \"value\": \"dm\"}, {\"name\": \"Mètre (m)\", \"value\": \"m\"}, {\"name\": \"Décamètre (dam)\", \"value\": \"dam\"}, {\"name\": \"Hectomètre (hm)\", \"value\": \"hm\"}, {\"name\": \"Kilomètre (km)\", \"value\": \"km\"}, {\"name\": \"Mégamètre (Mm)\", \"value\": \"Mm\"}, {\"name\": \"Gigamètre (Gm)\", \"value\": \"Gm\"}, {\"name\": \"Téramètre\", \"value\": \"Tm\"}], \"placeholder\": \"\"}, {\"name\": \"finalUnit\", \"type\": \"select\", \"label\": \"Choisissez l\'unité que vous voulez avoir après conversion :\", \"options\": [{\"name\": \"Picomètre (pm)\", \"value\": \"pm\"}, {\"name\": \"Nanomètre (nm)\", \"value\": \"nm\"}, {\"name\": \"Micromètre (µm)\", \"value\": \"µm\"}, {\"name\": \"Millimètre (mm)\", \"value\": \"mm\"}, {\"name\": \"Centimètre (cm)\", \"value\": \"cm\"}, {\"name\": \"Décimètre (dm)\", \"value\": \"dm\"}, {\"name\": \"Mètre (m)\", \"value\": \"m\"}, {\"name\": \"Décamètre (dam)\", \"value\": \"dam\"}, {\"name\": \"Hectomètre (hm)\", \"value\": \"hm\"}, {\"name\": \"Kilomètre (km)\", \"value\": \"km\"}, {\"name\": \"Mégamètre (Mm)\", \"value\": \"Mm\"}, {\"name\": \"Gigamètre (Gm)\", \"value\": \"Gm\"}, {\"name\": \"Téramètre\", \"value\": \"Tm\"}], \"placeholder\": \"\"}]', 1, '2019-08-16 00:00:00', '2020-04-21 16:52:01', 1),
(6, 'Générateur de citations', 'randomQuote', 'Génère aléatoirement une citation ou un proverbe.', '/images/functions/randomQuote.png', 'page', NULL, NULL, 1, '2019-09-13 00:00:00', '2020-04-22 10:23:43', 1),
(7, 'Conversion de devise', 'convertCurrency', 'Convertis une valeur dans une devise dans une autre devise.', '/images/functions/convertCurrency.png', 'form', NULL, '[{\"name\": \"number\", \"type\": \"float\", \"label\": \"Entrez le nombre à convertir :\", \"placeholder\": \"(e.g : 50)\"}, {\"name\": \"baseCurrency\", \"type\": \"select\", \"label\": \"La devise du nombre que vous voulez convertir :\", \"options\": [{\"name\": \"Euro (€) - EUR\", \"value\": \"EUR\"}, {\"name\": \"Livre sterling (£) - GBP\", \"value\": \"GBP\"}, {\"name\": \"Dollar Américain ($) - USD\", \"value\": \"USD\"}, {\"name\": \"Dollar Canadien ($) - CAD\", \"value\": \"CAD\"}, {\"name\": \"Dollar Australien ($) - AUD\", \"value\": \"AUD\"}, {\"name\": \"Peso Mexicain ($) - MXN\", \"value\": \"MXN\"}, {\"name\": \"Franc Suisse (Fr) - CHF\", \"value\": \"CHF\"}, {\"name\": \"Rouble Russe (₽) - RUB\", \"value\": \"RUB\"}, {\"name\": \"Réal brésilien (R$) - BRL\", \"value\": \"BRL\"}, {\"name\": \"Yen (¥) - JPY\", \"value\": \"JPY\"}]}, {\"name\": \"finalCurrency\", \"type\": \"select\", \"label\": \"Choisissez la devise que voulez avoir après conversion :\", \"options\": [{\"name\": \"Livre sterling (£) - GBP\", \"value\": \"GBP\"}, {\"name\": \"Dollar Américain ($) - USD\", \"value\": \"USD\"}, {\"name\": \"Dollar Canadien ($) - CAD\", \"value\": \"CAD\"}, {\"name\": \"Dollar Australien ($) - AUD\", \"value\": \"AUD\"}, {\"name\": \"Peso Mexicain ($) - MXN\", \"value\": \"MXN\"}, {\"name\": \"Franc Suisse (Fr) - CHF\", \"value\": \"CHF\"}, {\"name\": \"Rouble Russe (₽) - RUB\", \"value\": \"RUB\"}, {\"name\": \"Réal brésilien (R$) - BRL\", \"value\": \"BRL\"}, {\"name\": \"Yen (¥) - JPY\", \"value\": \"JPY\"}, {\"name\": \"Euro (€) - EUR\", \"value\": \"EUR\"}]}]', 1, '2019-09-13 00:00:00', '2020-04-22 21:55:30', 1),
(8, 'Conversion des Encodages de caractères', 'convertEncoding', 'Convertis des nombres de différentes bases et convertis en UTF-8.', '/images/functions/convertEncoding.png', 'form', NULL, '[{\"name\": \"value\", \"type\": \"text\", \"label\": \"Entrez votre valeur :\", \"placeholder\": \"Votre valeur...\"}, {\"name\": \"functionName\", \"type\": \"select\", \"label\": \"Choisissez une option :\", \"options\": [{\"name\": \"Décimal en Binaire\", \"value\": \"decimalToBinary\"}, {\"name\": \"Binaire en Décimal\", \"value\": \"binaryToDecimal\"}, {\"name\": \"Décimal en Hexadecimal\", \"value\": \"decimalToHexadecimal\"}, {\"name\": \"Hexadecimal en Décimal\", \"value\": \"hexadecimalToDecimal\"}, {\"name\": \"Binaire en Hexadécimal\", \"value\": \"binaryToHexadecimal\"}, {\"name\": \"Hexadécimal en Binaire\", \"value\": \"hexadecimalToBinary\"}, {\"name\": \"Chaque caractère a un nombre Unicode\", \"value\": \"textToNumberUnicode\"}, {\"name\": \"Chaque nombre Unicode a un caractère\", \"value\": \"numberUnicodeToText\"}, {\"name\": \"Texte en Binaire (UTF-8)\", \"value\": \"textToBinary\"}, {\"name\": \"Binaire (UTF-8) en Texte\", \"value\": \"binaryToText\"}, {\"name\": \"Texte en Hexadécimal (UTF-8)\", \"value\": \"textToHexadecimal\"}, {\"name\": \"Hexadécimal (UTF-8) en Texte\", \"value\": \"hexadecimalToText\"}], \"placeholder\": \"\"}]', 1, '2019-09-14 00:00:00', '2020-04-22 22:34:48', 2),
(9, 'Conversion d\'un nombre arabe en nombre romain', 'convertRomanArabicNumbers', 'Convertis un nombre arabe en nombre romain (et l\'inverse aussi).', '/images/functions/convertRomanArabicNumbers.png', 'form', NULL, '[{\"name\": \"value\", \"type\": \"text\", \"label\": \"Entrez votre nombre :\", \"placeholder\": \"(e.g : 50 ou L)\"}, {\"name\": \"functionName\", \"type\": \"select\", \"label\": \"Convertir en :\", \"options\": [{\"name\": \"Nombre Romain\", \"value\": \"convertArabicToRomanOutput\"}, {\"name\": \"Nombre Arabe\", \"value\": \"convertRomanToArabicOutput\"}], \"placeholder\": \"\"}]', 1, '2019-09-21 00:00:00', '2020-04-22 22:43:50', 2),
(10, 'Nombre d\'Armstrong', 'armstrongNumber', 'Permet de savoir si un nombre fait partie des nombres d\'Armstrong.', '/images/functions/armstrongNumber.png', 'form', NULL, '[{\"name\": \"number\", \"type\": \"integer\", \"label\": \"Entrez votre nombre :\", \"placeholder\": \"(e.g : 153)\"}]', 1, '2019-09-21 00:00:00', '2020-04-22 22:49:21', 2),
(11, 'Heap\'s algorithm', 'heapAlgorithm', 'Génère toutes les permutations uniques possibles d\'une chaîne de caractère.', '/images/functions/heapAlgorithm.png', 'form', NULL, '[{\"name\": \"string\", \"type\": \"text\", \"label\": \"Entrez un mot :\", \"placeholder\": \"(e.g : Mot)\"}]', 1, '2019-10-11 00:01:00', '2020-04-22 23:06:15', 2);