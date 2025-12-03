// Run the script only after the HTML content has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {

        // Get and trim user input
        const taskText = taskInput.value.trim();

        // Check for empty input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task when clicking the remove button
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Attach remove button to list item
        li.appendChild(removeBtn);

        // Add the new task to the task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add task when the button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when pressing Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask once on DOMContentLoaded (as instructed)
    addTask();
});
