// XMLHttpRequest is not supported in older versions of IE and Edge.
// This function accounts for that.

function request(addr, outdiv, isinput){
	if (XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function(){
		if (isinput){
			document.getElementById(outdiv).value = xhr.responseText;
		} else {
        	document.getElementById(outdiv).innerHTML = xhr.responseText;
		}
    }
    xhr.open("GET",addr,true);
    xhr.send();
}

// Geolocation might be disabled/not supported.
// This function requests the server for the coordinates.

function latlon(){
	if (navigator.geolocation) {
		try {
			navigator.geolocation.getCurrentPosition(display);
		} catch(e) {
			console.error("Trouble getting location:"+e);
			getUserIpInfo();
		}
	} else {
		getUserIpInfo();
	}
}

// However, if the user doesn't, use ipinfo.io to get their location.
function getUserIpInfo(){
	if (XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function(){
		document.getElementById("loc").innerHTML = JSON.parse(xhr.responseText).loc.replace(" ","");
    }
    xhr.open("GET","https://ipinfo.io/json",true);
    xhr.send();
}


// If the user has geolocation, this callback should work.
function display(data){
    document.getElementById('loc').innerHTML = data.coords.latitude+","+data.coords.longitude;
}