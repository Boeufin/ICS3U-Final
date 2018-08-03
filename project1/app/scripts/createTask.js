//Array with all the stored data.
var taskArr = [];

//Getting the elements and setting them as global variables.
var taskTitle = document.getElementById("new-task");
var taskDetails = document.getElementById("newDetails");
var addButton = document.getElementsByTagName("button")[0];
var incompletetaskList = document.getElementById("incomplete-tasks");
var listItem; 

//This function is being called by the for loop to add all the html elements.
function createNewTaskElement(arrData, index)
{
  //Creating the HTML elements for the one task.
  var listItem = document.createElement("li");
  var label = document.createElement("h3");
  var lbreak = document.createElement("br");
  var labeldesc = document.createElement("label");
  var tbreak = document.createElement("br");
  var editTextArea = document.createElement("textarea");
  var date = document.createElement("div");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var completeButton = document.createElement("button");
  var separater = document.createElement("hr");
  var iHolder = document.createElement("p");

  //If there is no input, this shows up.
  if (arrData["Name"] == "") {
    arrData["Name"] = "Untitled";
  }

  if (arrData["Description"] == "") {
    arrData["Description"] = "No Description";
  }

  //Adding tags and text and CSS to the elements.
  label.innerText = arrData["Name"];
  labeldesc.innerText = arrData["Description"];

  date.innerText = arrData["Date"];

  editTextArea.type = "textarea";
  editTextArea.style.resize = "none";

  listItem.style.top = "-50px";

  iHolder.style.display = "none";
  iHolder.innerText = index;

  //Position the date
  date.style.position ="relative";

  //Task Title position
  label.style.position = "relative";
  label.style.top = "-70px";

  //Edit Button CSS
  editButton.style.position = "relative";
  editButton.style.left = "225px";
  editButton.style.top = "-5px";

  //Complete Button CSS
  completeButton.style.position = "relative";
  completeButton.style.left = "140px";
  completeButton.style.top = "45px";

  //Details positioning
  labeldesc.style.position = "relative";
  labeldesc.style.top = "-60px"

  //Hiding the text area element Initially
  editTextArea.style.display = "none";
  
  //Adding the button classes and names inside the added task.
  editButton.innerText = "Edit";
  editButton.className = "edit";
  completeButton.innerText = "Complete";
  completeButton.className = "complete";

  //appending the created HTML elements to the HTML page.
  listItem.appendChild(editButton);
  listItem.appendChild(completeButton);
  listItem.appendChild(label);
  listItem.appendChild(lbreak);
  listItem.appendChild(editTextArea);
  listItem.appendChild(tbreak);
  listItem.appendChild(labeldesc);
  listItem.appendChild(date);
  listItem.appendChild(separater);
  listItem.appendChild(iHolder);

  return listItem;
}

//Binding functionality to the edit and complete buttons.
function bindTaskEvents(taskListItem)
{
  var editButton = taskListItem.querySelector("button.edit");
  var completeButton = taskListItem.querySelector("button.complete");

  editButton.onclick = editTask;

  completeButton.onclick = CompleteTask;
}

//Function that is being called when the complete button is pressed.
function CompleteTask() 
{  
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var tarInd = listItem.querySelector("p");

  ul.removeChild(listItem);

  taskArr.splice([tarInd.value],1);

  console.log(taskArr);
}

//Function that is being called when the edit button is pressed.
function editTask()
{
  //Introduces the elements of the task to the function.
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('textarea');
  var label = listItem.querySelector("label");
  var detailDesc = listItem.querySelector("textArea");
  var editTaskButton = listItem.querySelector("button");
  var iHold = listItem.querySelector("p");

  //Overwrites the edit input (what the new value is) to the item in the array.
  taskArr[iHold.innerText] = {Name: taskArr[iHold.innerText].Name, Description: editInput.value, Date: taskArr[iHold.innerText].Date, MDate: taskArr[iHold.innerText].MDate};

  //Hides and displays the text area for edits.
  if (detailDesc.style.display == "none") 
  {
    detailDesc.style.display = "block";
  } else 
  {
    detailDesc.style.display = "none";
  }

  //turns the class to editmode.
  var containsClass = listItem.classList.contains("editMode");

  if(containsClass) 
  {
    label.innerText = editInput.value;
  } else 
  {
    editInput.value = label.innerText;
  }

  if (detailDesc.style.display == "block") 
  {
    label.style.display = "none";
  } else 
  {
    label.style.display = "block";
  }

  //Changes the edit button to a save button.
  if (detailDesc.style.display == "none") 
  {
    editTaskButton.innerHTML = "Edit";
  } else 
  {
    editTaskButton.innerHTML = "Save";
  }

  listItem.classList.toggle("editMode");

  console.log(taskArr);
}

//addTask function pushes the input data to the array and calls the for loop.
function addTask()
{
  var td = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + "|" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  var taskDate = td.toString();

  var md = new Date();
  var mDate = md.getTime();

  //Adding the input values to the array
  taskArr.push({Name: taskTitle.value, Description: taskDetails.value, Date: taskDate, MDate: mDate});
  console.log(taskArr);

  //calling the for loop to create the elements.
  floop();

  //Adding the listed items to the incompleteTaskList.
  incompletetaskList.appendChild(listItem);

  //Calls the BindTaskEvents and passes in the buttons' function.
  bindTaskEvents(listItem);

 //Resets the values of the input field.
  taskTitle.value = "";
  taskDetails.value = "";
}

//Sets the task holder and the array to nothing.
function clearAll()
{
  document.getElementById("incomplete-tasks").innerText = "";
  taskArr = [];
  console.log(taskArr);
}

//makes the for loop easy to be called by other functions.
function floop () 
{
  for(var i = 0; i < taskArr.length; i++)
  {
    listItem = createNewTaskElement(taskArr[i], i);
  }
}

//sorts the functions by newest to oldest.
function sortNewOld()
{
  document.getElementById("incomplete-tasks").innerText = "";

  taskArr.sort(function(a,b) {return b.MDate - a.MDate});

  for(var i = 0; i < taskArr.length; i++) 
  {
    listItem = createNewTaskElement(taskArr[i], i);
    incompletetaskList.appendChild(listItem);
    bindTaskEvents(listItem);
  }
  console.log(taskArr);
}

//sorts the buttons from oldest to newest.
function sortOldNew() 
{
  document.getElementById("incomplete-tasks").innerText = "";

  taskArr.sort(function(a,b) {return a.MDate - b.MDate});

  for(var i = 0; i < taskArr.length; i++) 
  {
    listItem = createNewTaskElement(taskArr[i], i);
    incompletetaskList.appendChild(listItem);
    bindTaskEvents(listItem);
  }
  console.log(taskArr);
}