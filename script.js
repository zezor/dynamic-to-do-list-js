// Run the script only after the HTML content has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Helper: get tasks array from Local Storage (returns array)
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Helper: save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task.
    // If save === true (default) the task will also be saved to Local Storage.
    function addTask(taskText = null, save = true) {
        // If no explicit taskText provided, read from input field
        const text = taskText !== null ? taskText : taskInput.value.trim();

        // Check for empty input
        if (text === "") {
            if (taskText === null) { // only alert user when they tried to add from input
                alert("Please enter a task.");
            }
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = text;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task when clicking the remove button
        removeBtn.onclick = function () {
            // Remove the <li> from DOM
            taskList.removeChild(li);

            // Update Local Storage: remove the first matching task text
            const storedTasks = getStoredTasks();
            const index = storedTasks.indexOf(text);
            if (index > -1) {
                storedTasks.splice(index, 1);
                saveTasks(storedTasks);
            }
        };

        // Attach remove button to list item and append to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If requested, save the task to Local Storage
        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(text);
            saveTasks(storedTasks);
        }

        // Clear input field (only when adding from input)
        if (taskText === null) {
            taskInput.value = "";
        }
    }

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = getStoredTasks();
        // For each stored task, call addTask with save = false to avoid re-saving
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Add task when the button is clicked
    addButton.addEventListener('click', function () {
        addTask(); // default reads from input and saves
    });

    // Add task when pressing Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks on startup
    loadTasks();
});
