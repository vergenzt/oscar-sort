// Georgia Tech Oscar "Look Up Classes" Closed Filter
// version 0.1
// August 10, 2011
// Copyright (c) 2011, Tim Vergenz
// Released under the GNU GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Oscar Sort
// @description   Sorts closed classes below open classes in Oscar
// @match         https://oscar.gatech.edu/pls/bprod/bwskfcls.P_GetCrse
// ==/UserScript==

// get the list of classes on the page
var tables, classlist;
tables = document.getElementsByTagName('table');
for (var i = 0; i < tables.length; i++) {
	if( tables[i].className == "datadisplaytable" )
		classlist = tables[i];
}


// get the list of rows
var rows = classlist.getElementsByTagName("tr");
// insert temporary last row
var last = document.createElement("tr");
classlist.appendChild(last);
// variable for dealing with one class having multiple rows
var previousclosed = false;

// loop through each record until getting to temp row
var row;
for( var i=2; rows[i]!=last; i++ ) {
	row = rows[i];
	
	// store the status
	var status = row.getElementsByTagName("td")[0];
	
	if( !status ) {
		alert("Failed to get status for row number "+(i+1));
		continue;
	}
	
	// get whether it's closed or not
	var abbr = status.getElementsByTagName("abbr")[0];
	if( abbr ) abbr = abbr.innerHTML; // = "C" if closed
	else abbr = "";
	
	
	// if it is (a) closed or (b) the non-titled row after a closed row
	if( abbr=="C"  || (status.innerHTML=="&nbsp;" && previousclosed==true) ) {
		classlist.appendChild( row );
		i--;
		previousclosed = true;
	}
	else {
		previousclosed = false;
	}
	
}

// delete the temporary row
var newheader = document.createElement("th");
newheader.innerHTML = "Closed Classes";
newheader.setAttribute("class", "ddtitle");
newheader.setAttribute("colspan", "27");
last.parentNode.insertBefore( newheader, last );
last.parentNode.removeChild(last);


