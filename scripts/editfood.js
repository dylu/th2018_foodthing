/**
 * JS file for editFood.html
 */


/**
 * Just for testing purposes.
 */
function generateUser()
{

	var fooddb = [	["apple", 3, "units", "", ""], 
					["yogurt", 2, "cups", "Stonyfield, vanilla", ""], 
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
 * Create food list element
 */
function createElem(foodElem)
{
	var listelem;
	var elemName, elemNum, elemUnit, elemComm, elemPic;

	var divL, divM, divR;
	var elemImg;
	var tplaceholder;


	// Div: Left
	divL = document.createElement("div");
	divL.classList.add("food_div_L");

	elemImg = document.createElement("img");
	tplaceholder = foodElem[4];
	if (tplaceholder.length > 0)
	{
		elemImg.src = tplaceholder;
	}
	else
	{
		elemImg.src = "http://static.hdw.eweb4.com/media/wallpapers_1920x1200/animals/1/1/curious-cat-animal-hd-wallpaper-1920x1200-4257.jpg";
	}
	elemImg.classList.add("food_img");
	

	divL.appendChild(elemImg);


	// Div: Mid
	divM = document.createElement("div");
	divM.classList.add("food_div_M");

	elemName = document.createElement("span");
	elemName.innerHTML = foodElem[0];
	elemName.classList.add("food_name");

	elemComm = document.createElement("span");
	tplaceholder = foodElem[3];
	if (tplaceholder.length > 0)
	{
		elemComm.innerHTML = tplaceholder;
	}
	else
	{
		elemComm.innerHTML = "No Comments.";
	}
	elemComm.classList.add("food_comments");

	divM.appendChild(elemName);
	divM.appendChild(document.createElement("hr"));
	divM.appendChild(elemComm);


	// Div: Right
	divR = document.createElement("div");
	divR.classList.add("food_div_R");

	elemNum = document.createElement("div");
	elemNum.innerHTML = foodElem[1];
	elemNum.classList.add("food_num");

	elemUnit = document.createElement("div");
	elemUnit.innerHTML = " " + foodElem[2];
	elemUnit.classList.add("food_unit");

	divR.appendChild(elemNum);
	divR.appendChild(elemUnit);


	listelem = document.createElement("li");
	listelem.classList.add("foodElem");

	listelem.appendChild(divL);
	listelem.appendChild(divM);
	listelem.appendChild(divR);

	return listelem;
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
		// var elemName, elemNum, elemUnit, elemComm, elemPic;
		// var sepElem1, sepElem2, sepElem3;

		for (i = 0; i < fooddb.length; i++)
		{
			// elemName = document.createElement("span");
			// elemName.innerHTML = fooddb[i][0];
			// elemName.classList.add("food_name");

			// elemNum = document.createElement("span");
			// elemNum.innerHTML = fooddb[i][1];
			// elemNum.classList.add("food_num");

			// elemUnit = document.createElement("span");
			// elemUnit.innerHTML = " " + fooddb[i][2];
			// elemUnit.classList.add("food_unit");

			// elemComm = document.createElement("span");
			// elemComm.innerHTML = fooddb[i][3];
			// elemComm.classList.add("food_comments");

			// elemPic = document.createElement("span");
			// elemPic.innerHTML = fooddb[i][4];
			// elemPic.classList.add("food_picture");


			// sepElem1 = document.createElement("span");
			// sepElem1.innerHTML = " | ";
			// sepElem1.classList.add("food_separator");
			// sepElem2 = document.createElement("span");
			// sepElem2.innerHTML = " | ";
			// sepElem2.classList.add("food_separator");
			// sepElem3 = document.createElement("span");
			// sepElem3.innerHTML = " | ";
			// sepElem3.classList.add("food_separator");



			// listelem = document.createElement("li");
			// listelem.classList.add("foodElem");

			// listelem.appendChild(elemName);
			// listelem.appendChild(sepElem1);
			// listelem.appendChild(elemNum);
			// listelem.appendChild(elemUnit);

			// // If there are comments
			// if (fooddb[i][3].length > 0)
			// {
			// 	listelem.appendChild(sepElem2);
			// 	listelem.appendChild(elemComm);
			// }

			// // If there is a photo
			// if (fooddb[i][4].length > 0)
			// {
			// 	listelem.appendChild(sepElem3);
			// 	listelem.appendChild(elemPic);
			// }
			
			// listelem.appendChild(elemPic);

			listelem = createElem(fooddb[i]);

			flist.appendChild(listelem);
		}
	}
}


populateFood("");