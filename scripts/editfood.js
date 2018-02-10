/**
 * JS file for editFood.html
 */


/**
 * Just for testing purposes.
 */
function generateUser()
{

	var fooddb = [	["apple", 3, "units", "", ""], 
					["yogurt", 2, "cartons", "vanilla, Stonyfield", ""], 
					["lemon juice", 4, "fl. oz", "", ""]];
	return fooddb;
}


/*
 * Retrieves food from user
 */
function getFoodDB(user)
{
	return generateUser();
}


/**
 * Populate food
 */
function populateFood(user)
{
	var fooddb = getFoodDB(user);
	var flist = document.getElementById("foodList");
	var emptyElem = document.getElementById("emptyList");

	if (fooddb.length <= 0)
	{
		// <li id="emptyList">
		// 	You have no food listed; would you like to add some?
		// </li>
	}
	else
	{
		emptyElem.parentNode.removeChild(emptyElem);

		var listelem;
		var elemName, elemNum, elemUnit, elemComm, elemPic;
		var sepElem1, sepElem2, sepElem3;

		for (i = 0; i < fooddb.length; i++)
		{
			elemName = document.createElement("span");
			elemName.innerHTML = fooddb[i][0];
			elemName.classList.add("food_name");

			elemNum = document.createElement("span");
			elemNum.innerHTML = fooddb[i][1];
			elemNum.classList.add("food_num");

			elemUnit = document.createElement("span");
			elemUnit.innerHTML = " " + fooddb[i][2];
			elemUnit.classList.add("food_unit");

			elemComm = document.createElement("span");
			elemComm.innerHTML = fooddb[i][3];
			elemComm.classList.add("food_comments");

			elemPic = document.createElement("span");
			elemPic.innerHTML = fooddb[i][4];
			elemPic.classList.add("food_picture");


			sepElem1 = document.createElement("span");
			sepElem1.innerHTML = " | ";
			sepElem1.classList.add("food_separator");
			sepElem2 = document.createElement("span");
			sepElem2.innerHTML = " | ";
			sepElem2.classList.add("food_separator");
			sepElem3 = document.createElement("span");
			sepElem3.innerHTML = " | ";
			sepElem3.classList.add("food_separator");



			listelem = document.createElement("li");

			listelem.appendChild(elemName);
			listelem.appendChild(sepElem1);
			listelem.appendChild(elemNum);
			listelem.appendChild(elemUnit);

			// If there are comments
			if (fooddb[i][3].length > 0)
			{
				listelem.appendChild(sepElem2);
				listelem.appendChild(elemComm);
			}

			// If there is a photo
			if (fooddb[i][4].length > 0)
			{
				listelem.appendChild(sepElem3);
				listelem.appendChild(elemPic);
			}
			
			// listelem.appendChild(elemPic);

			flist.appendChild(listelem);
		}
	}
}


populateFood("");