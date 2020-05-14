let covpopup = true;
document.addEventListener('DOMContentLoaded', function() { 
    navigator.geolocation.getCurrentPosition(display);
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function(){
       if (xhr2.responseText == '1'){
            covpopup = true;
       } else {
            covpopup = false;
       }
    }
    xhr2.open("GET","https://contacttracerapp.herokuapp.com/popup",true);
    xhr2.send();
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){
       if (xhr1.responseText == '0'){
            document.getElementById("loc").hidden = true;
       } else {
            document.getElementById("loc").hidden = false;
       }
    }
    xhr1.open("GET","https://contacttracerapp.herokuapp.com/coords",true);
    xhr1.send();
    // Set slider value to server value.
    var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById("sick").value = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/issick",true);
        xhr.send();
    // Request to SQL server to change values
    document.getElementById("sett").addEventListener('click',function(){
        window.open("settings.html","_blank")
    })
    document.getElementById('send1').addEventListener('click',function(){
    	document.getElementById("result").innerHTML = ""
        document.getElementById("result2").innerHTML = ""
        document.getElementById("result3").innerHTML = "";
        document.getElementById("result4").innerHTML = "";
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
        document.getElementById("result4").innerHTML = "";
        var latlon = document.getElementById('loc').innerHTML.split(",");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById("result2").innerHTML = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/infected?lat="+latlon[0]+"&lon="+latlon[1],true);
        xhr.send();
    });
    // Request if you are at risk.
    document.getElementById('send3').addEventListener('click',function(){
        document.getElementById("result").innerHTML = "";
        document.getElementById("result1").innerHTML = "";
        document.getElementById("result2").innerHTML = "";
        document.getElementById("result4").innerHTML = "";
        var latlon = document.getElementById('loc').innerHTML.split(",");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById("result3").innerHTML = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/atrisk?lat="+latlon[0]+"&lon="+latlon[1],true);
        xhr.send();
    });
    // Request for history.
    document.getElementById('hi').addEventListener('click',function(){
        document.getElementById("result").innerHTML = "";
        document.getElementById("result1").innerHTML = "";
        document.getElementById("result2").innerHTML = "";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            document.getElementById("result4").innerHTML = xhr.responseText;
        }
        xhr.open("GET","https://contacttracerapp.herokuapp.com/history",true);
        xhr.send();
    });
    document.getElementById('so').addEventListener('click',function(){
        var win = window.open("https://contacttracerapp.herokuapp.com/logout","_blank")
        win.focus();
    });
    let tabURL;
    chrome.browserAction.setPopup({popup: "popup.html"})
        chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        tabURL = tabs[0].url;
    });
    chrome.cookies.get({"name":"covpopup","url":"https://contacttracerapp.herokuapp.com/"},function(cookie){
        try {
            var valueJSON = JSON.parse(cookie.value)
            console.log(valueJSON)
            if (tabURL == valueJSON.addr && valueJSON.covid == 1){
                document.getElementById("covidbanner").hidden = false;
            } else {
                document.getElementById("covidbanner").hidden = true;
            }
        } catch(e) {
        }
    })
})
function display(data){
    document.getElementById('loc').innerHTML = data.coords.latitude+","+data.coords.longitude;
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let tabURL;
    chrome.browserAction.setPopup({popup: "popup.html"})
        chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        tabURL = tabs[0].url;
        console.log(tabURL);
        if (request.covid == 1 && covpopup) {
            chrome.cookies.set({"url":"https://contacttracerapp.herokuapp.com/","name":"covpopup","value":JSON.stringify({"covid":1,"addr":tabURL})}, function (){})
            document.getElementById("covidbanner").hidden = false;
        } else {
            chrome.cookies.set({"url":"https://contacttracerapp.herokuapp.com/","name":"covpopup","value":JSON.stringify({"covid":0,"addr":tabURL})}, function (){})
            document.getElementById("covidbanner").hidden = true;
        }
    }); 
});