// 1) Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {
    // 2) Select DOM Elements
    const addButton  = document.getElementById('add-task-btn');
    const taskInput  = document.getElementById('task-input');
    const taskList   = document.getElementById('task-list');

    // 3) Create the addTask Function
    function addTask() {
      const taskText = taskInput.value.trim();

      // 4) Task Creation and Removal
      if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = function () {
          taskList.removeChild(li);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
        taskInput.value = '';
      } else {
        alert('Please enter a task.');
      }
    }

    // 5) Attach Event Listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') addTask();
    });

    // Invoke addTask on DOMContentLoaded (will only add if input already has text)
    addTask();
  });

  document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // ---- Local Storage helpers ----
    const getTasks  = () => JSON.parse(localStorage.getItem('tasks') || '[]');
    const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

    // ---- Create one <li> + remove button; return the <li> ----
    function createTaskItem(taskText) {
      const li = document.createElement('li');
      li.textContent = taskText;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'remove-btn';

      // When removed: update DOM and Local Storage
      removeBtn.onclick = function () {
        taskList.removeChild(li);
        const updated = getTasks().filter(t => t !== taskText);
        saveTasks(updated);
      };

      li.appendChild(removeBtn);
      return li;
    }

    // ---- Add a task (optionally save to Local Storage) ----
    function addTask(taskText, save = true) {
      // Allow calling with no arg to use input field
      if (typeof taskText !== 'string') taskText = taskInput.value.trim();

      if (!taskText) {
        alert('Please enter a task.');
        return;
      }

      taskList.appendChild(createTaskItem(taskText));

      if (save) {
        const tasks = getTasks();
        tasks.push(taskText);
        saveTasks(tasks);
      }

      taskInput.value = '';
      taskInput.focus();
    }

    // ---- Load tasks from Local Storage at startup ----
    function loadTasks() {
      const storedTasks = getTasks();
      storedTasks.forEach(text => addTask(text, false)); // don't re-save while loading
    }

    // ---- Event listeners ----
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });

    // ---- Initialize ----
    loadTasks();
  });