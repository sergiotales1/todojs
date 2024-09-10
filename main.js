var form = document.querySelector(".form");
var taskInput = document.querySelector(".input");
var tasks = getTasksFromLocalStorage();
tasks.forEach(renderTask);
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (taskInput === null || taskInput === void 0 ? void 0 : taskInput.value) {
        var task = {
            description: taskInput === null || taskInput === void 0 ? void 0 : taskInput.value,
            isChecked: false,
        };
        // add task
        addTask(task);
        console.log(tasks);
        // render tasks
        renderTask(task);
        // update storage
        updateStorage(tasks);
        taskInput.value = "";
        return;
    }
    alert("Please provide some value");
});
function addTask(task) {
    tasks.push(task);
}
function renderTask(task) {
    var tasksList = document.querySelector(".tasks-list");
    var newTask = document.createElement("li");
    var newTaskCheckbox = document.createElement("input");
    newTaskCheckbox.type = "checkbox";
    newTaskCheckbox.checked = task.isChecked;
    newTaskCheckbox.addEventListener("change", function () {
        task.isChecked = newTaskCheckbox.checked;
        updateStorage(tasks);
    });
    var newTaskSpan = document.createElement("span");
    newTaskSpan.textContent = task.description;
    var newTaskBtn = document.createElement("button");
    newTaskBtn.textContent = "delete";
    newTaskBtn.classList.add("btn-delete");
    newTaskBtn.addEventListener("click", function () {
        tasks = tasks.filter(function (item) { return item.description !== task.description; });
        updateStorage(tasks);
        tasksList === null || tasksList === void 0 ? void 0 : tasksList.removeChild(newTask);
    });
    newTask.append(newTaskCheckbox, newTaskSpan, newTaskBtn);
    tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(newTask);
}
function updateStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getTasksFromLocalStorage() {
    var tasksFromLocalStorage = localStorage.getItem("tasks");
    return tasksFromLocalStorage ? JSON.parse(tasksFromLocalStorage) : [];
}
