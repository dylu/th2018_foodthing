var username1 = "Adrian";
var username2 = "David";

function createOneElement(nameI, amountI, unit){
	var foodBlock = document.createElement("div");
	foodBlock.setAttribute("class", "foodBlock");

	var name = document.createElement("div");
	name.setAttribute("class", "name");
	var nameText = document.createTextNode(nameI);
	name.appendChild(nameText);

	var amount = document.createElement("div");
	amount.setAttribute("class", "amount");
	var amountText = document.createTextNode(amountI + " " + unit);
	amount.appendChild(amountText);

	var checkButton = document.createElement("button");
	checkButton.setAttribute("class", "checkButton");
	var hyperLink = document.createElement("a");
	hyperLink.setAttribute("href", "sharer.html");
	var checkButtonText = document.createTextNode("check");
	hyperLink.appendChild(checkButtonText);
	checkButton.appendChild(hyperLink);

	foodBlock.appendChild(name);
	foodBlock.appendChild(amount);
	foodBlock.appendChild(checkButton);

	var anchor = document.getElementById("anchor");
	anchor.appendChild(foodBlock);
}

function search () {
	var elements = document.getElementsByClassName("foodBlock");
	while(elements.length > 0){
	    elements[0].remove();
	}
	var searchItem = document.getElementById("searchBar").value;
	console.log("in search " + searchItem);
	getFoodDB(searchItem);
}

function getExpireDate(expireAndDesc) {
	var expireDate = "";
	// console.log("expireAndDesc.length " + expireAndDesc.length);
	for (var i = 0; i < expireAndDesc.length; i++) {
		if (expireAndDesc.charAt(i) != '/') {
			console.log("expireAndDesc.charAt(i) " + expireAndDesc.charAt(i));
			expireDate = expireDate + expireAndDesc[i];
		}else {
			return new Date(expireDate);
		}
	}
}

function sortFood (foodList) {
	console.log(foodList[0].name);
	for (var i = 0; i < foodList.length; i++) {
		var d = getExpireDate(foodList[i].expire);
		console.log("converted " + d);
		foodList[i].expire = d;
	}
	foodList.sort(function(a,b){
	  // Turn your strings into dates, and then subtract them
	  // to get a value that is either negative, positive, or zero.
	  console.log("expire " + (b.expire - a.expire));
	  if(a.expire < b.expire) return -1;
      if(a.expire > b.expire) return 1;
      return 0;
	});
	for (var i = 0; i < foodList.length; i++) {
		createOneElement(foodList[i].name, foodList[i].amount, foodList[i].unit);
	}
}

function getFoodDB(food)
{	
	var database = firebase.database();
	var foodList = [];
	firebase.database().ref('users/').on('value', function(snapshot) {
		console.log(snapshot.val());
		var count = 0;
		console.log(Object.keys(snapshot.val()).length);
		for (var username in snapshot.val()){
			var ref = firebase.database().ref('users/' + username + '/food/' + food);
			ref.on('value', function(snapshot) {
				if (snapshot.val() == null) {
					
				}else {
					console.log("snapshot " + snapshot);
					foodList.push({name: username, amount: snapshot.val()[1], expire: snapshot.val()[3], unit: snapshot.val()[2]}); 
					count++;
					// createOneElement(snapshot.val()[0], snapshot.val()[1]);
				}
				
			});
			if (count == Object.keys(snapshot.val()).length) {
				console.log("foodList[0].name " + foodList[0].name);
				sortFood(foodList);
				return foodList;
			}

		}
	});
}
