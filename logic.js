let taskInput = document.getElementById("taskInput");
let categoryInput = document.getElementById("categoryInput");
let taskList = document.getElementById("taskList");
let filterCategory = document.getElementById("filterCategory");
window.onload = loadTasks;

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let text = taskInput.value.trim();
    let category = categoryInput.value;

    if (!text) return;

    let tasks = getTasks();
    tasks.push({text, category, completed: false});
    saveTasks(tasks);
    taskInput.value = "";
    loadTasks();
}

function loadTasks(){
    let tasks = getTasks();
    let selectedFilter = filterCategory.value;
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (selectedFilter !== "All" && task.category !== selectedFilter) return;
        let li = document.createElement("li");
        if (task.completed) li.classList.add("completed");
        li.onclick = () => {
            task.completed = !task.completed;
            tasks[index] = task;
            saveTasks(tasks);
            loadTasks();
        };

        let taskText = document.createElement('span');
        taskText.textContent = task.text;

        let categoryLabel = document.createElement('span');
        categoryLabel.className = 'category';
        categoryLabel.textContent = `(${task.category})`;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks(tasks);
            loadTasks();
        };

        li.appendChild(taskText);
        li.appendChild(categoryLabel);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}