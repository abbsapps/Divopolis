
window.onload = generateCity;
onlyTwenty = 0;
function generateCity(){
	constructionTime = (new Date()).getTime();
	emptyLots = new Array();
	//alert (constructionTime);
	var city = document.getElementById("city");
	for (counter = 0; counter < 1000; counter++){
		makeBox(city, Math.floor(Math.random()* 255), Math.floor(Math.random()* 255), Math.floor(Math.random()* 255), Math.floor(Math.random()*60), Math.floor(Math.random()* 30), constructionTime);
	}
}

function makeBox(city, red, green, blue, height, width, timeNow){
	var div = document.createElement('div');
	var destructionTimeBase = Math.floor(Math.random() * 1000);
	destructionTimeSquare = Math.floor(destructionTimeBase * destructionTimeBase);
	div.style.width = width+"px";
	div.style.height = height+"px";
	div.style.background = "rgb("+red+", "+green+", "+blue+")";
	div.style.display = "inline-block";
	div.height = height;
	div.width = width;
	div.red = red;
	div.green = green;
	div.blue = blue;
	div.onclick = replicate;
	//if (onlyTwenty < 20){
		setTimeout(function() {
			emptyLot = document.createElement('div');
			emptyLot.style.width = div.style.width;
			emptyLot.style.height = div.style.height;
			emptyLot.style.display = "inline-block";
			emptyLot.width = div.width;
			emptyLot.height = div.height;
			emptyLots.push(emptyLot);
			$(div).replaceWith(emptyLot);
			}, Math.floor(Math.random() * 100000)
		);
		onlyTwenty++;
	//}
	var lotFilled = 0;
	subCounter = 0;
	while (lotFilled == 0 && subCounter < emptyLots.length){
		if(div.width < emptyLots[subCounter].width){
			var widthDiff = emptyLots[subCounter].width - div.width;
			$(emptyLots[subCounter]).replaceWith(div);
			//alert(emptyLots.length);
			//alert(emptyLots.length);
			widthDiff = emptyLots[subCounter].width - div.width;
			remainingLot = document.createElement('div');
			remainingLot.style.width = widthDiff + "px";
			//alert(emptyLots[subCounter].style.width);
			//alert(div.style.width);
			//alert(remainingLot.style.width);
			remainingLot.style.height = div.style.height;
			remainingLot.width = widthDiff;
			remainingLot.height = div.height;
			remainingLot.style.display = "inline-block";
			//code for appending the remainingLot div to be immediately after the div in the DOM, which will be immediately followed by the below line
			$(div).after(remainingLot);
			emptyLots.splice(subCounter, 1); //1 apparently specifies only to splice out 1 element.  without it, it will splice out all elements following the subCounter position
			emptyLots.push(remainingLot);
			lotFilled = 1;
		}
		subCounter++;
	}
	if (lotFilled == 0){
		city.appendChild(div);
	}
}

function replicate(){
	var city = document.getElementById("city");
	height = mutateDimensions(this.height);
	width = mutateDimensions(this.width);
	red = mutateColor(this.red);
	green = mutateColor(this.green);
	blue = mutateColor(this.blue);
	makeBox(city, red, green, blue, height, width);
}

function mutateColor(number){
	mutationBase = Math.random() * 7;
	mutationSquare = Math.floor(mutationBase * mutationBase);
	addOrSubtract = Math.random();
	if (addOrSubtract < .5){
		mutationSquare = mutationSquare * -1;
	}
	return (number + mutationSquare);
}

function mutateDimensions(number){
	//IMPORTANT CONSIDERATION: I think there might be a bug in the code which makes it so that generated negative mutations which result in a below-0 return and maximum mutations which result in an above-255 return round to 0 / 255.  This behavior would be especially bad if my suspicion that the less-than-zero / greater-than-255 number were maintained into the next iteration of the mutation algorithm, because in that case it would have the 'entropic' coin-flip of being moved even further into the supposed-to-not-exist space of less-than-zero / greater-than-255 space it has drifted into.  This might be part of the cause for why local-minima finding during global-minima seeking is occuring.  To fix this issue will probably require a more complex +/- mutation-decision algorithm.  Probably with weights involved. 
	mutationBase = Math.random() * 3;
	mutationSquare = Math.floor(mutationBase * mutationBase);
	addOrSubtract = Math.random();
	if (addOrSubtract){
		mutationSquare = mutationSquare * -1;
	}
	return (number + mutationSquare);
}