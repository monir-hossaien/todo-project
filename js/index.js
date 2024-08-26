
import { Todo } from "./classes/todo.js";
// finding element
const form= document.querySelector("form");
const input=form.querySelector("#element");
const listElement=document.querySelector("#lists");
const notification=document.querySelector("#message");


const createTodo=(newTodo)=>{
    const todoElement=document.createElement("li");
    todoElement.id= newTodo.todoId;
    listElement.appendChild(todoElement);
    todoElement.innerHTML=`
    <span>${newTodo.todoValue}</span>
    <span><button class="btn" id="delbtn"><i class="bi bi-trash"></i></button></span>
    `;
    todoElement.classList.add("li-style");

    const deleteButton=todoElement.querySelector("#delbtn");
    deleteButton.addEventListener("click",deleteTodo);
    

}

//to do delete
const deleteTodo=(e)=>{
    const selectedTodo=e.target.parentElement.parentElement.parentElement;
    listElement.removeChild(selectedTodo);
    showMessage("todo is deleted","danger");
    let todos=getTodo();
    todos=todos.filter((todo)=>todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));   
}

const showMessage=(text,status)=>{
    notification.textContent= text
    notification.classList.add(`${status}`);
    setTimeout(()=>{
        notification.textContent="";
        notification.classList.remove(`${status}`);
    },1000)
}

let getTodo=()=>{
    return localStorage.getItem("mytodos")? JSON.parse(localStorage.getItem("mytodos")):[];
}

//add to do function
const addTodo=(event)=>{
    event.preventDefault();
    const todoValue=input.value
    //unique id
    const todoId= Date.now().toString();
    const newTodo=new Todo(todoId,todoValue);
    createTodo(newTodo);
    showMessage("todo is created","success");
    //adding value in localstorage
    const todos=getTodo();
    todos.push(newTodo);
    localStorage.setItem("mytodos", JSON.stringify(todos));
    input.value="";
    

}


//add listner
form.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded", function loadTodo(){
    const todos=getTodo();
    todos.map((todo)=>createTodo(todo));
});

