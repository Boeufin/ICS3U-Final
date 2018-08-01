//Getting the elements and setting them as global variables.
var taskTitle = document.getElementById("new-task");
var taskDetails = document.getElementById("newDetails");
var addButton=document.getElementsByTagName("button")[0];
var incompletetaskList=document.getElementById("incomplete-tasks");


//Takes the two inputs and translates them to taskString and detailsInput within this function.
function createNewTaskElement(taskString, detailsInput)
{
  //Creating the HTML elements for the one task.
  var listItem = document.createElement("li");
  var date = document.createElement("div");
  var label = document.createElement("h3");
  var lbreak = document.createElement("br");
  var labeldesc = document.createElement("label");
  var tbreak = document.createElement("br");
  var editTextArea = document.createElement("textarea");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var completeButton = document.createElement("button");
  var separater = document.createElement("hr");

  if (taskString == "") {
    taskString = "Untitled";
  }

  if (detailsInput == "") {
    detailsInput = "No Description";
  }
  //Adding tags and text and class and CSS to the elements.
  label.innerText = taskString;
  date.innerText = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
  labeldesc.innerText = detailsInput;
  editTextArea.type = "textarea";
  editTextArea.style.resize = "none";

  //Edit Button CSS
  editButton.style.position = "relative";
  editButton.style.left = "235px";
  editButton.style.top = "-50px";

  //Complete Button CSS
  completeButton.style.position = "relative";
  completeButton.style.left = "150px";
  completeButton.style.top = "0px";

  //Hiding the text area element Initially
  editTextArea.style.display = "none";
  
  //Adding the button classes and names inside the added task.
  editButton.innerText="Edit";
  editButton.className="edit";
  completeButton.innerText="Complete";
  completeButton.className="complete";

  // Date : YYYY-MM-DD:hh-mm-ss
  //appending the created HTML elements to the HTML page.
  listItem.appendChild(label);
  listItem.appendChild(lbreak);
  listItem.appendChild(labeldesc);
  listItem.appendChild(tbreak);
  listItem.appendChild(editButton);
  listItem.appendChild(completeButton);
  listItem.appendChild(editTextArea);
  listItem.appendChild(date);
  listItem.appendChild(separater);
  return listItem;
}


//Completes the task.
function CompleteTask() 
{
    
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);
}

//Gives functionality to the edit and complete buttons.
function bindTaskEvents(taskListItem)
{
  
  var editButton=taskListItem.querySelector("button.edit");
  var completeButton=taskListItem.querySelector("button.complete");

  editButton.onclick=editTask;
  completeButton.onclick=CompleteTask;
}

//addTask function calls the createTask function above.
function addTask()
{
  var listItem = createNewTaskElement(taskTitle.value, taskDetails.value);
  //Adding the listed items to the incompleteTaskList.
  incompletetaskList.appendChild(listItem);
  //Calls the BindTaskEvents and passes in the listed Items.
  bindTaskEvents(listItem);

 //Resets the values of the input field.
  taskTitle.value="";
  taskDetails.value="";
}

//Edit the existing text area.
function editTask()
{
  var listItem = this.parentNode;//Targets the part of the list that the button was clicked by.
  var editInput = listItem.querySelector('textarea');
  var label = listItem.querySelector("label");
  var detailDesc = listItem.querySelector("textArea");
  var editTaskButton = listItem.querySelector("button");
  //Hides and displays the text area for edits.
  if (detailDesc.style.display == "none") {
    detailDesc.style.display = "block";
  } else {
    detailDesc.style.display = "none";
  }

  //turns the class to editmode.
  var containsClass=listItem.classList.contains("editMode");
  if(containsClass){
    label.innerText=editInput.value;
  } else {
      editInput.value=label.innerText;
  }

  if (detailDesc.style.display == "none") {
    editTaskButton.innerHTML = "Edit";
  } else {
    editTaskButton.innerHTML = "Save";
  }

  listItem.classList.toggle("editMode");
}

function clearAll()
{
document.getElementById("incomplete-tasks").innerText = "";
}