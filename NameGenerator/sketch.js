// --------------------------- Application ---------------------------------
let factionName = "";
let factionAntorqua, factionHarbeis, factionInfinites, factionNarglia, factionSkalmena;
let randomSizePerFaction = [91, 92, 100, 92, 92]; // order faction : Antorqua, Harbeïs, Infinites, Narglias, Skalmena
let randomSize, sizeOfName, actualName = "", syllabusList, result;

function preload() {
  factionAntorqua = loadStrings("data/Antorqua.txt");
  factionHarbeis = loadStrings("data/Harbeïs.txt");
  factionInfinites = loadStrings("data/Infinites.txt");
  factionNarglia = loadStrings("data/Narglia.txt");
  factionSkalmena = loadStrings("data/Skalmena.txt");
}

function setup() {
  createCanvas(400, 80);
}

function draw() {

  clear();
  noStroke();
  fill(255, 100);
  rect(0, 0, 400, 80, 10);
  fill(50, 255);
  textFont("Caveat");
  textSize(36);
  textAlign(CENTER);
  text(result, width/2, 50);
}

function generateName() {
  sizeOfName = Math.floor(random(0, 3)); // floor pour faire du int, taille en lettre des noms ( a voir en gaussien ) ?
  actualName= "";
  if (actualName.length == 0) { // pour la première syllabe uniquement
    actualName = syllabusList[Math.floor(random(randomSize))]; // choisi au hazard dans la liste sauf les dernière qui commence en a ou v
  }
  for (let i =0; i < sizeOfName ; i++) {
    actualName = actualName + syllabusList[Math.floor(random(101))]; // rajoute des syllabe jusqu'à atteindre la taille désirée
  }
  result = actualName.charAt(0) + actualName.substring(1, actualName.length).toLowerCase(); // met le résultat en minuscule sauf la première lettre
  result = result + "  " + syllabusList[Math.floor(random(101) + 104)]
}

function selectFaction() {
  if (factionName == "data/antorqua.jpg") {
    randomSize = randomSizePerFaction[0];
    syllabusList = factionAntorqua;
  }
  if (factionName == "data/harbeis.jpg") {
    randomSize = randomSizePerFaction[1];
    syllabusList = factionHarbeis;
  }
  if (factionName == "data/infinites.jpg") {
    randomSize = randomSizePerFaction[2];
    syllabusList = factionInfinites;
  }
  if (factionName == "data/narglia.jpg") {
    randomSize = randomSizePerFaction[3];
    syllabusList = factionNarglia;
  }
  if (factionName == "data/skalmena.jpg") {
    randomSize = randomSizePerFaction[4];
    syllabusList = factionSkalmena;
  }
 
}

// charge les boutons et l'image
const imageContainer = document.querySelector('.image-container');
const radioButtons = document.querySelectorAll('input[type="radio"]');
// Image par défaut
imageContainer.style.backgroundImage = `url(${radioButtons[0].value})`;
const formulaire = document.getElementById("factionRadio");

// change l'image de fond et la variable de la faction quand on clique sur le bouton radio
function changeBackgroundImage(event) {
  const selectedImage = event.target.value;
  factionName = selectedImage;
  imageContainer.style.backgroundImage = `url(${selectedImage})`;
  console.log(factionName);
  selectFaction();
}

// scanne tous les bouttons pour y mettre un listener 
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', changeBackgroundImage);
});


let submitter = document.getElementById("generating");
submitter.addEventListener("click", clickSubmit)

function clickSubmit(e) {
  generateName();
  e.preventDefault();
  document.getElementById('resultatLabel').innerHTML 
  = result; 
}