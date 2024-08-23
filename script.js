let todos = [];
function addTodo() {
  if(document.querySelector("input").value==""){
    alert("Please Write a Todo!")
    return
  }
  todos.push({
    title: document.querySelector("input").value
  })
  render()
  document.querySelector("input").value = "";
}
function deleteTodo(index){
  todos.splice(index,1)
  render()

}

function createTodoComponent(todo,index) {
  const div = document.createElement("div");
  div.setAttribute("class", "todo")


  
  const h2 = document.createElement("h2");
  const divBtn = document.createElement("div")
  const buttonD = document.createElement("button");
  const buttonE = document.createElement("button");
  

  buttonD.setAttribute("class","delBtn")
  buttonE.setAttribute("class","editBtn")
  divBtn.setAttribute("id", "btn")

  const imgD = document.createElement("img");
  imgD.setAttribute("style", "width: 18px;")
  imgD.setAttribute("src", "/minus.png")
  buttonD.appendChild(imgD);
  const imgE = document.createElement("img");
  imgE.setAttribute("style", "width: 18px;")
  imgE.setAttribute("src", "/edit.png")
  buttonE.appendChild(imgE);
  h2.innerHTML = index+1 + ". " + todo.title;

  const value = todo.title;



  

  
  
  buttonD.setAttribute("onclick", "deleteTodo(" + index + ")")
  buttonE.onclick=function(){
    const editVal=prompt("Edit your task...",value);
    if(editVal){
      h2.innerHTML= index+1 + ". " + editVal
    }
  }
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
}