document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const totalTasks = document.getElementById('total-tasks');
    const clearAllButton = document.getElementById('clear-all');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function updateLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateTotalTasks();
    }

    function updateTotalTasks() {
        totalTasks.textContent = `Total tasks: ${todos.length}`;
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        todos.push(todo);
        renderTodo(todo);
        updateLocalStorage();
        todoInput.value = '';
    }

    function renderTodo(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', todo.id);

        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoList.appendChild(li);
    }

    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });

        const todoElement = document.querySelector(`[data-id="${id}"]`);
        todoElement.classList.toggle('completed');
        updateLocalStorage();
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        todoElement.remove();
        updateLocalStorage();
    }

    function clearAll() {
        todos = [];
        todoList.innerHTML = '';
        updateLocalStorage();
    }

    // Event Listeners
    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    clearAllButton.addEventListener('click', clearAll);

    // Initial render
    todos.forEach(todo => renderTodo(todo));
    updateTotalTasks();
}); 