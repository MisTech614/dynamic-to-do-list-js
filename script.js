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