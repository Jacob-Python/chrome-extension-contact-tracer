document.addEventListener('DOMContentLoaded', function() {
    navigator.geolocation.getCurrentPosition(showMap);
    // Request to SQL server to change value of lat,lon
    document.getElementById('send').addEventListener('click',function(){
    	document.getElementById("result1").innerHTML = ""
    	var latlon = document.getElementById('loc').innerHTML.split(",")
    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = function(){
    		document.getElementById('result').innerHTML = xhr.responseText;
    	}
    	xhr.open("GET","https://contacttracerapp.herokuapp.com/updatelatlon?lat="+latlon[0]+"&lon="+latlon[1],true);
    	xhr.send();
    })
    // Request to SQL server to change value of sick flag
    document.getElementById('send1').addEventListener('click',function(){
    	document.getElementById("result").innerHTML = ""
    	var latlon = document.getElementById('loc').innerHTML.split(",")
    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = function(){
    		document.getElementById('result1').innerHTML = xhr.responseText;
    	}
    	xhr.open("GET","https://contacttracerapp.herokuapp.com/updatesick?sick="+document.getElementById("sick").value,true);
    	xhr.send();
    });
    document.getElementById('send2').addEventListener('click',function(){
        document.getElementById("result").innerHTML = "";
        document.getElementById("result1").innerHTML = "";
        var latlon = document.getElementById('loc').innerHTML.split(",");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById('result2').innerHTML = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/infected",true);
        xhr.send();
    });
})

// Geolocation callback
function showMap(data){
    document.getElementById('loc').innerHTML = data.coords.latitude+","+data.coords.longitude;
}