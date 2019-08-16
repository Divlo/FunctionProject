<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Menu -->
<?php include("../../incl/menu.php");?>

<!-- Page Content -->
<div class="container">
  <h1 class="mt-4 text-center"><span class="yellow-color">Conversion de Distance</span> :</h1>
  <p class="pt-3 text-center">Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre.</p>
  <div class="form-group">
		<label for="firstValue">Entrez la distance que vous voulez convertir :</label>
        <input name="firstValue" type="text" id="firstValue" placeholder="(e.g : 50cm)" class="form-control">
        <br>
		<label for="secondValue">Choisissez l'unité que vous voulez avoir après conversion :</label> <br>
        <select id="secondValue">
            <option value="pm">pm</option>
            <option value="nm">nm</option>
            <option value="µm">µm</option>
            <option value="mm">mm</option>
            <option value="cm">cm</option>
            <option value="dm">dm</option>
            <option value="m">m</option>
            <option value="dam">dam</option>
            <option value="hm">hm</option>
            <option value="km">km</option>
            <option value="Mm">Mm</option>
            <option value="Gm">Gm</option>
            <option value="Tm">Tm</option>
        </select>
        <!-- <input name="secondValue" type="text" id="secondValue" placeholder="(e.g : km)" class="form-control"> -->
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitConvertDistance" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>