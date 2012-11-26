/****************
*Andrew Helmkamp
*VFW 1212
*Project 2
*Javascript file
****************/

window.addEventListener("DOMContentLoaded", function() {

	//getElementById Function
	function $ (x) {
		var theElement = document.getElementById(x);
		return theElement;
	}

	function getHighlightedValue() {
		if ($('highlight').checked) {
			highlightedValue = $('highlight').value;
		} else{
			highlightedValue = "No";
		};
	}

	function storeData() {
		var id = Math.floor(Math.random()*1000000001);
		//Gather data from form and store in an object
		//Object properties contain array with the form label and value
		getHighlightedValue();
		var item = {};
			item.startDate   = ["Start Date:", $('start').value];
			item.endDate     = ["End Date:", $('end').value];
			item.itemName    = ["Item Name:", $('itemName').value];
			item.category    = ["Category:", $('category').value];
			item.priority    = ["Priority:", $('priority').value];
			item.highlighted = ["Highlighted:", highlightedValue];
			item.comments    = ["Comments:", $('comments').value];

		//Save data into local storage using Stringify
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item Saved");
	};

	function getData () {
		//Write data from local storage to the browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for (var i = 0; i < localStorage.length; i++) {
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the value back to an object
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
			};
		};
	};

	function clearLocal () {
		var del = confirm("Are you sure you want to delete all data?")
		if (del) {
			localStorage.clear();
		};
	}

	//"Global" Variables
	var highlightedValue = "No";


	//Set Link and Submit Click Events
	var displayLink = $('display');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);



});