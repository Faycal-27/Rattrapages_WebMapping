Micro-Projet Webmapping et données distantes EF14 Augustin-Cosson / READ ME

-titre : cartes des stages – interface d’export
-objectif : L’étudiant devra programmé l’interface qui permet d’exporter le contenu

#.............................................CONTENU...................................................................#



-Un dossier "image" contenant : logo_ensg.png : logo de l'ecole commanditaire du projet 
								stage_selection.png : marker type d'un stage à afficher sur la carte
-index.html :  fichier html index avec bouton permettant d'acceder à l'interface d'exportation : interface_exportation.html
-interface_exportation.html : fichier html ayant : trois formulaire de selection 
												   un bouton de validation
												   un tableau récapitulatif
												   une carte leaflet (source = openstreetmap.fr)
-style.css : fichier style permettant d'organiser les vue index.html et interface_exportation.html
-javascript.js : fichier d'activité qui définit les actions possibles avec un panel de fonctions
-web.php : fichier permettant d'intéragir avec la base de données en localhost via  phpMyAdmin.
-stage.sql : fichier sql à importer sur phpMyAdmin
-README.txt
-carnet_de_laboratoire_EF14.doc : document détaillant chronologiquement le travail effectué pour ce projet



#.............................................INSTALLATION LOGICIEL ET BASE DE DONNEES....................................#
   

Installer  MAMP 


Installer la base de données : stage.sql

-Ouvrir MAMP
-Cliquer sur "Open WebStart Page"
-Ouvrir phpmyadmin 

-Cliquer sur "nouvelle base de données" dans phpmyadmin et créer une BDD nommée stage
-La sélectionner et se diriger dans l'onglet "Importer"
-Choisir la database "stage.sql" dans le dossier EF14_Augustin-COSSON
-Exécuter


#.............................................FICHIER PHP................................................................#




FICHIER PHP

-web.php


Pour une utilisation personnelle, si problème, modifier selon vos paramètres la ligne

$link = mysqli_connect('localhost', 'root', 'root', 'stage');





#.............................................UTILISATION............................................................#




-Lancer MAMP
-Redefinir le chemin d'accès au dossier : Preference --> Server --> .\EF14_Augustin-COSSON
-Cliquer sur "Start Serveur"
-Entrer l'adresse suivante sur votre navigateur : localhost/EF14_Augustin-COSSON
 
En cas d'erreur :
-Rajouter votre Port de la sorte : "localhost:81/EF14_Augustin-COSSON"

Vous ouvrez ainsi le fichier EF14_Augustin-COSSON/index.html



#.............................................DEMARRAGE................................................................#



-Lancez la page d'accueil index.html.

Vous pouvez alors Démarrer la procédure d'exportation en cliquant sur le bouton « exporter des données en JSON »

-Une nouvelle page interface_exportation.html s'ouvre alors

	Sur la gauche de l'écran, plusieurs formulaire à remplir puis à valider avec le bonton « valider »
	A droite,la carte affiche les stages selectionnés, A gauche, un tableau récapitulant les stages séléctionnés
	En bas de l'écran, un bouton « Exporter » permet de telecharger les données au format JSON

#.............................................DEMARRAGE................................................................#

-il est possible de telecharger des stages selectionnées plusieurs fois sans avoir à raffraichir la page
-il n'est pas possible de retirer des markers sur la carte sans raffraichir la page.







