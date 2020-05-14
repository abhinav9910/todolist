//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
	event.preventDefault();
	//Todo Div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//Create List
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//Add Todo TO Local Storage
	saveLocalTodos(todoInput.value);
	//Check Mark Button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
	completedButton.classList.add('completed-btn');
	todoDiv.appendChild(completedButton);
	//Check Deleted Button
	const deletedButton = document.createElement('button');
	deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
	deletedButton.classList.add('deleted-btn');
	todoDiv.appendChild(deletedButton);
	//Append To List
	todoList.appendChild(todoDiv);
	//Clear Todo Input Value
	todoInput.value = '';
}
function deleteCheck(e) {
	const item = e.target;
	//Delete Todo
	if (item.classList[0] === 'deleted-btn') {
		const todo = item.parentElement;
		//Animation
		todo.classList.add('fall');
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function () {
			todo.remove();
		});
	}

	//Check Todo
	if (item.classList[0] === 'completed-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	//Check
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	//Check
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function (todo) {
		//Todo Div
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');
		//Create List
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		//Check Mark Button
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
		completedButton.classList.add('completed-btn');
		todoDiv.appendChild(completedButton);
		//Check Deleted Button
		const deletedButton = document.createElement('button');
		deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
		deletedButton.classList.add('deleted-btn');
		todoDiv.appendChild(deletedButton);
		//Append To List
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	//Check
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}
