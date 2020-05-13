let uint = 0;
window.onload = function() {
	if (uint == 0){
		// Find instances of "coronavirus" in page
		let r = 0;
		var keyPhrases = ["coronavirus", "covid-19","sars-cov-2","2019-ncov"];
		for (const key in keyPhrases){
			if (document.documentElement.innerHTML.toLowerCase().indexOf(key) != -1){
				r = 1;
		    }
		}
		// Add alert button
		chrome.runtime.sendMessage({"covid": r == 1}, function(response){});
		uint ++;
	}
}