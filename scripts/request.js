var username1 = "Adrian";
var username2 = "David";

function createOneElement(nameI, amountI){
	var foodBlock = document.createElement("div");
	foodBlock.setAttribute("class", "foodBlock");

	var name = document.createElement("div");
	name.setAttribute("class", "name");
	var nameText = document.createTextNode(nameI);
	name.appendChild(nameText);

	var amount = document.createElement("div");
	amount.setAttribute("class", "amount");
	var amountText = document.createTextNode(amountI);
	amount.appendChild(amountText);

	var checkButton = document.createElement("button");
	checkButton.setAttribute("class", "checkButton");
	var checkButtonText = document.createTextNode("check");
	checkButton.appendChild(checkButtonText);

	foodBlock.appendChild(name);
	foodBlock.appendChild(amount);
	foodBlock.appendChild(checkButton);

	var anchor = document.getElementById("anchor");
	anchor.appendChild(foodBlock);
}

function search () {
	var searchItem = document.getElementById("searchBar").value;
	console.log("in search " + searchItem);
	getFoodDB(searchItem);
}

// ref.on('value', function(snapshot) {
// 		console.log('db value call');

// 		for (var key in snapshot.val())
// 		{
// 			if (!snapshot.val().hasOwnProperty(key)) continue;

// 			var obj = snapshot.val()[key];
// 			fooddb.push(obj);

// 		}

// 	resetList();
// 	});

function getFoodDB(food)
{	
	var database = firebase.database();
	firebase.database().ref('users/').on('value', function(snapshot) {
		console.log(snapshot.val());
		for (var username in snapshot.val()){
			var ref = firebase.database().ref('users/' + username + '/food/' + food);
			ref.on('value', function(snapshot) {
				createOneElement(snapshot.val()[0], snapshot.val()[1]);
			});
		}
	});

	return ;
}
