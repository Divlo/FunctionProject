        <footer class="text-center">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <a href="#" class="scroll-top-arrow important"><i class="fas fa-arrow-up"></i></a>
                        <div class="realDateTime">Affichage de l'heure en temps réel : <span class="important" id="realDateTime"></span></div>
                        <div class="footer-text"><a href="https://divlo.fr/" target="_blank">Divlo</a> | Tous droits réservés</div>
                    </div>
                </div>
            </div>
        </footer>
    </div>

        <!-- Preload -->
        <div id="overlay"></div>
        <div id="preloader">
            <div class="preload-icon"><span></span><span></span></div>
            <div class="preload-text">Loading ...</div>
        </div>

        <!-- Scripts JS -->
        <script defer src="/scripts/libs/jquery-min.js"></script>
        <script defer src="/scripts/libs/bootstrap-min.js"></script>
        <script defer src="/scripts/main.js"></script>
        <?php 
            // Ajouts des scripts personnalisés pour chaque page
            foreach ($scripts as $script) {
                echo $script;
            }
        ?>

    </body>
</html>