document.addEventListener("DOMContentLoaded", function (){
	var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){
      document.getElementById("alert").value = xhr1.responseText;
    }
    xhr1.open("GET","https://contacttracerapp.herokuapp.com/popup",true);
    xhr1.send();
    xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function(){
      document.getElementById("display").value = xhr2.responseText;
    }
    xhr2.open("GET","https://contacttracerapp.herokuapp.com/coords",true);
    xhr2.send();
    document.getElementById("ok").addEventListener("click", function(){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          console.log(xhr.responseText);
      }
      xhr.open("GET","https://contacttracerapp.herokuapp.com/updates?popup="+document.getElementById("alert").value+"&coords="+document.getElementById("display").value,true);
      xhr.send();
    })
})
