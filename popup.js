document.addEventListener('DOMContentLoaded', function() {
    navigator.geolocation.getCurrentPosition(showMap);
    document.getElementById('send').addEventListener('click',function(){
    	var latlon = document.getElementById('loc').innerHTML.split(",")
    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = function(){
    		document.getElementById('result').innerHTML = xhr.responseText;
    	}
    	xhr.open("GET","https://contacttracerapp.herokuapp.com/updatelatlon?lat="+latlon[0]+"&lon="+latlon[1],true);
    	xhr.send();
    })
    document.getElementById('send1').addEventListener('click',function(){
    	var latlon = document.getElementById('loc').innerHTML.split(",")
    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = function(){
    		document.getElementById('result1').innerHTML = xhr.responseText;
    	}
    	xhr.open("GET","https://contacttracerapp.herokuapp.com/updatesick?sick="+document.getElementById("sick").value,true);
    	xhr.send();
    })
})

function showMap(data){
    document.getElementById('loc').innerHTML = data.coords.latitude+","+data.coords.longitude;
}