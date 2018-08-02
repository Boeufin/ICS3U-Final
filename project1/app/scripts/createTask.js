//Array
var taskArr = [];

//Getting the elements and setting them as global variables.
var taskTitle = document.getElementById("new-task");
var taskDetails = document.getElementById("newDetails");
var addButton=document.getElementsByTagName("button")[0];
var incompletetaskList=document.getElementById("incomplete-tasks");

//Takes the two inputs and translates them to taskString and detailsInput within this function.
//Needs to push to array.
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

  incompletetaskList.appendChild(listItem);

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

//addTask function calls the createTask function above.
function addTask()
{
  var td = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + "|" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  var taskDate = td.toString();
  
  taskArr.push({Name: taskTitle.value, Description: taskDetails.value, Date: taskDate});
  console.log(taskArr);

  incompletetaskList.innerHTML = "";

  floop();

  //Adding the listed items to the incompleteTaskList.

  //Calls the BindTaskEvents and passes in the buttons function.
  bindTaskEvents(listItem);

 //Resets the values of the input field.
  taskTitle.value = "";
  taskDetails.value = "";
}

//Completes the task.
function CompleteTask() 
{  
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var tarInd = listItem.querySelector("p");

  taskArr.splice([tarInd.value],1);

  floop(); 

  ul.removeChild(listItem);

}

//Edit the existing text area.
function editTask()
{
  var listItem = this.parentNode;//Targets the button that was just clicked for the element.
  var editInput = listItem.querySelector('textarea');
  var label = listItem.querySelector("label");
  var detailDesc = listItem.querySelector("textArea");
  var editTaskButton = listItem.querySelector("button");
  var iHold = listItem.querySelector("p");

  //Hides and displays the text area for edits.
  if (detailDesc.style.display == "none") {
    detailDesc.style.display = "block";
  } else {
    detailDesc.style.display = "none";
  }

  document.getElementById("");

  //turns the class to editmode.
  var containsClass = listItem.classList.contains("editMode");

  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  //Overwrites the edit input (what the new value is) to the thing in the array.
  taskArr[iHold.innerText] = {Name: taskArr[iHold.innerText], Description: editInput.value, Date: new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + "|" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()};

  if (detailDesc.style.display == "block") {
    label.style.display = "none";
  } else {
    label.style.display = "block";
  }

  //Changes the edit button to a save button.
  if (detailDesc.style.display == "none") {
    editTaskButton.innerHTML = "Edit";
  } else {
    editTaskButton.innerHTML = "Save";
  }

  listItem.classList.toggle("editMode");
}

//Sets the task holder to nothing.
function clearAll()
{
  document.getElementById("incomplete-tasks").innerText = "";
}

function sortNewOld() {

}

function floop() {
  for( var i = 0; i < taskArr.length; i++) {
    listItem = createNewTaskElement(taskArr[i], i);
  }
}