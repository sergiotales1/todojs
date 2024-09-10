const form = document.querySelector<HTMLFormElement>(".form");
const taskInput = document.querySelector<HTMLInputElement>(".input");

type Task = {
  description: string;
  isChecked: boolean;
};

let tasks: Task[] = getTasksFromLocalStorage();
tasks.forEach(renderTask);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (taskInput?.value) {
    let task: Task = {
      description: taskInput?.value,
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

function addTask(task: Task): void {
  tasks.push(task);
}

function renderTask(task: Task): void {
  const tasksList = document.querySelector<HTMLUListElement>(".tasks-list");
  const newTask = document.createElement("li");

  const newTaskCheckbox = document.createElement("input");
  newTaskCheckbox.type = "checkbox";
  newTaskCheckbox.checked = task.isChecked;
  newTaskCheckbox.addEventListener("change", () => {
    task.isChecked = newTaskCheckbox.checked;
    updateStorage(tasks);
  });

  const newTaskSpan = document.createElement("span");
  newTaskSpan.textContent = task.description;

  const newTaskBtn = document.createElement("button");
  newTaskBtn.textContent = "delete";
  newTaskBtn.classList.add("btn-delete");
  newTaskBtn.addEventListener("click", () => {
    tasks = tasks.filter((item) => item.description !== task.description);
    updateStorage(tasks);
    tasksList?.removeChild(newTask);
  });

  newTask.append(newTaskCheckbox, newTaskSpan, newTaskBtn);
  tasksList?.appendChild(newTask);
}

function updateStorage(tasks: Task[]): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage(): Task[] {
  let tasksFromLocalStorage = localStorage.getItem("tasks");
  return tasksFromLocalStorage ? JSON.parse(tasksFromLocalStorage) : [];
}
