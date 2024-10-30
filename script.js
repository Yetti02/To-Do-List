 // alert("hello")





const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos(); // Load existing todos from local storage
//console.log(allTodos);
updateTodoList();  // Display existing todos on page load  


todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); /*stops the default action from happening, stops page from reloading.*/
    addTodo();
});

// Function to add a new todo 
function addTodo() {
    const todoText = todoInput.value.trim();//removes extra spaces left and right[trim]
    if(todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObject);// Add new todo to the array 
        console.log("Added Todo:", todoObject); // Debugging
         updateTodoList(); // Update the display  
        saveTodos();  // Save to local storage
        todoInput.value = ""; // Clear the input field  
    } 
} 
// Function to update the displayed todo list 
function updateTodoList(){
    todoListUL.innerHTML = "";  // Clear existing todos in the display  
    allTodos.forEach((todo, todoIndex)=>{
       todoItem = createTodoItem(todo, todoIndex); // Create a new todo element  
        todoListUL.append(todoItem); // Append to the list  
    })
}
// Function to create a new todo item  
function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;  // Unique ID for each todo
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                   <i class='bx bx-check' style="fill: transparent;"></i>
                </label>
                <label for="${todoId}" class="todo-text">
                ${todoText}
                </label>
                <button class="delete-button">
                   <i class='bx bx-trash' style="font-size: 20px;"></i>
                </button>
    `;
    //  THis part deletes Todos when delete button is pressed
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    });
     // Handling checkbox changes 
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodo[todoIndex].completed = checkbox.checked; // Update completion  
        saveTodos();
    });
    checkbox.checked = todo.completed; // Set the checkbox state 
    return todoLI;  // Return the constructed todo item 
}// Function to delete a todo item 
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex); //Filter out the deleted item   //The filter() method of array instances creates shallow copy of portion of am array, filtered down to just elements from the given array that pass the test implemented by the provided function.
    saveTodos();  // Save changes to local storage
    updateTodoList(); // Refresh the display
}
// Function to save todos to local storage  
function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
    //console.log("Todos saved to local storage:", allTodos);  
}
// Function to retrieve todos from local storage 
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos); // Return parsed JSON 
}



