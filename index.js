let templ =	document.getElementById("paragon-template");
let cont =	document.getElementById("paragon-container");

function findByID(id) {
	for (let k of podaci)
		if (k.ID == id)
			return k;
	return null;
}
function findByID1(id) {
	for (let k of podaci)
		if (k.ID1 == id)
			return k;
	return null;
}
function findByID2(id) {
	for (let k of podaci)
		if (k.ID2 == id)
			return k;
	return null;
}
function klik( oInfo, celimg, celtxt ) {
// ako čelija nije omogućena izađi
	if (celimg.dataset.enabled == "false") return null;
    console.log ( "klik");
// --------------------------------------------------
// ako čelija nije bila selektirana
// selektiraj je i omoguci povezane čelije
    if (celimg.dataset.selected == "false" ) {
    	celimg.dataset.selected = "true";
    	celtxt.dataset.selected = "true";
		for (let k of podaci ) {
			if( k.ID1 == oInfo.ID ) k.celimg.dataset.enabled = "true";
			if( k.ID2 == oInfo.ID ) k.celimg.dataset.enabled = "true";
		}
// napravi matematiku
// ispiši u celtxt
	    console.log( "select");
		return null;
	}
// ---------------------------------------------------
// ako čelija selektirana
// niti jedna povezana čelija ne smije biti selektirana
	console.log( "pokušaj deselect");
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
// deselektiraj čeliju
// i onemogući vezane čelije
	console.log( "deselect");
   	celimg.dataset.selected = "false";
   	celtxt.dataset.selected = "false";
	for (let k of podaci ) {
		if( k.ID1 == oInfo.ID ) k.celimg.dataset.enabled = "false";
		if( k.ID2 == oInfo.ID ) k.celimg.dataset.enabled = "false";
	}
// napravi matematiku
// ispiši u celtxt
    return null;
}

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
		celtxt.textContent = ctext;
		celimg.dataset.selected = "false";
		if( oInfo.ID1 ) celimg.dataset.enabled = "false";
		else            celimg.dataset.enabled = "true";

		oInfo.celimg = celimg;
		oInfo.celtxt = celtxt;
		celimg.addEventListener("click", function() 
			{ klik( oInfo, celimg, celtxt ) } );

	}}

	cont.appendChild(paragon);
}
