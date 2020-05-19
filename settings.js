document.addEventListener("DOMContentLoaded", function (){
  let loggedin = true;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.responseText == "True"){
      loggedin = true;
      document.getElementById("settings-container").hidden = false;
      document.getElementById("not-logged-in").hidden = true;
    } else {
      loggedin = false;
      document.getElementById("not-logged-in").hidden = false;
      document.getElementById("settings-container").hidden = true;
    }
  }
  xhr.open("GET","https://contacttracerapp.herokuapp.com/loggedin",true);
  xhr.send();
  if (loggedin){
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function(){
      document.getElementById("display").value = xhr2.responseText;
    }
    xhr2.open("GET","https://contacttracerapp.herokuapp.com/coords",true);
    xhr2.send();
  }
  document.getElementById("ok").addEventListener("click", function(){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(xhr.responseText);
    }
    xhr.open("GET","https://contacttracerapp.herokuapp.com/updates?coords="+document.getElementById("display").value,true);
    xhr.send();
  })
})
