//déclaration de variables Globales
let randomNumber = -1;   //indice du tableau (nombre random d'un intervalle)
let quotation = "";
let author = "";
let infos = [];

//Récupération de nos données

let button = document.querySelector('button');
let cit = document.querySelector('#citation');
let head = document.querySelector('#head');
let auth = document.querySelector('#auth');

//Création de notre tableau de citations

let tabQuotes = [
  ["La vie est un mystère qu'il faut vivre, et non un problème à résoudre.", "Gandhi"],
  ["Le plus grand risque est de ne prendre aucun risque.", "Mark Zuckerberg"],
  ["Méritez votre statut de leader chaque jour.", "Mickael Jordan"],
  ["Soyez le changement que vous voulez voir dans le monde.", "Gandhi"],
  ["A chaque fois que vous vous retrouvez du même côté que la majorité, il est temps de prendre du recul, et de réfléchir.", "Mark Twain"],
  ["Seulement ceux qui prendront le risque d’aller trop loin découvriront jusqu’où on peut aller.", "T.S Elliot"],
  ["Le succès c’est tomber sept fois, se relever huit.", "Proverbe japonais"],
  ["Dans vingt ans vous serez plus déçus par les choses que vous n’avez pas faites que par celles que vous avez faites. Alors sortez des sentiers battus. Mettez les voiles. Explorez. Rêvez. Découvrez.", "Mark Twain"],
  ["Si vous attendez pour agir, tout ce que vous gagnerez, avec le temps, c’est de l’âge.", "Brian Tracy"],
  ["Quand on concentre son attention sur un seul projet, l’esprit suggère constamment des idées et des améliorations qui lui échapperaient s’il était occupé avec plusieurs projets en même temps.", "P.T. Barnum"],
  ["Se dédier à faire tout ce que l’on peut pour aider les autres à obtenir ce qu’ils veulent, c’est la clé du succès.", "Brian Sher"],
  ["Si vous pensez que vous êtes trop petit pour avoir de l’impact, essayez d’aller au lit avec un moustique.", "Anita Roddick"],
  ["Ne jugez pas chaque jour sur ce que vous récoltez, mais sur les graines que vous semez.", "Robert Louis Stevenson"],
  ["L’action est la clé fondamentale de tout succès.", "Pablo Picasso"],
  ["Le succès, c’est se promener d’échecs en échecs tout en restant motivé.", "Winston Churchill"],
  ["Votre avenir est créé par ce que vous faîtes aujourd’hui, pas demain.", "Robert T. Kiyosaki"],
  ["Ne vous découragez pas, c’est souvent la dernière clef du trousseau qui ouvre la porte.", "Zig Ziglar"],
  ["Pour gagner votre vie, apprenez à l’école. Pour gagner une fortune, apprenez par vous-même.", "Brian Tracy"],
  ["Les gagnants trouvent des moyens, les perdants des excuses…", "F. D. Roosevelt"],
  ["Vous n’êtes jamais trop vieux pour vous fixer de nouveaux buts, ou rendre vos rêves réalité.", "C.S. Lewis"],
  ["Un pessimiste voit la difficulté dans chaque opportunité. Un optimiste voit une opportunité dans chaque difficulté.", "Winston Churchill"],
  ["Faites que le rêve dévore votre vie afin que la vie ne dévore pas votre rêve.", "Antoine de St Exupery"],
  ["Tous les hommes pensent que le bonheur se trouve au sommet de la montagne alors qu’il réside dans la façon de la gravir.", "Confucius"],
  ["Dans 20 ans, vous serez plus déçu par les choses que vous n’avez pas faites que par celles que vous avez faites. Alors sortez des sentiers battus. Mettez les voiles. Explorez. Rêvez. Découvrez.", "Mark Twain"],
  ["Ce qui est plus triste qu’une œuvre inachevée, c’est une œuvre jamais commencée.", "Christinna Rosseti"],
  ["Tous les jours et à tout point de vue, je vais de mieux en mieux.", "Emile Coué"],
  ["Quand on ne peut revenir en arrière, on ne doit que se préoccuper de la meilleure manière d’aller de l’avant.", "Paulo Coelho"],
  ["La vie est ainsi ; on réalise rarement dans l'instant que les moments difficiles ont une fonction cachée : nous amener à grandir.", "Laurent Gounelle"],
  ["La colère rend sourd, le désespoir aveugle. Nous laissons passer l'occasion qui nous était offerte de grandir. Alors, les coups durs se multiplient. Ce n'est pas le sort qui s'acharne contre nous, c'est la vie qui tente de renouveler son message.", "Laurent Gounelle"],
  ["Appréciez d’échouer, et apprenez de l’échec, car on n’apprend rien de ses succès.", "James Dyson"],
  ["Il n’y a qu’une façon d’échouer, c’est d’abandonner avant d’avoir réussi.", "Georges Clemenceau"]
];


function randIndex () {
  let indice = 0;
  let sizeTab = 0;
  
  sizeTab = tabQuotes.length;
  do {
    indice = Math.floor(Math.random() * (sizeTab - (-1))) - 1;
  }
  while ((indice < 0) || (indice >= sizeTab));
  randomNumber = indice;
}

function getQuotationByIndex(index)
{
  return(tabQuotes[index][0]);
}

function getAuthorByIndex(index)
{
  return (tabQuotes[index][1])
}

function getInfosAtIndex(index)
{
  
  quotation = getQuotationByIndex(index);
  author = getAuthorByIndex(index);
  infos.splice(0, 2);
  infos.push(quotation, author);
}

function displayInfos() 
{
  
  cit.textContent = infos[0];
  auth.textContent = infos[1];  
}

function styleCit()
{
  cit.style.color = "red";
  cit.style.fontFamily = "arial";
}

function styleAuth()
{
  auth.style.color = "black";
  auth.style.fontFamily = "arial";
}

function styleButton()
{
  button.style.color = "grey";
  button.style.backgroundColor = "orange";
  button.style.fontFamily = "arial";
}

function applyStyle()
{
  styleCit();
  styleAuth();
  styleButton();
}

function play()
{
  randIndex(); //on genere notre nombre aléatoire
  //avec cet index on choisi d'afficher la citation   a l'indice donné.
  getInfosAtIndex(randomNumber); //on récupere les     infos que l'on stock dans notre tableau.
  
  //applyStyle();
  displayInfos(); //on affiche nos infos.
}
play();
button.addEventListener('click', play);