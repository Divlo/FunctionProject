<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="form-group">
		<label for="cityName">Entrez le nom d'une ville :</label>
        <input name="cityName" type="text" id="cityName" placeholder="(e.g : Paris)" class="form-control">
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitWeatherRequest" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Exécution de la fonction weatherRequest() -->
<?php include("../../php/apiKey.php"); ?>
<script>
    $(function () {
        // Fichiers qui contient les fonctions
        $.getScript("/scripts/fonctions.js", function() {

            $( "#submitWeatherRequest" ).click(function() 
            {
                let city = $('#cityName').val();
                let cityName = city.split(' ').join('+'); 
                if(isEmptyValue(cityName))
                {
                    $('.results').html(emptyMessageError);
                    $("#cityName, #submitWeatherRequest").click(function() {
                        document.location.replace("../function-views/weatherRequest.php");
                    });
                }
                else 
                {
                    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&lang=fr&units=metric&appid=<?php echo $apiKey ?>";
                    weatherRequest(url, 'weather');
                }
            });
        });
    })   
</script>

<!-- Footer -->
<?php include("../../incl/footer.php");?>