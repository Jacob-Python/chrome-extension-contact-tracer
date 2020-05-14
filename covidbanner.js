let uint = 0;
window.onload = function() {
	covidfun();
}
function covidfun(){
	if (uint == 0){
		// Find instances of "coronavirus" in page
		let r = 0;
		var keyPhrases = ["severe acute respiratory syndrome coronavirus 2", "coronavirus", "covid-19","sars-cov-2","2019-ncov","coronavirus pandemic", "2019-20 coronavirus pandemic", "coronavirus disease 2019"];
		for (const key in keyPhrases){
			if (document.title.toLowerCase().indexOf(key) != -1 || document.documentElement.innerHTML.toLowerCase().indexOf(key) != -1 || decodeURIComponent(window.location.href.toLowerCase().replace("+"," ")).indexOf(key) != -1){
				r = 1;
		    }
		}
		// Add alert button
		chrome.runtime.sendMessage({"covid": r}, function(response){});
		uint ++;
	}
}