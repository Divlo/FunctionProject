<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<main class="container-fluid flex-fill">
    <div class="container">
        <h1><span class="important"><?php echo $title?></span> :</h1>
        <p class="pt-3 text-center"><?php echo $description?></p>
        <div class="text-center">
            <img class="function-image" src="/img/function-image/convertRomanArabicNumbers.png" alt="Chiffres Romains">
        </div>
        <form id="convertRomanArabicNumbersForm" action="#" method="POST">
            <div class="form-group">
                    <label for="numbersArabic">Entrez votre nombre :</label>
                    <input name="numbersArabic" type="text" id="numbersArabic" placeholder="(e.g : 50)" class="form-control">
                    <br>
                    <label for="convertNumberType">Convertir en : </label> <br>
                    <select class="form-control" id="convertNumberType">
                        <option value="Nombre Romain">Nombre Romain</option>
                        <option value="Nombre Arabe">Nombre Arabe</option>
                    </select>
                    <div class="form-row text-center">
                        <div class="col-12">
                            <br>
                            <button type="submit" id="submitConvertRomanArabicNumbers" class="btn btn-dark text-center">Envoyer</button>
                        </div>
                    </div>
                    <br> <br>
                    <p class="results text-center"></p>
                </div>
            </div>
        </form>
    </div>
</main>

<!-- Footer -->
<?php include("../../incl/footer.php");?>