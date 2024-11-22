document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = { text: taskText, completed: false };
  saveTaskToLocalStorage(task);
  renderTask(task);
  taskInput.value = '';
}

function renderTask(task) {
  const li = document.createElement('li');
  li.className = 'task';
  if (task.completed) li.classList.add('completed');

  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <input type="checkbox" ${task.completed ? 'checked' : ''} class="mark-complete">
      <button class="delete-task">Delete</button>
    </div>
  `;

  li.querySelector('.mark-complete').addEventListener('change', (e) => {
    task.completed = e.target.checked;
    updateTaskInLocalStorage(task.text, task.completed);
    li.classList.toggle('completed', task.completed);
  });

  li.querySelector('.delete-task').addEventListener('click', () => {
    removeTaskFromLocalStorage(task.text);
    li.remove();
  });

  taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function updateTaskInLocalStorage(taskText, completed) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find((t) => t.text === taskText);
  if (task) task.completed = completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter((t) => t.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(render)}