// Adjusting styles

var htmlHeight = window.innerHeight;
var htmlWidth = window.innerWidth;
var pages = document.querySelectorAll('.page');
var menu = document.getElementById("menu");
var menuHeight = menu.offsetHeight;

var chooseAlcohol = document.getElementById("alcohol-choice");

if(menuHeight > htmlHeight) {
	htmlHeight = menuHeight;
}


for(var i = 0; i < pages.length; i++) {
	pages[i].style.minHeight = htmlHeight + "px";
}

document.body.style.width = htmlWidth + "px";

var canvas = document.getElementById("js-liquid-canvas");
var ctx = canvas.getContext("2d");
var homepage = document.getElementById("homepage");

var canvasDrinks = [];

canvas.height = homepage.scrollHeight;
canvas.width = homepage.scrollWidth;

var challengesArray = [
	"challenge-afond-voisin",
	"challenge-afond",
	"challenge-chartreuse",
	"challenge-speciale",
	"challenge-telephone",
	"challenge-wc",
	"challenge-faire-offrir"	
];

// object size method (length equivalent)

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


// Creating storage prots to accept objects

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

// drinks

var drinks = {
	"biere": 		{ "name": "biere", 		"caption": "Bière", 		"captionPlur": "Bières", 		"value": 1, "color": "#f1c40f", "abbr": "BIER" },
	"biere spc": 	{ "name": "biere spc", 	"caption": "Bière spc", 	"captionPlur": "Bières spcs", 	"value": 2, "color": "#d35400", "abbr": "SPC" },
	"whisky": 		{ "name": "whisky", 	"caption": "Whisky", 		"captionPlur": "Whiskies", 		"value": 4, "color": "#a04a1f", "abbr": "WHIS" },
	"rhum": 		{ "name": "rhum", 		"caption": "Rhum", 			"captionPlur": "Rhums", 		"value": 4,	"color": "#7a4d36", "abbr": "RHUM"	},
	"vodka": 		{ "name": "vodka",		"caption": "Vodka", 		"captionPlur": "Vodkas", 		"value": 4,	"color": "#e74c3c", "abbr": "VODK"	},
	"vin": 			{ "name": "vin",		"caption": "Vin", 			"captionPlur": "Vins", 			"value": 3,	"color": "#e6b0aa", "abbr": "VIN"	},
	"cocktail": 	{ "name": "cocktail",	"caption": "Cocktail", 		"captionPlur": "Cockatails", 	"value": 4,	"color": "#3498db", "abbr": "COCKT"	},
	"soft": 		{ "name": "soft", 		"caption": "Soft",			"captionPlur": "Softs", 		"value": 1, "color": "#1abc9c", "abbr": "SOFT" },
	"autres": 		{ "name": "autres",		"caption": "Autre", 		"captionPlur": "Autres",		"value": 1, "color": "#2ecc71", "abbr": "AUTR" } 
}

var badgePopupsContent = {
	"badge-10-verres": "<p>Boire un peu c'est bien mais boire beaucoup c'est mieux !</p><p>Pour débloquer ce badge tu dois avoir bu 10 verres au total.</p>",
	"badge-25-verres": "<p>Niveau boisson, tu progresse !</p><p>Pour débloquer ce badge tu dois avoir bu 25 verres au total.</p>",
	"badge-50-verres": "<p>C'est bien mais tu peux mieux faire !</p><p>Pour débloquer ce badge tu dois avoir bu 50 verres au total.</p>",
	"badge-100-verres": "<p>Un de plus, un de moins nous ne sommes plus à ça près !</p><p>Pour débloquer ce badge tu dois avoir bu 100 verres au total.</p>",
	"badge-150-verres": "<p>Fais attention à toi mais ne t'arrêtes pas !</p><p>Pour débloquer ce badge tu dois avoir bu 150 verres au total.</p>",
	"badge-200-verres": "<p>Les alcooliques anonymes tu connais ?</p><p>Pour débloquer ce badge tu dois avoir bu 200 verres au total.</p>",
	"badge-belge": "<p>Le Belge est né dans la bière comme Obelix est tombé dans la marmite !</p><p>Pour débloquer ce badge vous devez avoir bu 20 bières.</p>",
	"badge-russe": "<p>Comme au jeu de la roulette russe, tu as réussi à ne pas te faire tuer, bravo !</p><p>Pour débloquer ce badge vous devez avoir bu 20 vodkas.</p>",
	"badge-californien": "<p>Sur la plage entre transat et cocotier tu t'es bien reposé!</p><p>Pour débloquer ce badge vous devez avoir bu 20 cocktails.</p>",
	"badge-ecossais": "<p>Enfile ton kilt et prends ta cornemuse de mains fermes !</p><p>Pour débloquer ce badge vous devez avoir bu 20 whiskies.</p>",
	"badge-cubain": "<p>Che Guevara serait fier de toi !</p><p>Pour débloquer ce badge vous devez avoir bu 20 Rhums.</p>",
	"badge-oenologue": "<p>In vino veritas : la vérité est dans le vin !</p><p>Pour débloquer ce badge vous devez avoir bu 40 vins.</p>",
	"badge-moine": "<p>Que tes vœux de silences ne t'empêchent pas de boire, amen !</p><p>Pour débloquer ce badge vous devez avoir bu 40 bières spéciales.</p>",
	"badge-petitjoueur": "<p>Rentre chez toi, tu n'es pas digne de Hangover !</p><p>Pour débloquer ce badge vous devez avoir bu 40 softs.</p>",
	"badge-casanier": "<p>La vie est plus belle après 22h alors sors de ta grotte !</p><p>Pour débloquer ce badge c'est que vous ne buvez pas assez.</p>",
	"badge-sorteur": "<p>Pour débloquer ce badge c'est que vous ne buvez pas assez.</p><p>Pour débloquer ce badge vous devez vous déhancher sur le dancefloor.</p>",
	"badge-alcoolique": "<p>Foutu pour foutu, re-bois un dernier verre! </p><p>Pour débloquer ce badge vous devez avoir débloqué tous les badges</p>",
	"badge-12h": "<p>Tu as passé 12h dans les bar, bravo!</p><p>Pour débloquer ce badge vous devez avoir passé 12h dans les bars.</p>",
	"badge-24h": "<p>Tu as passé 24h dans les bar, bravo!</p><p>Pour débloquer ce badge vous devez avoir passé 24h dans les bars.</p>",
	"badge-7j": "<p>Tu as passé 7 jours dans les bar, ivrogne!</p><p>Pour débloquer ce badge vous devez avoir passé 7jours dans les bars.</p>",
	"badge-1m": "<p>Tu as passé 1 mois dans les bar, il suffit!</p><p>Pour débloquer ce badge vous devez avoir passé 1 mois dans les bars.</p>",
	"badge-6m": "<p>Tu as passé 6 mois dans les bar, il suffit!</p><p>Pour débloquer ce badge vous devez avoir passé 6 mois dans les bars.</p>",
	"badge-12m": "<p>Tu as passé 12 mois dans les bar, il suffit! </p><p>Pour débloquer ce badge vous devez avoir passé 12 mois dans les bars.</p>",
	"badge-24m": "<p>Tu as passé 12 mois dans les bar, il suffit! </p><p>Pour débloquer ce badge vous devez avoir passé 12 mois dans les bars.</p>"
}

var timeDrinking = {
	"minutes": 0,
	"hours": 0,
	"days": 0,
	"months": 0
}

var drankInit = {
	"biere": 0,
	"biere spc": 0,
	"whisky": 0,
	"rhum": 0,
	"vodka": 0,
	"vin": 0,
	"cocktail": 0,
	"soft": 0,
	"autres": 0
}

var badgesObtained = {
	"badge-10-verres": 0,
	"badge-25-verres": 0,
	"badge-50-verres": 0,
	"badge-100-verres": 0,
	"badge-150-verres": 0,
	"badge-200-verres": 0,
	"badge-belge": 0,
	"badge-russe": 0,
	"badge-californien": 0,
	"badge-ecossais": 0,
	"badge-cubain": 0,
	"badge-oenologue": 0,
	"badge-moine": 0,
	"badge-petitjoueur": 0,
	"badge-casanier": 0,
	"badge-sorteur": 0,
	"badge-alcoolique": 0,
	"badge-24h": 0,
	"badge-7j": 0,
	"badge-1m": 0,
	"badge-6m": 0,
	"badge-12m": 0,
	"badge-24m": 0
}


// declarations

var body = document.getElementById('js-body');
var menuButtons = document.querySelectorAll('.js-menu-button')
var goToMenuButtons = document.querySelectorAll('.js-gotomenu-button');
var goToPageButtons = document.querySelectorAll('.js-gotopage-button');
var alcoholListButtons = document.querySelectorAll('.js-alcohol-list-button');
var addDrinkButton = document.getElementById('js-add-drink');
var nextChallenge = document.getElementById("js-next-challenge");
var drankTonight = document.getElementById('js-drank-tonight');

var nowDrinking = document.getElementById('js-now-drinking');

var badgesButtons = document.querySelectorAll('#js-badges-list div li div');
var badgesButtonsDivs = document.querySelectorAll("#js-badges-list div.badge-container");
var badgePopup;

var currentAlcohol = drinks.biere.name;

var splash = document.getElementById("js-splash");


// localStorage

if(typeof(Storage) !== "undefined"){
	if(!localStorage.setUp) {
		localStorage.setUp = true;
		localStorage.setObject("timeDrinking", timeDrinking);
		localStorage.setObject("drank", drankInit);
		localStorage.setObject("drankTotal", drankInit);
		localStorage.setObject("badgesObtained", badgesObtained);
		localStorage.setObject("canvasDrinks", canvasDrinks);
	}
}

var drankCopy = localStorage.getObject('drank');
var drankTotalCopy = localStorage.getObject("drankTotal");

updateDrankTonight(drankCopy);

// Listeners

for(var i = 0; i < menuButtons.length; i++) {
	menuButtons[i].goTo = document.getElementById(menuButtons[i].getAttribute('data-gotopage'));
	menuButtons[i].addEventListener('click', function(event) {
		goToFromMenu(event, this);
		if(this.getAttribute("data-gotopage") == "profile") refreshProfile();
		if(this.getAttribute("data-gotopage") == "badges") checkBadges();
	}, false);
}

for(var i = 0; i < goToMenuButtons.length; i++) {
	goToMenuButtons[i].page = getParentWithClass(goToMenuButtons[i], ".page");
	goToMenuButtons[i].addEventListener('click', function(event) {
		goToMenu(event, this);
	}, false);
}

for(var i = 0; i < goToPageButtons.length; i++) {
	goToPageButtons[i].page = getParentWithClass(goToPageButtons[i], ".page");
	goToPageButtons[i].goTo = document.getElementById(goToPageButtons[i].getAttribute('data-gotopage'));
	goToPageButtons[i].addEventListener('click', function(event) {
		goToPage(event, this);
		if(this.hasAttribute("data-archive")) archiveParty();
		chooseAlcohol.style.height = homepage.offsetHeight + "px";
	}, false);
}

for(var i = 0; i < alcoholListButtons.length; i++) {
	alcoholListButtons[i].page = getParentWithClass(alcoholListButtons[i], ".page");
	alcoholListButtons[i].goTo = document.getElementById(alcoholListButtons[i].getAttribute('data-gotopage'));
	alcoholListButtons[i].addEventListener('click', function(event){
		goToPage(event, this);
		changeCurrentAlcohol(event, this);
	}, false);
}

var j = 0;
for(var i = 0; i < badgesButtons.length; i++) {
	badgesButtons[i].place = j;
	badgesButtons[i].addEventListener("click", function(event){
		displayBadgePopup(event, this);
	}, false);
	j++;
	if(j > 2) j = 0;
}

addDrinkButton.addEventListener("click", function(event){
	addDrink();
});

nextChallenge.addEventListener("click", function(event){
	getNextChallenge();
});




// Actions

function goToFromMenu(ev, el) {
	var currentPage = document.querySelectorAll(".revealing-menu")[0];

	for(i = 0; i < pages.length; i++) {
		pages[i].classList.remove("revealing-menu");
	}

	if(el.goTo !== currentPage) {
		currentPage.classList.remove("displayed");
		setTimeout(function(){
			currentPage.classList.remove("translated");
		}, 1);
		

		setTimeout(function(){
			el.goTo.classList.add("translated");
		}, 1);
		el.goTo.classList.add("displayed");
	}
}

function goToPage(ev, el) {
	el.goTo.classList.add("displayed");
	setTimeout(function(){
		el.goTo.classList.add("translated");
	}, 1);

	setTimeout(function(){
		setTimeout(function(){
			el.page.classList.remove("displayed");
		}, 200);
		el.page.classList.remove("translated");	
	}, 200);
}

function goToMenu(ev, el) {
	if(!el.page.classList.contains("revealing-menu")){
		el.page.classList.add("revealing-menu");
	} else {
		el.page.classList.remove("revealing-menu");
	}
}

function changeCurrentAlcohol(ev, el){
	var chosenAlcohol = el.getAttribute("data-alcohol");
	currentAlcohol = drinks[chosenAlcohol]["name"];
	nowDrinking.innerHTML = drinks[chosenAlcohol]["caption"];
	drawLiquid();
}

function addDrink() {
	drankCopy = localStorage.getObject('drank');
	drankCopy[currentAlcohol]++;
	localStorage.setObject("drank", drankCopy);

	drankTotalCopy = localStorage.getObject("drankTotal");
	drankTotalCopy[currentAlcohol]++;
	localStorage.setObject("drankTotal", drankTotalCopy);

	var canvasDrinksCopy = localStorage.getObject("canvasDrinks");

	canvasDrinksCopy.push(currentAlcohol);

	localStorage.setObject("canvasDrinks", canvasDrinksCopy);

	updateDrankTonight();
	drawLiquid();
}

function updateDrankTonight() {
	drankTonight.innerHTML = "";
	for(key in drankCopy){
		var markup = document.createElement('li');
		if(drankCopy[key] !== 0) {
			markup.innerHTML += drankCopy[key];
			if(drankCopy[key] == 1) {
				markup.innerHTML += " " + drinks[key].caption;
			} else {
				markup.innerHTML += " " + drinks[key].captionPlur;
			}
			drankTonight.appendChild(markup);
		}
	}
}

function archiveParty() {
	drankCopy = localStorage.getObject("drank");
	for(key in drankCopy)
		drankCopy[key] = 0;
	localStorage.setObject("drank", drankCopy);

	var canvasDrinksClear = [];

	localStorage.setObject("canvasDrinks", canvasDrinksClear);

	updateDrankTonight();
	drawLiquid();
}

var currentBadgeActive;

function displayBadgePopup(ev, el) {

	if(el != currentBadgeActive) {

		var badgePopup = document.getElementById("badge-popup");

		if(badgePopup != null){
			badgePopup.parentNode.classList.remove("filled");
		}

		setTimeout(function(){
			if(badgePopup != null) {
				badgePopup.parentNode.removeChild(badgePopup);
			}
		}, 200);

		badgePopupMarkup = document.createElement('div');
		badgePopupMarkup.classList.add("badge-popup");
		badgePopupMarkup.id = "badge-popup";
		elClass = el.classList[0];
		badgePopupMarkup.innerHTML = badgePopupsContent[elClass] + '<div class="badge-arrow"></div>';

		switch(el.place) {
			case 0:
				badgePopupMarkup.classList.add("left");
				break;
			case 1:
				badgePopupMarkup.classList.add("middle");
				break;
			case 2:
				badgePopupMarkup.classList.add("right");
				break;
		}

		el.parentNode.parentNode.appendChild(badgePopupMarkup);
		setTimeout(function(){
			el.parentNode.parentNode.classList.add("filled");
		}, 400);

	}

	currentBadgeActive = el;
}

function refreshProfile() {
	refreshGlassesDrank();
	refreshDifferent();
	refreshTime();
	updateGraph();
}

function refreshGlassesDrank() {
	var total = 0;
	drankTotalCopy = localStorage.getObject("drankTotal");
	for(key in drankTotalCopy) {
		total += drankTotalCopy[key];
	}

	var div = document.getElementById("js-glasses-drank");
	div.innerHTML = total;
}

function refreshDifferent() {
	var total = 0;
	drankTotalCopy = localStorage.getObject("drankTotal");
	for(key in drankTotalCopy) {
		if(drankTotalCopy[key] != 0) total++;
	}

	var div = document.getElementById("js-different-drank");
	div.innerHTML = total;
}

function refreshTime() {
	var timeDrinkingCopy = localStorage.getObject("timeDrinking");

	var minutes = timeDrinkingCopy["minutes"] + '';
	var hours = timeDrinkingCopy["hours"] + '';
	var days = timeDrinkingCopy["days"] + '';
	var months = timeDrinkingCopy["months"] + '';

	function formatDate(d){
		if(d.length < 2)
			d = "0" + d;
		return d;
	}

	minutes = formatDate(minutes);
	hours = formatDate(hours);
	days = formatDate(days);
	months = formatDate(months);

	document.getElementById("js-minutes").innerHTML = minutes;
	document.getElementById("js-hours").innerHTML = hours;
	document.getElementById("js-days").innerHTML = days;
	document.getElementById("js-months").innerHTML = months;
}

function clock() {
	var timeDrinkingCopy = localStorage.getObject("timeDrinking");
	timeDrinkingCopy["minutes"]++;

	if(timeDrinkingCopy["minutes"] >= 60){
		timeDrinkingCopy["minutes"] = 0;
		timeDrinkingCopy["hours"]++;
	}

	if(timeDrinkingCopy["hours"] >= 24){
		timeDrinkingCopy["hours"] = 0;
		timeDrinkingCopy["days"]++;
	}

	if(timeDrinkingCopy["days"] >= 30){
		timeDrinkingCopy["days"] = 0;
		timeDrinkingCopy["months"]++;
	}

	localStorage.setObject("timeDrinking", timeDrinkingCopy);
}

setInterval(function(){
	clock();
	refreshTime();
}, 60000);

function updateGraph() {
	var graph = document.getElementById("js-graph");

	while (graph.firstChild) {
	    graph.removeChild(graph.firstChild);
	}

	var drankTotalCopy = localStorage.getObject("drankTotal");

	var totalGlassesDrank = 0;

	for(key in drankTotalCopy) {
		totalGlassesDrank += drankTotalCopy[key];
	}

	var captionX = 0;
	var colX = 11;

	for(key in drankTotalCopy) {
		var col = document.createElement("div");
		col.classList.add("col");
		col.style.left = colX + "px";
		col.style.backgroundColor = drinks[key]["color"];

		colHeight = drankTotalCopy[key] * 80 / totalGlassesDrank;

		col.style.height = colHeight + "px";

		graph.appendChild(col);

		colX += 31;
	}

	for(var key in drinks) {
		var caption = document.createElement("div");
		caption.classList.add("caption");
		caption.innerHTML = drinks[key]["abbr"];

		caption.style.left = captionX + "px";

		graph.appendChild(caption);	
	
		captionX += 31;
	}
}

function checkBadges() {
	var drankCopy = localStorage.getObject("drank");
	var drankTotalCopy = localStorage.getObject("drankTotal");
	var badgesObtainedCopy = localStorage.getObject("badgesObtained");
	var timeDrinkingCopy = localStorage.getObject("timeDrinking");

	var totalGlassesDrank = 0;

	for(key in drankTotalCopy) {
		totalGlassesDrank += drankTotalCopy[key];
	}

	if(totalGlassesDrank >= 10) badgesObtainedCopy["badge-10-verres"] = 1;
	if(totalGlassesDrank >= 25) badgesObtainedCopy["badge-25-verres"] = 1;
	if(totalGlassesDrank >= 50) badgesObtainedCopy["badge-50-verres"] = 1;
	if(totalGlassesDrank >= 100) badgesObtainedCopy["badge-100-verres"] = 1;
	if(totalGlassesDrank >= 150) badgesObtainedCopy["badge-150-verres"] = 1;
	if(totalGlassesDrank >= 200) badgesObtainedCopy["badge-200-verres"] = 1;
	if(drankTotalCopy["biere"] >= 20) badgesObtainedCopy["badge-belge"] = 1;
	if(drankTotalCopy["vodka"] >= 20) badgesObtainedCopy["badge-russe"] = 1;
	if(drankTotalCopy["cocktail"] >= 20) badgesObtainedCopy["badge-californien"] = 1;
	if(drankTotalCopy["whisky"] >= 20) badgesObtainedCopy["badge-ecossais"] = 1;
	if(drankTotalCopy["rhum"] >= 20) badgesObtainedCopy["badge-cubain"] = 1;
	if(drankTotalCopy["vin"] >= 20) badgesObtainedCopy["badge-oenologue"] = 1;
	if(drankTotalCopy["biere spc"] >= 20) badgesObtainedCopy["badge-moine"] = 1;
	if(drankTotalCopy["soft"] >= 20) badgesObtainedCopy["badge-petitjoueur"] = 1;
	// casanier
	// sorteur
	// alcoolique
	if(timeDrinkingCopy["days"] >= 7 || timeDrinking["months"] >= 1) badgesObtainedCopy["badge-7j"] = 1;
	if(timeDrinking["months"] >= 1) badgesObtainedCopy["badge-1m"] = 1;
	if(timeDrinking["months"] >= 6) badgesObtainedCopy["badge-6m"] = 1;
	if(timeDrinking["months"] >= 12) badgesObtainedCopy["badge-12m"] = 1;
	if(timeDrinking["months"] >= 24) badgesObtainedCopy["badge-24m"] = 1;

	for(i = 0; i < badgesButtons.length; i++) {
		badgesButtons[i].classList.remove("obtained");

		for(key in badgesObtainedCopy) {
			if(badgesButtons[i].classList.contains(key) && badgesObtainedCopy[key] === 1)
				badgesButtons[i].classList.add("obtained");
		}
	}

	localStorage.setObject("badgesObtained", badgesObtainedCopy);
}

var image = new Image(); 
	image.src = 'img/waves.png';
	image.width = canvas.width;

function drawImg(y){
  	ctx.drawImage(image, 0, y - 5, canvas.width, 39);
}

function drawLiquid() {

	var canvasDrinksCopy = localStorage.getObject("canvasDrinks");

	canvas.height = homepage.offsetHeight;
	canvas.width = homepage.offsetWidth;

	var yPos = canvas.height;

	for(i = 0; i < canvasDrinksCopy.length; i++) {

		drinkType = canvasDrinksCopy[i];
		var value = canvasDrinksCopy[i-1];
		yPos -= drinks[drinkType]["value"] * 10;

		ctx.fillStyle = drinks[drinkType]["color"];
		ctx.fillRect(0, yPos, canvas.width, drinks[drinkType]["value"] * 10);
	}

	ctx.fillStyle = "rgba(255, 255, 255, .2)";
	ctx.fillRect((canvas.width - 240)/2, 0, 240, canvas.height);
	drawImg(yPos);
}

function getNextChallenge() {
	var challengeImg = document.getElementById("js-challenge-img");

	var randomIndex = Math.floor(Math.random()*(challengesArray.length));

	var newChallenge = challengesArray[randomIndex];

	for(i = 0; i < challengesArray.length; i++) {
		challengeImg.classList.remove(challengesArray[i]);
	}

	challengeImg.classList.add(newChallenge);
}

// Utilities

function collectionHas(a, b) {
    for(var i = 0, len = a.length; i < len; i ++) {
        if(a[i] == b) return true;
    }
    return false;
}

function getParentWithClass(el, cl) {
    var all = document.querySelectorAll(cl);
    var currentNode = el.parentNode;
    while(currentNode && !collectionHas(all, currentNode)) {
        currentNode = currentNode.parentNode;
    }
    return currentNode;
}

drawLiquid();
getNextChallenge();

