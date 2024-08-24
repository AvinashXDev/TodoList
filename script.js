let todos = [];
const input = document.querySelector("input");
function addTodo() {
  if(input.value==""){
    alert("Please Write a Todo!")
    return
  }
  todos.push({
    title: input.value,
    completed:false // Adding a 'completed' property to track the task status
  })
  render()
  input.value = "";
  updateProgressBar()
}

// added event listener on enter key for input
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("addBtn").click();
  }
});
function deleteTodo(index){
  todos.splice(index,1)
  render()
  updateProgressBar()


}


function toggleComplete(index) {
  todos[index].completed = !todos[index].completed; // Toggle the completed status
  render();
  updateProgressBar()
}

function updateProgressBar() {
  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const progressPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  document.getElementById("progress-bar").style.width = progressPercent + "%";
}


function createTodoComponent(todo,index) {
  const div = document.createElement("div");
  div.setAttribute("class", "todo")


  
  const h2 = document.createElement("h2");
  const divBtn = document.createElement("div")
  const buttonD = document.createElement("button");
  const buttonE = document.createElement("button");
  const inputc = document.createElement("input");

   inputc.setAttribute("class", "checkbox");
  inputc.setAttribute("type", "checkbox");
  inputc.checked = todo.completed; // Set the checkbox based on the 'completed' status
  inputc.addEventListener("change", function() {
      toggleComplete(index); // Call toggleComplete when checkbox is changed
  });

  

  buttonD.setAttribute("class","delBtn")
  buttonE.setAttribute("class","editBtn")
  divBtn.setAttribute("id", "btn")

  const imgD = document.createElement("img");
  imgD.setAttribute("style", "width: 18px;")
  imgD.setAttribute("src", "https://i.postimg.cc/wjKYQzj4/minus.png")
  buttonD.appendChild(imgD);
  const imgE = document.createElement("img");
  imgE.setAttribute("style", "width: 18px;")
  imgE.setAttribute("src", "https://i.postimg.cc/GpWDcHLJ/edit.png")
  buttonE.appendChild(imgE);
  
 const todoText = document.createElement("span");
  todoText.textContent = index + 1 + ". " + todo.title;
  h2.append(inputc);
  h2.append(todoText);

  // Input field for editing (initially hidden)
  const editInput = document.createElement("input");
  editInput.setAttribute("type", "text");
  editInput.value = todo.title;
  editInput.className = "edit-input";
  editInput.style.display = "none"; // Hidden by default

  // Display strikethrough if the task is completed
  if (todo.completed) {
      h2.classList.add("strikethrough");
  } else {
      h2.classList.remove("strikethrough");
  }



  

  
  
  buttonD.setAttribute("onclick", "deleteTodo(" + index + ")")
   buttonE.onclick = function() {
      todoText.style.display = "none"; // Hide the text
      editInput.style.display = "inline-block"; // Show the input field
      editInput.focus(); // Focus on the input field for immediate editing
  };

  // When editing is done (either by pressing Enter or losing focus)
  editInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          finishEditing();
      }
  });

  editInput.addEventListener("blur", function() {
      finishEditing();
  });

  function finishEditing() {
      const newValue = editInput.value.trim();
      if (newValue) {
          todos[index].title = newValue; // Update the title in the todos array
          render(); // Re-render the list
      } else {
          editInput.value = todo.title; // Revert to the original title if input is empty
          todoText.style.display = "inline-block"; // Show the original text
          editInput.style.display = "none"; // Hide the input field
      }
  }

  h2.append(editInput); // Append the input field for editing

  div.append(h2)
  divBtn.append(buttonD)
  divBtn.append(buttonE)
  div.append(divBtn)
  return div
}

// react 
function render() {
  document.querySelector("#todos").innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const element = createTodoComponent(todos[i], i);
    document.querySelector("#todos").appendChild(element)
  }
  updateProgressBar()

}
