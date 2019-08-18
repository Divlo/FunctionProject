<!-- Head Perso -->
<?php include("../php/headPerso.php");?>

<!-- Header -->
<?php include("../incl/header.php");?>

<!-- Menu -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/index.php">Accueil</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/views/function-list.php">Liste des fonctions<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="_blank" href="https://docs.google.com/forms/d/1NliUWi3lntHDM42Td0C47J0cZKgnYilxT_0UcdmVaog/">Feedback Formulaire</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="_blank" href="https://github.com/Divlo/FunctionProject">Code Source</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>

<!-- Page Content -->
<div class="jumbotron d-flex align-items-center">
    <div class="container">
        <div class="row">
            <h1>La liste des <span class="important">Fonctions</span> :</h1>
                <table class="table table-bordered mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="./function-views/weatherRequest.php">Météo</a></td>
                            <td>Affiche la météo et l'heure local selon la ville.</td>     
                        </tr>
                        <tr>
                            <td><a href="./function-views/randomNumber.php">Nombre aléatoire</a></td>
                            <td>Génère un nombre aléatoire entre un minimum inclus et un maximum inclus.</td>  
                        </tr>
                        <tr>
                            <td><a href="./function-views/calculateAge.php">Quelle âge avez-vous ?</a></td>
                            <td>Calcule l'âge de quelqu'un selon la date de naissance.</td> 
                        </tr>
                        <tr>
                            <td><a href="./function-views/convertTemperature.php">Conversion de Température</a></td>
                            <td>Convertit des Degré Celsius en Degré Fahrenheit et l'inverse aussi.</td>    
                        </tr>
                        <tr>
                            <td><a href="./function-views/convertDistance.php">Conversion de Distance</a></td>
                            <td>Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre.</td> 
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>
</div>

<!-- Footer -->
<?php include("../incl/footer.php");?>