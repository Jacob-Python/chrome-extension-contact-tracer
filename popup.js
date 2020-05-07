document.addEventListener('DOMContentLoaded', function() {
    navigator.geolocation.getCurrentPosition(display);
    // Set slider value to server value.
    var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById("sick").value = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/issick",true);
        xhr.send();
    // Request to SQL server to change values
    document.getElementById('send1').addEventListener('click',function(){
    	document.getElementById("result").innerHTML = ""
        document.getElementById("result2").innerHTML = ""
        document.getElementById("result3").innerHTML = "";
    	var latlon = document.getElementById('loc').innerHTML.split(",")
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById("result1").innerHTML = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/update?sick="+document.getElementById("sick").value+"&lat="+latlon[0]+"&lon="+latlon[1],true);
        xhr.send();
    })
    // Request for infectedness using the Haversine formula.
    document.getElementById('send2').addEventListener('click',function(){
        document.getElementById("result").innerHTML = "";
        document.getElementById("result1").innerHTML = "";
        document.getElementById("result3").innerHTML = "";
        var latlon = document.getElementById('loc').innerHTML.split(",");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById("result2").innerHTML = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/infected?lat="+latlon[0]+"&lon="+latlon[1],true);
        xhr.send();
    });
    // Request for history.
    document.getElementById('hi').addEventListener('click',function(){
        document.getElementById("result").innerHTML = "";
        document.getElementById("result1").innerHTML = "";
        document.getElementById("result2").innerHTML = "";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById("result3").innerHTML = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/history",true);
        xhr.send();
    });
    document.getElementById('so').addEventListener('click',function(){
        var win = window.open("https://contacttracerapp.herokuapp.com/logout","_blank")
        win.focus();
    });
})
function display(data){
    document.getElementById('loc').innerHTML = data.coords.latitude+","+data.coords.longitude;
}