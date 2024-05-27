function toggleMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

window.onclick = function(event) {
    if (!event.target.matches('.hamburger-menu')) {
        const dropdownMenu = document.getElementById('dropdown-menu');
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        }
    }
}

function addTask(button, milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const taskCount = taskList.children.length + 1;
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <div class="task-item">
            <input type="checkbox" id="task-${milestoneId}-${taskCount}" onclick="updateProgress(${milestoneId})">
            <label for="task-${milestoneId}-${taskCount}" ondblclick="deleteTask(this, ${milestoneId})">Task ${taskCount}</label>
        </div>
        <textarea placeholder="Description"></textarea>
    `;
    taskList.appendChild(newTask);
}

function addMilestone() {
    const milestoneList = document.getElementById('milestone-list');
    const milestoneCount = milestoneList.children.length + 1;
    const newMilestone = document.createElement('li');
    newMilestone.innerHTML = `
        <div contenteditable="true" class="milestone-name" ondblclick="deleteMilestone(this)" onclick="toggleTasks(${milestoneCount})">Milestone ${milestoneCount}</div>
        <div class="progress-bar">
            <div class="progress" id="progress${milestoneCount}"></div>
        </div>
        <ul class="task-list" id="task-list${milestoneCount}">
            <!-- Tasks will be added here -->
        </ul>
        <button class="add-task" onclick="addTask(this, ${milestoneCount})" style="display: none;">Add Task +</button>
    `;
    milestoneList.appendChild(newMilestone);
    
    // Move the "Add Milestone" button to be at the end of the list
    milestoneList.appendChild(document.querySelector('.add-milestone'));
}

function toggleTasks(milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const addTaskButton = taskList.nextElementSibling;
    if (taskList.style.display === 'block') {
        taskList.style.display = 'none';
        addTaskButton.style.display = 'none';
    } else {
        taskList.style.display = 'block';
        addTaskButton.style.display = 'block';
    }
}

function updateProgress(milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const tasks = taskList.querySelectorAll('li');
    const completedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
    const progress = document.getElementById(`progress${milestoneId}`);
    const progressPercentage = (completedTasks / tasks.length) * 100;
    progress.style.width = `${progressPercentage}%`;

    if (completedTasks === tasks.length && tasks.length > 0) {
        const milestone = taskList.closest('li');
        milestone.querySelector('.milestone-name').classList.add('completed');
        taskList.closest('ul').appendChild(milestone);
    }
}

function deleteTask(taskElement, milestoneId) {
    taskElement.closest('li').remove();
    updateProgress(milestoneId);
}

function deleteMilestone(milestoneElement) {
    milestoneElement.closest('li').remove();
}
