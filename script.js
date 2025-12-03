document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Get tasks from local storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Save tasks to local storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task (save = true by default)
    function addTask(taskText = null, save = true) {
        const text = taskText !== null ? taskText : taskInput.value.trim();

        if (text === "") {
            if (taskText === null) {
                alert("Please enter a task.");
            }
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = text;   // REQUIRED: li.textContent = taskText

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";  // REQUIRED
        removeBtn.classList.add('remove-btn'); // REQUIRED

        // Remove button functionality
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            const storedTasks = getStoredTasks();
            const index = storedTasks.indexOf(text);
            if (index > -1) {
                storedTasks.splice(index, 1);
                saveTasks(storedTasks);
            }
        };

        // Append remove button and li to task list
        li.appendChild(removeBtn);   // REQUIRED
        taskList.appendChild(li);    // REQUIRED

        // Save to local storage
        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(text);
            saveTasks(storedTasks);
        }

        // Clear input field
        if (taskText === null) {
            taskInput.value = "";   // REQUIRED
        }
    }

    // Load tasks from local storage
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(task => addTask(task, false));
    }

    // Add task on button click
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add task on Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when page loads
    loadTasks();
});
