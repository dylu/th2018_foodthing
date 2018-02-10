/**
 * JS file for editFood.html
 */
var fooddb;

// var startHold;
// var startX;
// var startY;

var currentClick;
var clickTime;
var editNew;
var editIdx;

var dc_delay = 800;


/**
 * Just for testing purposes.
 */
function generateUser()
{

	var tmpdb = [	["apple", 3, "units", "", ""], 
					["yogurt", 2, "cups", "Stonyfield, vanilla", ""], 
					["lemon juice", 4, "fl. oz", "", ""]];
	fooddb = tmpdb;

	return fooddb;
}


/*
 * Retrieves food from user
 */
function getFoodDB(user)
{
	return generateUser();
}


// function listenerR_ChangeNum()
// {

// }

// function listenerLM_SwipeDel(e)
// {
	
// }

function resetList()
{
	var flist = document.getElementById("foodList");
	while (flist.firstChild)
	{
		flist.removeChild(flist.firstChild);
	}

	populateFood("");
}

function hideEdits()
{
	document.getElementById("foodEdit").classList.add("hide");
	document.getElementById("editShroud").classList.add("hide");
}

function unhideEdits()
{
	document.getElementById("foodEdit").classList.remove("hide");
	document.getElementById("editShroud").classList.remove("hide");
}

function edit(elem)
{
	if (elem == null)
	{
		editNew = true;

		document.getElementById("fedit_name").innerHTML = "Name";
		document.getElementById("fedit_desc").innerHTML = "Desc";
		document.getElementById("fedit_num").innerHTML = "#";
		document.getElementById("fedit_unit").innerHTML = "Unit";
	}
	else
	{
		editNew = true;
		editIdx = -1;

		for (i = 0; i < fooddb.length; i++)
		{
			if (fooddb[i][0] == elem)
			{
				editIdx = i;
				editNew = false;
			}
		}

		if (!editNew)
		{
			document.getElementById("fedit_name").innerHTML = fooddb[editIdx][0];
			document.getElementById("fedit_desc").innerHTML = fooddb[editIdx][3];
			document.getElementById("fedit_num").innerHTML =  fooddb[editIdx][1];
			document.getElementById("fedit_unit").innerHTML = fooddb[editIdx][2];
		}
		else
		{
			document.getElementById("fedit_name").innerHTML = "Name";
			document.getElementById("fedit_desc").innerHTML = "Desc";
			document.getElementById("fedit_num").innerHTML = "#";
			document.getElementById("fedit_unit").innerHTML = "Unit";
		}
	}
	unhideEdits();
}


function sendEdits()
{
	var nname = document.getElementById("fedit_name").innerHTML;
	var nnum  = document.getElementById("fedit_num").innerHTML;
	var nunit = document.getElementById("fedit_unit").innerHTML;
	var ndesc = document.getElementById("fedit_desc").innerHTML;

	var newElem = [nname, nnum, nunit, ndesc, ""];

	// Base Case.
	if (nname == "Name")
	{
		return;
	}

	if (editNew)
	{
		// TODO: Add New Entry to DB.


		// update locally
		fooddb.push(newElem);
		console.log("adding new element");
		console.log(fooddb);
	}
	else
	{
		// TODO: Edit Existing Entry in DB.


		// update locally
		fooddb[editIdx] = newElem;
		console.log("editing old element");
		console.log(fooddb);
	}
}

function listener_clickShroud(e)
{
	sendEdits();

	hideEdits();

	resetList();
}

function listener_clickElem(e)
{
	var felemParent;
	felemParent = e.srcElement;
	if (felemParent != null && felemParent.className != "foodElem")
	{
		felemParent = felemParent.parentNode;
	}
	if (felemParent != null && felemParent.className != "foodElem")
	{
		felemParent = felemParent.parentNode;
	}
	if (felemParent != null && felemParent.className != "foodElem")
	{
		felemParent = felemParent.parentNode;
	}

	var currTime = new Date().getTime();

	if (!clickTime)
	{
		clickTime = currTime;
		if (!currentClick)
		{
			currentClick = felemParent;
		}
		return;
	}


	if ((clickTime + dc_delay > currTime) && currentClick == felemParent)
	{
		// edit(elem);
		// edit(e);
		edit(felemParent.childNodes[1].childNodes[0].innerHTML);
		// edit(felemParent)
	}
	else
	{
		clickTime = currTime;
		currentClick = felemParent;
	}
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
		elemComm.innerHTML = "No Description.";
	}
	elemComm.classList.add("food_comments");

	divM.appendChild(elemName);
	divM.appendChild(document.createElement("hr"));
	divM.appendChild(elemComm);


	// Div: Right
	divR = document.createElement("div");
	divR.classList.add("food_div_R");

	// divR.addEventListener("mousedown", );

	elemNum = document.createElement("div");
	elemNum.innerHTML = foodElem[1];
	elemNum.classList.add("food_num");

	elemUnit = document.createElement("div");
	elemUnit.innerHTML = foodElem[2];
	elemUnit.classList.add("food_unit");

	divR.appendChild(elemNum);
	divR.appendChild(elemUnit);


	listelem = document.createElement("li");
	listelem.classList.add("foodElem");

	// listelem.addEventListener("mousedown", listenerLM_SwipeDel);
	listelem.addEventListener("click", listener_clickElem)

	listelem.appendChild(divL);
	listelem.appendChild(divM);
	listelem.appendChild(divR);

	return listelem;
}


function createAddNewElem()
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
	elemImg.src = "https://lh3.googleusercontent.com/MjBg-tZSC0bzca-YbIa_IuR0-yHpXLfaINtdcEkF9ARE_xNArijKgt2ksQPYX6W-hA=w300";
	elemImg.classList.add("food_img");
	

	divL.appendChild(elemImg);


	// Div: Mid
	divM = document.createElement("div");
	divM.classList.add("food_div_M");

	elemName = document.createElement("span");
	elemName.innerHTML = "Add New";
	elemName.classList.add("food_name");

	elemComm = document.createElement("span");
	elemComm.innerHTML = "Double Click to Add New Entry.";
	elemComm.classList.add("food_comments");

	divM.appendChild(elemName);
	divM.appendChild(document.createElement("hr"));
	divM.appendChild(elemComm);


	// Div: Right
	divR = document.createElement("div");
	divR.classList.add("food_div_R");

	// divR.addEventListener("mousedown", );

	elemNum = document.createElement("div");
	elemNum.innerHTML = "-";
	elemNum.classList.add("food_num");

	elemUnit = document.createElement("div");
	elemUnit.innerHTML = "- -";
	elemUnit.classList.add("food_unit");

	divR.appendChild(elemNum);
	divR.appendChild(elemUnit);


	listelem = document.createElement("li");
	listelem.classList.add("foodElem");

	// listelem.addEventListener("mousedown", listenerLM_SwipeDel);
	listelem.addEventListener("click", listener_clickElem)

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
	if (!fooddb)
	{
		fooddb = getFoodDB(user);
	}
	var flist = document.getElementById("foodList");
	var emptyElem = document.getElementById("emptyList");

	document.getElementById("editShroud").addEventListener("click", listener_clickShroud)

	if (fooddb.length <= 0)
	{
		if (emptyElem)
		{
			emptyElem.classList.remove("hide");
		}
		
		// <li id="emptyList">
		// 	You have no food listed; would you like to add some?
		// </li>
	}
	else
	{
		if (emptyElem)
		{
			emptyElem.classList.add("hide");
		}
		

		var listelem;
		// var elemName, elemNum, elemUnit, elemComm, elemPic;
		// var sepElem1, sepElem2, sepElem3;

		for (i = 0; i < fooddb.length; i++)
		{

			listelem = createElem(fooddb[i]);

			flist.appendChild(listelem);
		}

		flist.appendChild(createAddNewElem());
	}
}


populateFood("");