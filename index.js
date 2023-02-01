let templ =	document.getElementById("paragon-template");
let cont =	document.getElementById("paragon-container");

let cellif = document.querySelector(".lif");
let celdam = document.querySelector(".dam");
let celarm = document.querySelector(".arm");
let celpen = document.querySelector(".pen");
let celres = document.querySelector(".res");
let celpot = document.querySelector(".pot");
let celpts = document.querySelector(".pts");
let celpoc = document.querySelector(".poc");

let life = 0;
let damage = 0;
let armor = 0;
let penetration = 0;
let resistance = 0;
let potency = 0;
let points = 0;
let pocket = 0;
//---------------------------------------------------------------------
function tekst_out ( oInfo, sel ) {
	if ( sel ) {
		ctext = "1";
		if (oInfo.dam) ctext = "DAM"+oInfo.dam+"/"+oInfo.dam;
		if (oInfo.lif) ctext = "LIF"+oInfo.lif+"/"+oInfo.lif;
		if (oInfo.arm) ctext = "ARM"+oInfo.arm+"/"+oInfo.arm;
		if (oInfo.pen) ctext = "PEN"+oInfo.pen+"/"+oInfo.pen;
		if (oInfo.pot) ctext = "POT"+oInfo.pot+"/"+oInfo.pot;
		if (oInfo.res) ctext = "RES"+oInfo.res+"/"+oInfo.res;
		if (oInfo.poc) ctext = "POC"+oInfo.poc+"/"+oInfo.poc;
	}
	else {
		ctext = "0";
		if (oInfo.dam) ctext = "DAM 0/"+oInfo.dam;
		if (oInfo.lif) ctext = "LIF 0/"+oInfo.lif;
		if (oInfo.arm) ctext = "ARM 0/"+oInfo.arm;
		if (oInfo.pen) ctext = "PEN 0/"+oInfo.pen; 
		if (oInfo.pot) ctext = "POT 0/"+oInfo.pot; 
		if (oInfo.res) ctext = "RES 0/"+oInfo.res; 
		if (oInfo.poc) ctext = "POC 0/"+oInfo.poc; 			
	}
	return ctext;
}
//---------------------------------------------------------------------
function results_out () {
    cellif.textContent = "LIFE = "+life*200;
    celdam.textContent = "DAMAGE = "+damage*20;
    celarm.textContent = "ARMOR = "+armor*4;
    celpen.textContent = "PENETRATION = "+penetration*4;
    celres.textContent = "RESISTANCE = "+resistance*4;
    celpot.textContent = "POTENCY = "+potency*4;
    celpts.textContent = "POINTS = "+points;
    celpoc.textContent = "POCKET DEEP = "+pocket;
    return;
}
//---------------------------------------------------------------------
function results_add ( oInfo ) {
    if( oInfo.lif > 0 ) life += oInfo.lif;
    if( oInfo.dam > 0 ) damage += oInfo.dam;
    if( oInfo.arm > 0 ) armor += oInfo.arm;
    if( oInfo.pen > 0 ) penetration += oInfo.pen;
    if( oInfo.res > 0 ) resistance += oInfo.res;
    if( oInfo.pot > 0 ) potency += oInfo.pot;
    if( oInfo.poc > 0 ) pocket += oInfo.poc;
    if( oInfo.lif > 0 ) points += oInfo.lif-1;
    if( oInfo.dam > 0 ) points += oInfo.dam-1;
    if( oInfo.arm > 0 ) points += oInfo.arm-1;
    if( oInfo.pen > 0 ) points += oInfo.pen-1;
    if( oInfo.res > 0 ) points += oInfo.res-1;
    if( oInfo.pot > 0 ) points += oInfo.pot-1;
    if( oInfo.poc > 0 ) points += oInfo.poc-1;
    points += 1;
	results_out();
	return;
}
//---------------------------------------------------------------------
function results_sub ( oInfo ) {
    if( oInfo.lif > 0 ) life -= oInfo.lif;
    if( oInfo.dam > 0 ) damage -= oInfo.dam;
    if( oInfo.arm > 0 ) armor -= oInfo.arm;
    if( oInfo.pen > 0 ) penetration -= oInfo.pen;
    if( oInfo.res > 0 ) resistance -= oInfo.res;
    if( oInfo.pot > 0 ) potency -= oInfo.pot;
    if( oInfo.poc > 0 ) pocket -= oInfo.poc;
    if( oInfo.lif > 0 ) points -= oInfo.lif-1;
    if( oInfo.dam > 0 ) points -= oInfo.dam-1;
    if( oInfo.arm > 0 ) points -= oInfo.arm-1;
    if( oInfo.pen > 0 ) points -= oInfo.pen-1;
    if( oInfo.res > 0 ) points -= oInfo.res-1;
    if( oInfo.pot > 0 ) points -= oInfo.pot-1;
    if( oInfo.poc > 0 ) points -= oInfo.poc-1;
    points -= 1;
	results_out();
	return;
}
//---------------------------------------------------------------------
function findByID(id) {
	for (let k of podaci)
		if (k.ID == id)
			return k;
	return null;
}
//---------------------------------------------------------------------
function findByID1(id) {
	for (let k of podaci)
		if (k.ID1 == id)
			return k;
	return null;
}
//---------------------------------------------------------------------
function findByID2(id) {
	for (let k of podaci)
		if (k.ID2 == id)
			return k;
	return null;
}
//---------------------------------------------------------------------
function klik( oInfo, celimg, celtxt ) {
	if (celimg.dataset.enabled == "false") 
		return null;
    if (celimg.dataset.selected == "false" ) {
    	celimg.dataset.selected = "true";
    	celtxt.dataset.selected = "true";
		celtxt.textContent = tekst_out( oInfo, 1 );
		for (let k of podaci ) {
			if( k.ID1 == oInfo.ID ) k.celimg.dataset.enabled = "true";
			if( k.ID2 == oInfo.ID ) k.celimg.dataset.enabled = "true";
		}
		results_add( oInfo );
		return null;
	}
 	for (let k of podaci ) {
		if( (k.ID1 == oInfo.ID) && 
			(k.celimg.dataset.selected == "true") )
			    return null;
	}
	for (let k of podaci ) {
		if( (k.ID2 == oInfo.ID) && 
			(k.celimg.dataset.selected == "true") )
			    return null;
	}
   	celimg.dataset.selected = "false";
   	celtxt.dataset.selected = "false";
   	tekst_out( oInfo, 0 );
	for (let k of podaci ) {
		if( k.ID1 == oInfo.ID ) k.celimg.dataset.enabled = "false";
		if( k.ID2 == oInfo.ID ) k.celimg.dataset.enabled = "false";
	}
	celtxt.textContent = tekst_out( oInfo, 0 );

	results_sub( oInfo );
	results_out();
    return null;
}
//---------------------------------------------------------------------

celpts.dataset.points = "true";
results_out();

for (let i = 1; i < 10; i++) 
{
	let paragon = templ.content.cloneNode(true);

	let header = paragon.querySelector(".header");
	let headerInfo = findByID(i * 100);
	if (headerInfo)
		header.textContent = headerInfo.Name;
 
	for (let x = 1; x < 6; x++) {
	for (let y = 1; y < 4; y++)	{
		let celID = 100*i+10*y+x;
		let oInfo = findByID(celID);
		if (oInfo == null) continue;
		let celipos = ".iy"+y+"x"+x;
		let celtpos = ".ty"+y+"x"+x;
 		let celimg = paragon.querySelector( celipos );
		let celtxt = paragon.querySelector( celtpos );

		let image = null;
 		let ctext = "0";
		if (oInfo.dam) { image = "Cdam.webp"; ctext = "DAM 0/" + oInfo.dam; };
		if (oInfo.lif) { image = "Clif.webp"; ctext = "LIF 0/" + oInfo.lif; };
		if (oInfo.arm) { image = "Carm.webp"; ctext = "ARM 0/" + oInfo.arm; };
		if (oInfo.pen) { image = "Cpen.webp"; ctext = "PEN 0/" + oInfo.pen; };
		if (oInfo.pot) { image = "Cpot.webp"; ctext = "POT 0/" + oInfo.pot; };
		if (oInfo.res) { image = "Cres.webp"; ctext = "RES 0/" + oInfo.res; };
		if (oInfo.poc) { image = "Cpoc.webp"; ctext = "POC 0/" + oInfo.poc; };

		if (image) celimg.dataset.krug = "true";
		if (!image) image = "S" + oInfo.ID + ".png";

		celimg.style.backgroundImage = "url(img/" + image + ")";
		celimg.dataset.selected = "false";

		if( oInfo.ID1 ) celimg.dataset.enabled = "false";
		else            celimg.dataset.enabled = "true";

		celtxt.textContent = ctext;

		oInfo.celimg = celimg;
		oInfo.celtxt = celtxt;
		celimg.addEventListener("click", function() 
			{ klik( oInfo, celimg, celtxt ) } );
	}}

	cont.appendChild(paragon);
}
