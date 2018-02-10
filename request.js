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

function loadFood (){
	var database = firebase.database();
	var ref = firebase.database().ref('test/username');
	firebase.database().ref('test').set({
	    username: "test"
	  });
	ref.on('value', function(snapshot) {
	  console.log("read " + snapshot.val());
	});
	createOneElement("apple", 1);
	createOneElement("banana", 2);
	createOneElement("banana", 3);
}