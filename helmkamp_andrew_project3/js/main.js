/****************
*Andrew Helmkamp
*VFW 1212
*Project 2
*Javascript file
****************/

window.addEventListener("DOMContentLoaded", function() {

	//"Global" Variables
	var highlightedValue = "No";
	var hideForm = false;

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

	function toggleForm () {
		if (hideForm) {
			$('todoForm').style.display = "none";
			$('display').style.display = "none";
			$('add').style.display = "inline";
		} else{
			$('todoForm').style.display = "block";
			$('display').style.display = "inline";
			$('add').style.display = "none";
			$('items').style.display = "none";
		};
	};

	function getData () {
		if (localStorage.length >= 1) {
			hideForm = true;
			toggleForm();
			//Write data from local storage to the browser
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute("id", "items");
			var makeList = document.createElement('ul');
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			$('items').style.display = "block";
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
		} else{
			alert("There is no data to display.");
		};
	};

	function addItem () {
		hideForm = false;
		toggleForm();
		window.location.reload();
		return false;
	}

	function clearLocal () {
		var del = confirm("Are you sure you want to delete all data?")
		if ((del) && (localStorage.length >= 1)) {
			localStorage.clear();
			alert("All data has been cleared.");
			window.location.reload();
			return false;
		} else {
			alert("There is no data to clear.");
		};
	}

	
	//Set Link and Submit Click Events
	var displayLink = $('display');
	displayLink.addEventListener("click", getData);
	var addLink = $('add');
	addLink.addEventListener("click", addItem);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);



});