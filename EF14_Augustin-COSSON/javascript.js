
/*..............................initialisation des variables.............................................*/

var lat = 48.856614; // on initialise la vue en prenant la  latitude de Paris
var lon = 2.3522219;  // on initialise la vue en prenant la longitude de Paris
var map = L.map('carte').setView([lat, lon], 3); //zoom ajusté à l'échelle européenne

L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',

}).addTo(map);



var stage = []; //liste contenant les données de tous les stages
var stageChoisis = []; //liste contenant les données des stages selectionnées

var rankMIN //note minimale du stage choisie par l'utilisateur
var rankMAX //note maximale du stage choisie par l'utilisateur
var anneeMIN//annee minimal du stage choisie par l'utilisateur

//création de l'icones de stage 
var stageIcon = L.icon({
  iconUrl: 'image/stage_selection.png', // stage_selection.png est une image test se trouvant dans le dossier image
  iconSize:     [30, 30], // taille de l'icone
  iconAnchor:   [20, 20], // point de l'icon qui correspond au point gps
 
});

/*............................. récuperation des données de la bdd via web.php ................................*/

var data = [];
fetch('web.php', { //connection au fichier web.php afin de récupérer les valeurs de la bdd
  method: 'post', 
  body: data,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  })

  .then(r =>r.json()) //utilisation des donnees récupere en format  json
  .then(r => {
    
    
    for (var i = 0; i<r.length; i++){
      stage.push(r[i]); //on remplit l'array stage avec les donnees recuperer de la base de donnees
      
    }
  });
    

/*............................. fonctions avec tests console.log()..............................................*/

   
function Selection_Utilisateur(){

  //vérification 
  //console.log("stageChoisis", stageChoisis)

  stageChoisis.length = 0 //on réinitialise la liste stageChoisis 

  //verfication que la liste stageChoisis est bien réinitialisées
  //console.log("stageChoisis", stageChoisis)


  // on récupère les valeurs choisies rankMAX,rankMIN,anneeMIN de la page interface_exportation.html
  rankMAX= document.forms.f.dmc.value 
  rankMIN= document.forms.g.dmd.value
  anneeMIN= document.forms.h.dme.value
  //console.log("rankMIN" , rankMIN)
  //console.log ("rankMAX", rankMAX)
  //console.log("anneeMIN", anneeMIN)
  


  // selection des stages choisis parmis tous les stages de la bdd

  for (var i = 0; i<stage.length; i++){
    if (parseFloat(stage[i].annee )>= parseFloat(anneeMIN)){
      //console.log("rank", stage[i].rank)
      if (parseFloat(stage[i].rank )>= parseFloat(rankMIN)){
        if (parseFloat(stage[i].rank)<= parseFloat(rankMAX)){
         //console.log("annee", stage[i].annee)
         //console.log("rank", stage[i].rank)
          stageChoisis.push(stage[i])
        }
      }
    }
  }
  
  //vérification
  //console.log("stageChoisis", stageChoisis)
  
  Affichage(stageChoisis) //on affichge sur la carte la position des stages selectionnés
  ClearTableau() //on initialise le tableau affichant les stages selectionnés
  RemplirTableau(stageChoisis) //on remplit le tableau qui affichera les stages selectionnés


}

function Exporter(){
  //cette fonction permet de telecharger en local, en format .JSON la liste des stages choisis
  download_as_JSON(stageChoisis, "stages_choisis")

  //message pour l'utilisateur
  alert("stages_choisis.json se trouve maintenant parmi vos fichiers de téléchargement. Vous pouvez refaire une sélection ou fermer cette page.");
      
}

function download_as_JSON(exportObjet, exportName){

  //cette fonction permet de convertir l'array contenant les données voulues en fichier JSON
  //cette fonction telecharge en local le fichier JSON converti

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObjet));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();

  //downloadAnchorNode.remove();

  //localStorage.setItem('stage', JSON.stringify(stage));// si on utilise un web storage.

}


function Affichage(liste){

  //cette fonction crée les markers à afficher son longitude et latitude.
  //cette fonction ajoute ces markers à la carte map.

  //map.clear();  malgré de nombreuses recherches, la fonction permettant de retirer
  //  chaque objet de la carte n'as pas été utilisée

  var stageObjet = []; //on initialise la liste qui contiendra les objets à afficher
 
  for (var i = 0; i<liste.length; i++){
    stageObjet[i] = L.marker([parseFloat(liste[i].latitude), parseFloat(liste[i].longitude)], {icon:  stageIcon });
    map.addLayer(stageObjet[i]);  
  }
};

      
     

function RemplirTableau(liste){
  //cette fonction permet de remplir le tableau avec les valeurs de la liste

	var tableau = document.getElementById("table");// la table de interface_exportztion.html

  for (var i = 0; i<liste.length; i++){

    var ligne = tableau.insertRow(-1);//on a ajouté une ligne

    var colonne1 = ligne.insertCell(0);//on  remplit la première cellule
    colonne1.innerHTML += liste[i].ville;

    var colonne2 = ligne.insertCell(1);//on  remplit la seconde cellule
    colonne2.innerHTML += liste[i].rank;

    var colonne3 = ligne.insertCell(2);//on  remplit la troisième cellule
    colonne3.innerHTML += liste[i].annee;
  }
}

function ClearTableau(){

  //cette fonction permet de vider les lignes du tableau afin de l'initialiser

  var tableau = document.getElementById("table");
  var nb_ligne =tableau.getElementsByTagName('tr').length - 1
  for (var i = 0; i<(nb_ligne); i++){
    console.log("nb ligne" , (tableau.getElementsByTagName('tr')).length)
    tableau.deleteRow(-1)
  }

}
      
    


    