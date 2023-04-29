<?php
$link = mysqli_connect("localhost", "root", "root", "stage");

//connexion à la bdd ou sont stockés les objets
if (!$link) {
  echo "Erreur : Impossible de se connecter à MySQL." . PHP_EOL;
  echo "Erreur de débogage : " . mysqli_connect_errno() . PHP_EOL;
  echo "Erreur de débogage : " . mysqli_connect_error() . PHP_EOL;
  exit;
}


$sql = "SELECT * FROM stage "; //requete SQL
$result = mysqli_query($link, $sql);
if($result){
  $action = [];
  while($ligne = mysqli_fetch_assoc($result)){
    $action[] = $ligne;

  }
}

echo json_encode($action);

 ?>
