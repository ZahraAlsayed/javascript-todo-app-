document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("add-task");
    const searchInput = document.getElementById("search");
    const taskList = document.getElementById("task-list");
    const totalTasks = document.getElementById("total-tasks");
    const filterDropdown = document.getElementById("filter");

    // Load tasks from local storage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks(filter = "all") {
        taskList.innerHTML = "";

        const filteredTasks = filter === "all" ? tasks : filterTasks(searchInput.value.trim());

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.className = "task";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                toggleTaskComplete(index);
            });

            const taskText = document.createElement("input");
            taskText.type = "text";
            taskText.value = task.text;
            taskText.addEventListener("input", () => {
                editTask(index, taskText.value);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteButton);

            if (task.completed) {
                taskItem.classList.add("completed");
            }

            taskList.appendChild(taskItem);
        });

        totalTasks.textContent = tasks.length;

        // Save tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to filter tasks based on search term
    function filterTasks(searchTerm) {
        return tasks.filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()));
        
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) 
        {
            alert("Text should not be empty");
            return;
        }


        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks(filterDropdown.value);
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks(filterDropdown.value);
    }

    // Function to toggle task completion
    function toggleTaskComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks(filterDropdown.value);
    }

    // Function to edit a task
    function editTask(index, newText) {
        tasks[index].text = newText;
    }

    // Event listeners
    addTaskButton.addEventListener("click", addTask);
    searchInput.addEventListener("input", () => {
        renderTasks(filterDropdown.value);
    });

    filterDropdown.addEventListener("change", () => {
        renderTasks(filterDropdown.value);
    });

    // Initial render
    renderTasks();
});
