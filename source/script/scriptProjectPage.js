/**
 * Toggles the display of the dropdown menu when the hamburger menu is clicked.
 */

let currentWidth;
let mediaQuery = window.matchMedia("(max-width: 768px)");
let mediaQuery2 = window.matchMedia("(max-width: 1024px)");
if(mediaQuery.matches) {
    currentWidth = 300;
}
else {
    currentWidth = 100;
}
function toggleMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

/**
 * Closes the dropdown menu when clicking outside of it.
 * 
 * @param {Event} event - The click event of the hamburger menu.
 */
window.onclick = function(event) {  
    // if (!event.target.matches('.hamburger-menu')) {
    //     const dropdownMenu = document.getElementById('dropdown-menu');
    //     if (dropdownMenu.style.display === 'block') {
    //         dropdownMenu.style.display = 'none';
    //     }
    // }
}


/**
 * Adds current date to the task if it is checked
 * 
 * @param {HTMLElement} check- the input checkbox that is checked
 */
function updateDate (check) {
    let now = new Date();
    task = check.parentElement;
    let milestone = task.closest('[data-id^="milestone-"]');
    let currentDate = now.toLocaleDateString('en-GB');
    let dateDiv = task.querySelector('.date');
    if(check.checked) {
        dateDiv.innerText = currentDate;
        if(milestone.querySelector('.completed')) {
            milestone.querySelector('.date').innerText = currentDate;
        }
    }
    else {
        dateDiv.innerText = '';
        milestone.querySelector('.date').innerText = '';
    }
} 

function toggleCheckboxOnEnter(event, checkbox) {
    if (event.key === 'Enter') {
        checkbox.checked = !checkbox.checked;
        event.preventDefault(); // Prevent the default action
        // Optionally trigger the click event to ensure consistency
        checkbox.dispatchEvent(new Event('click'));
    }
}

/**
 * Adds a new task with a specified state (checked or not).
 * 
ne to which t * @param {HTMLElement} button - The button element that triggered the function.
 * @param {number} milestoneId - The number of the milestone task is being added.
 * @param {string} taskText - The text content of the task.
 * @param {boolean} isChecked - Whether the task is checked or not.
 */
function addTask(button, milestoneId, taskText, isChecked, dateCompleted) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const taskCount = taskList.children.length + 1;
    const newTask = document.createElement('li');
    if(taskText == '') {
        taskText = `Task ${taskCount}`;
    }
    newTask.innerHTML = `
       <div class="task-item">
            <input type="checkbox" id="task-${milestoneId}-${taskCount}" onclick="updateProgress(${milestoneId}); updateDate(this)" ${isChecked ? 'checked' : ''} onkeydown="toggleCheckboxOnEnter(event, this)">
            <label contenteditable="true">${taskText}</label>
            <div class = date>${dateCompleted}</div> 
            <button class="milestone-trash" onclick="deleteTask(this, ${milestoneId})" tabindex="0"><img class="milestoneX" src="../img/trash.png"></button>
        </div>

    `;
    let taskLabel = newTask.querySelector('label');
    if(taskLabel) {
        taskLabel.addEventListener('input', function () {
        limitInnerTextLength(taskLabel);
    });
    }
    taskList.appendChild(newTask);
    updateProgress(milestoneId);  
}

/**
 * Adds a new milestone to the list.
 */
function addMilestone(milestoneName) {

    const milestoneList = document.getElementById('milestone-list');
    let milestoneCount;
    if(milestoneList.children.length == 0) {
        milestoneCount = 1;
    }
    else {
        milestoneCount = milestoneList.children.length; 
    }
    let newMilestone = document.createElement('li');
    let timelineList = document.getElementById('timeline-elements');
    let newTimelineElement =  document.createElement('li');
    let timelineCount = timelineList.children.length;
    if (milestoneName == '') {
        milestoneName = `Milestone ${milestoneCount}`;
    }
    newTimelineElement.innerHTML = 
    `
    <span>${milestoneName}</span>
    <img src="../img/2.png" alt="Incomplete Flag" class="milestone-image"/> 
    `;
    let length = milestoneName.length;
    newTimelineElement.style.width = 430 + (length-11)*30;
    newTimelineElement.classList.add('uncompleted');
    newTimelineElement.setAttribute('data-id', `milestone-${milestoneCount}`,);
    timelineList.insertBefore(newTimelineElement, timelineList.children[timelineCount - 1]);
    newMilestone.innerHTML = getMilestoneHTML(milestoneCount,milestoneName);

    newTimelineElement.setAttribute('tabindex', '0');

    newTimelineElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            this.click();
            document.getElementById('closeIsland').focus();
        }
    });

    //dynamically changes milestone name on TIMELINE
    const milestoneNameElement = newMilestone.querySelector('.milestone-name');
    milestoneNameElement.addEventListener('input', function() {
        limitInnerTextLength(milestoneNameElement);
        updateTimeline(this);
    });
    milestoneList.appendChild(newMilestone);
    newMilestone.setAttribute('data-id', `milestone-${milestoneCount}`);
    // Move the "Add Milestone" button to be at the end of the list
    milestoneList.appendChild(document.querySelector('.add-milestone'));

    //dynamically adds to the timeline to make it bigger when certain
    //milestone number is reached
    
    if(milestoneCount > 3 ) {
        addWidth();
    }
    updateTimelineProgress();
}
 /**
  * Limits the amount of text to be 20 for any editable name
  * @param {HTMLElement} text the element innertext that has to be limited
  */
function limitInnerTextLength(text) {
    let tested = text.innerText;
    if(tested.length > 20) {
        text.innerText = tested.slice(0,20);
        setCursorToEnd(text);
    }
}
 /**
  * Sets the inputs position to end once max limit is reached
  * @param {HTMLElement} element the contented idable element
  */
function setCursorToEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Move range to the end
    selection.removeAllRanges();
    selection.addRange(range);
}
/**
 * Updates the timeline if > 3 milestones exist
 * 
 */
function addWidth() {
    let add = 24.5;
    if(mediaQuery.matches) {    
        add = 100;
    }
    else if(mediaQuery2.matches ) {
        add = 45;
    }
    let timelineContainer = document.
        getElementsByClassName('timeline-container')[0];
    let timelineList = document.getElementById('timeline-elements');
    // Calculate the new width (current width + 20%)
    currentWidth += add;
    let newWidth = currentWidth+ '%';
    timelineList.style.width = newWidth ;
    line = document.getElementById('line');
    line.style.width = newWidth;
    timelineContainer.style.overflowX = 'auto';
}
/**
 * Resizes the width of the timeline when a mediaQuery is matched
 */
function resizeWidth() {
    if(mediaQuery.matches) {
        currentWidth = 300;
    }
    else {
        currentWidth = 100;
    }
    let milestones = getMilestoneArray();
    let mINumber = milestones.length;
    if(mINumber > 3) {
        for ( let i = 0; i < mINumber - 3; i++) {
            addWidth();
        }
    }
    updateTimelineProgress();
}
/**
 * Updates the milestone name on the timeline based on the input.
 * 
 * @param {HTMLElement} milestoneElement - The milestone element being updated.
 */

function updateTimeline(milestoneElement) {
    const milestoneId = milestoneElement.closest('li').getAttribute('data-id');
    const milestoneName = milestoneElement.textContent;
    let strLen = milestoneName.length;
    let spanWidth = 460 + (strLen - 11)*41;
    const timelineElement = document.querySelector
        (`#timeline-elements [data-id="${milestoneId}"] span`);
    if (timelineElement) {
        timelineElement.textContent = milestoneName;
        timelineElement.style.width = spanWidth + '%';
    }
    resizeWidth();
}
/**
 * Updates the milestone name on the timeline based on the input.
 * @overload updates the space of the all elements of timeline
 */
function updateTimeline() {
    let milestones = getMilestoneArray();
    for (let i = 0; i < milestones.length; i++) {
        const milestone = milestones[i];
        const nameDiv = milestone.querySelector('.milestone-name');
        const milestoneName = nameDiv.textContent;
        let strLen = milestoneName.length;
        let spanWidth = 460 + (strLen - 11)*41;
        let milestoneId = milestone.getAttribute('data-id');
        const timelineElement = document.querySelector
        (`#timeline-elements [data-id="${milestoneId}"] span`);
        if (timelineElement) {
            timelineElement.textContent = milestoneName;
            timelineElement.style.width = spanWidth + '%';
        }
    }
    resizeWidth();
}
/**
 * Toggles the visibility of the tasks and the "Add Task" button for the specified milestone.
 * 
 * @param {number} milestoneId - The milestone number whose tasks are being toggled.
 */
function toggleTasks(milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const arrowElement = document.getElementById(`dropdown-arrow-${milestoneId}`);
    const addTaskButton = taskList.nextElementSibling;
    if (taskList.style.display === 'block') {
        taskList.style.display = 'none';
        addTaskButton.style.display = 'none';
        arrowElement.textContent = '▼';
    } else {
        taskList.style.display = 'block';
        addTaskButton.style.display = 'block';
        arrowElement.textContent = '▲';
    }
}

function getProgressPercentage (milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    if(!taskList) {
        return 0;
    }
    const tasks = taskList.querySelectorAll('li');
    const completedTasks = taskList.querySelectorAll
        ('input[type="checkbox"]:checked').length;
    if(tasks.length == 0) {
        return 0;
    }
    const progressPercentage = completedTasks / tasks.length;
    return progressPercentage;
}
/**
 * Updates the progress bar status for the specified milestone based on 
 * completed tasks.
 * 
 * @param {number} milestoneId - The ID of the milestone being updated.
 */

function updateProgress(milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const tasks = taskList.querySelectorAll('li');
    const completedTasks = taskList.querySelectorAll
        ('input[type="checkbox"]:checked').length;
    const progress = document.getElementById(`progress${milestoneId}`);
    const progressPercentage = getProgressPercentage(milestoneId) * 100;
    progress.style.width = `${progressPercentage}%`;
    let timelineElement = document.querySelector
        (`#timeline-elements [data-id="milestone-${milestoneId}"]`);
    const milestone = taskList.closest('li');
    let image = timelineElement.querySelector('img');
    if (completedTasks === tasks.length && tasks.length > 0) {
        // All tasks are completed
        timelineElement.classList.remove('uncompleted');
        timelineElement.classList.add('completed');
        milestone.querySelector('.milestone-name').classList.add('completed');
        image.src = '../img/1.png';
        image.alt = 'complete flag';

    } 
    else {
        // Not all tasks are completed
        timelineElement.classList.remove('completed');
        timelineElement.classList.add('uncompleted');
        milestone.querySelector('.milestone-name').classList.remove('completed');
        image.src = '../img/2.png';
        image.alt = 'incomplete flag';
    }
    
    // Update overall timeline progress
    updateTimelineProgress();
    
}
/**
 * Updates the overall progress of the timeline based on completed milestones.
 */
function updateTimelineProgress() {
    const milestoneList = document.getElementById('milestone-list');
    const milestones = milestoneList.querySelectorAll('li[data-id]');
    const completedMI = milestoneList.querySelectorAll('.completed').length;
    const timelineList = document.getElementById('timeline-elements');
    const timeline = timelineList.querySelectorAll('li');
    const timelineLength = timeline.length;
    let oneDivision = currentWidth/ (timeline.length-1);
    let maxMilestone = 1; 
    for(let i = 0; i < completedMI; i++) {
        let check = milestones[i].querySelector('.completed');
        if(!check) {
            break;
        }
        maxMilestone++;
    }
    let progressPercentage = getProgressPercentage(maxMilestone);
    let timelineText = document.querySelector('#TIHeader');
    // check for completion
    if(completedMI == timelineLength - 2) {
        // if completed bar is filled and end is set to complete
        tlProgress = currentWidth;
        timeline[timelineLength - 1].classList.remove('uncompleted');
        timeline[timelineLength - 1].classList.add('completed');
        timelineText.style.color = '#00FFB0';
    }
    else {
         // if progress bar is dynamically calculated and end is set to uncomplete
        tlProgress = (maxMilestone -1)/(timelineLength - 1) * currentWidth;
        tlProgress += progressPercentage * oneDivision;
        timeline[timelineLength - 1 ].classList.remove('completed');
        timeline[timelineLength - 1].classList.add('uncompleted');
        timelineText.style.color = '#CCFF00';
    }
    let line = document.getElementById('line2');
    line.style.width = tlProgress + '%';
}
/**
 * Deletes a task and updates the progress.
 * @param {HTMLElement} taskElement - The task element to be deleted.
 * @param {number} milestoneId - The milestone number
 * from which the task is being deleted.
 */
function deleteTask(taskElement, milestoneId) {
    taskElement.closest('li').remove();
    updateProgress(milestoneId);
    renumberMilestones();
}

/**
 * Renumbers milestones and updates their content and IDs when a milestone
 * is deleted
 */
function renumberMilestones() {
    const milestoneList = document.getElementById('milestone-list');
    const timelineList = document.getElementById('timeline-elements');
    const milestones = milestoneList.querySelectorAll('li[data-id]');
    milestones.forEach((milestone, index) => {
        const newNumber = index + 1;
        const milestoneNameElement = milestone.querySelector('.milestone-name');
        const placeholder = milestoneNameElement.textContent;
        const currentName = milestoneNameElement.textContent.replace(/\s*\d+$/, '');
        if (currentName === 'Milestone') {
            milestoneNameElement.textContent = `${currentName.trim()} ${newNumber}`;
        } else {
            milestoneNameElement.textContent = `${placeholder}`;
        }

        // Update the milestone number in the elements
        milestone.querySelector('.dropdown-arrow').setAttribute('onclick', `toggleTasks(${newNumber});`);
        const progressBar = milestone.querySelector('.progress');
        progressBar.id = `progress${newNumber}`;
        milestone.querySelector('.task-list').id = `task-list${newNumber}`;
        milestone.querySelector('.add-task').
            setAttribute('onclick', `addTask(this, ${newNumber},'',false,'')`);
        milestone.setAttribute('data-id', `milestone-${newNumber}`);
        const tasks = milestone.querySelectorAll('.task-list .task-item');
        renumberTasks(tasks, newNumber);
 
    });

    const timelineElements = timelineList.querySelectorAll('li[data-id]');
    // updates the namne of the timeline when renumbering
    timelineElements.forEach((timeline, index) => {
        const newNumber = index + 1;
        const milestoneId = `milestone-${newNumber}`;
        const milestone = milestoneList.querySelector(`li[data-id="${milestoneId}"]`);
        const milestoneName = milestone ? milestone.querySelector('.milestone-name').textContent : `Milestone ${newNumber}`;
        timeline.querySelector('span').textContent = milestoneName;
        timeline.setAttribute('data-id', milestoneId);
    });

    updateTimelineProgress();
}
/**
 * Renumbers and correctly assigns correct data 
 * @param {HTMLElement} tasks a node list to the tasks of a milestone
 * @param {number} milestoneId the milestone number of 
 * the tasklist that is being modified
 */
function renumberTasks (tasks,milestoneId) {   
    tasks.forEach( (task,taskIndex)  => {
        let taskCheckbox = task.querySelector('input');
        taskCheckbox.id = `task-${milestoneId}-${taskIndex + 1}`;
        taskCheckbox.setAttribute('onclick', `updateProgress(${milestoneId})`);
        let taskLabel = task.querySelector('label');
        taskLabel.setAttribute('ondblclick', `deleteTask(this, ${milestoneId})`);
        const placeholder = taskLabel.textContent;
        const currentName = placeholder.replace(/\s*\d+$/, '');
        if(currentName == 'Task') {
            taskLabel.innerText = `Task ${taskIndex+1}`;
        }
        else {
            taskLabel.innerText = `${placeholder}`
        }
        
    });
} 

/**
 * Returns the HTML structure for a milestone given its number.
 * 
 * @param {number} milestoneNumber - The number of the milestone.
 * @returns {string} The HTML structure for the milestone.
 */
function getMilestoneHTML(milestoneNumber,milestoneName) {
    return `
        <div class="milestone-header" tabindex>
            <div class="milestone-content">
                <div contenteditable="true" class="milestone-name">${milestoneName}</div>
                <div class='date'></div>
                <button class="milestone-trash" onclick="deleteMilestone(this)" tabindex="0"><img class="milestoneX" src="../img/trash.png"></button>
            </div>
            <button class="dropdown-arrow" id="dropdown-arrow-${milestoneNumber}" onclick="toggleTasks(${milestoneNumber});" tabindex="0">▼</button>
        </div>
        <div class="progress-bar">
            <div class="progress" id="progress${milestoneNumber}"></div>
        </div>
        <ul class="task-list" id="task-list${milestoneNumber}">
            <!-- Tasks will be added here -->
        </ul>
        <button class="add-task" onclick="addTask(this, ${milestoneNumber}, '',false,'')" style="display: none;">Add Task +</button>
    `;
}
/**
 * Deletes a milestone and updates the timeline and progress.
 * 
 * @param {HTMLElement} milestoneElement - The milestone element to be deleted.
 */

function deleteMilestone(milestoneElement) {
    const milestoneId = milestoneElement.closest('li').getAttribute('data-id');
    milestoneElement.closest('li').remove();
    const milestoneList = document.getElementById('milestone-list');
    let  milestoneCount = milestoneList.children.length;
    const timelineElement = document.querySelector(`#timeline-elements [data-id="${milestoneId}"]`);
    if (timelineElement) {
        timelineElement.remove();
    }
    if(milestoneCount > 4) {
        subWidth();
    }
    else {
        resetWidth();
    }
    
    renumberMilestones();
    updateTimelineProgress();
}
/**
 * Updates the timeline width when a milestone is deleted
 * 
 */
function subWidth () {
    let sub = 24;
    if(mediaQuery.matches) {
        sub = 90;
    }
    if(mediaQuery2.matches) {
        sub = 45;
    }
     let timelineContainer = document.
        getElementsByClassName('timeline-container')[0];
    let timelineList = document.getElementById('timeline-elements');
    // Calculate the new width (current width + 20%)
    currentWidth -= sub;
    let newWidth = currentWidth+ '%';
    timelineList.style.width = newWidth ;
    line = document.getElementById('line');
    line.style.width = newWidth;
}

/**
 * resets the width of the timeline when milestones <= 3
 * 
 */

function resetWidth() {
    currentWidth = 100;
    let timelineContainer = document.
        getElementsByClassName('timeline-container')[0];
    if(mediaQuery.matches) {
        currentWidth = 300;
    }
    else {
        timelineContainer.style.overflowX = 'visible';
    }
    let timelineList = document.getElementById('timeline-elements');
    timelineList.style.width = currentWidth + '%';
    line = document.getElementById('line');
    line.style.width = currentWidth + '%';

}

/**
 * saves milestones to storage after a milestone is created/deleted
 */

function saveMilestoneToStorage () {
    let milestones = getMilestoneArray();
    let milestoneNames = [];
    for (let i = 0; i < milestones.length; i++) {
        const nameDiv = milestones[i].querySelector('.milestone-name');
        const milestoneName = nameDiv.textContent;
        milestoneNames.push(milestoneName);
    }
    let stored = JSON.stringify(milestoneNames);
    localStorage.setItem('milestones', stored);
}

/**
 * saves tasks to storage after a milestone is created/deleted
 */
function saveTasksArrayToStorage () {
    const milestones = getMilestoneArray();
    const taskArray = [];
    milestones.forEach(milestone => {
        const taskList = milestone.querySelector('.task-list');
        if (taskList) {
            const tasks = [];
            taskList.querySelectorAll('li').forEach(task => {
                const checkbox = task.querySelector('input[type="checkbox"]');
                const label = task.querySelector('label');
                const date = task.querySelector('.date');
                tasks.push({
                    text: label.textContent,
                    checked: checkbox.checked,
                    dateCompleted: date.innerText,
                });
            });
            taskArray.push(tasks);
        }
    });
    const stored = JSON.stringify(taskArray);
    localStorage.setItem('tasks', stored);
}

function getMilestoneArray () {
    const milestoneList = document.getElementById('milestone-list');
    let milestones = milestoneList.querySelectorAll('li[data-id]');
    return milestones;
}

document.addEventListener("DOMContentLoaded", function () {
    const notepad = document.getElementById('notepad');
    const markdown = document.getElementById('markdown');
    const addEntryButton = document.getElementById('addEntryButton');
    const entriesContainer = document.querySelector('.entries-container');
    const dynamicIsland = document.getElementById('dynamicIsland');
    const closeIsland = document.getElementById('closeIsland');
    const islandTitle = document.getElementById('islandTitle');
    const islandContent = document.getElementById('islandContent');
    const islandImages = document.getElementById('islandImages');
    const noteTypeButtons = document.querySelectorAll('.note-type-button');

    let activeNoteType = 'notes'; // Default to 'notes'
    let isEditing = false;
    let editingEntryIndex = null;

    //keyboard access to close island
    closeIsland.setAttribute('tabindex', '0'); 

    // Load entries from localStorage and display them
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach((entry, index) => addEntryTile(entry.title, entry.content, entry.type, entry.images, index));
    }

    function loadMilestonesAndTasks() {
        const milestones = JSON.parse(localStorage.getItem('milestones')) || [];
        milestones.forEach(milestone => addMilestone(milestone));
        const milestoneList = getMilestoneArray();
        const taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
       
        milestoneList.forEach((milestone, index) => {
            const taskButton = milestone.querySelector('.add-task');
            const tasks = taskArray[index] || [];
            tasks.forEach(task => {
                addTask(taskButton, index + 1, task.text, task.checked,task.dateCompleted);
                updateProgress(index + 1);
            });
        });
    }

    // Save a new entry to localStorage
    function saveEntry(title, content, type, images) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        if (isEditing && editingEntryIndex !== null) {
            entries[editingEntryIndex] = { title, content, type, images };
            updateEntryTile(editingEntryIndex, title, content, type);
            isEditing = false;
            editingEntryIndex = null;
            addEntryButton.textContent = 'Add Entry';
        } else {
            entries.push({ title, content, type, images });
            addEntryTile(title, content, type, images, entries.length - 1);
        }
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    // Add a new entry tile to the left container
    function addEntryTile(title, content, type = 'notes', images = [], index) {
        const entryTile = document.createElement('div');
        entryTile.classList.add('entry-tile');
        entryTile.dataset.index = index;
        entryTile.dataset.type = type;
        const entryTitle = document.createElement('h3');
        entryTitle.textContent = title;
        const entryContent = document.createElement('p');
        entryContent.textContent = content.length > 100 ? content.substring(0, 100) + '...' : content;

        const editIcon = document.createElement('img');
        editIcon.src = '../img/edit.png';
        editIcon.alt = 'Edit';
        editIcon.classList.add('edit-icon');
        editIcon.onclick = (event) => {
            event.stopPropagation();
            loadEntryToEdit(index);
        };

        const trashIcon = document.createElement('img');
        trashIcon.src = '../img/trash.png';
        trashIcon.alt = 'Delete';
        trashIcon.classList.add('trash-icon');
        trashIcon.onclick = (event) => {
            event.stopPropagation();
            deleteEntry(entryTile, index);
        };

        entryTile.onclick = () => {
            showDynamicIsland(title, content, type, images);
            document.getElementById('closeIsland').focus();
        };

        entryTile.appendChild(entryTitle);
        entryTile.appendChild(entryContent);
        entryTile.appendChild(editIcon);
        entryTile.appendChild(trashIcon);

        entryTile.setAttribute('tabindex', '0');
        trashIcon.setAttribute('tabindex', '0');
        editIcon.setAttribute('tabindex', '0');
        
        // Add keydown event listeners for Enter key
        entryTile.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                this.click();
            }
        });

        trashIcon.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.stopPropagation();
                trashIcon.click();
            }
        });

        editIcon.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.stopPropagation();
                editIcon.click();
            }
        });

        entriesContainer.appendChild(entryTile);
    }

    // Update an existing entry tile with new content
    function updateEntryTile(index, title, content, type) {
        const entryTile = entriesContainer.querySelector(`.entry-tile[data-index="${index}"]`);
        const entryTitle = entryTile.querySelector('h3');
        const entryContent = entryTile.querySelector('p');

        entryTitle.textContent = title;
        entryContent.textContent = content.length > 100 ? content.substring(0, 100) + '...' : content;
        entryTile.dataset.type = type;
        entryTile.onclick = () => {
            showDynamicIsland(title, content, type, []);
            document.getElementById('closeIsland').focus();
        };
    }

    function loadEntryToEdit(index) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        const entry = entries[index];
        if (entry.type === 'markdown') {
            markdown.value = entry.content;
            activeNoteType = 'markdown';
            markdown.style.display = 'block';
            notepad.style.display = 'none';
            document.getElementById('markdown').focus();
        } else {
            notepad.value = entry.content;
            activeNoteType = 'notes';
            notepad.style.display = 'block';
            markdown.style.display = 'none';
            document.getElementById('notepad').focus();
        }
        addEntryButton.textContent = 'Save Entry';
        isEditing = true;
        editingEntryIndex = index;
    }

    function deleteEntry(entryTile, index) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('entries', JSON.stringify(entries));
        entriesContainer.removeChild(entryTile);
        renumberEntries();
    
        // Close dynamic island if it's open and showing the deleted entry
        if (dynamicIsland.style.display === 'block' && islandTitle.textContent === entryTile.querySelector('h3').textContent) {
            dynamicIsland.style.display = 'none';
        }
    }
    

    function renumberEntries() {
        const entries = document.querySelectorAll('.entry-tile');
        entries.forEach((entry, index) => {
            entry.dataset.index = index;
            const entryTitle = entry.querySelector('h3');
            entryTitle.textContent = `Entry ${index + 1}`;
        });
    }

    // Show the dynamic island with entry details
    function showDynamicIsland(title, content, type, images) {
        islandTitle.textContent = title;
        islandContent.innerHTML = '';

        if (type === 'markdown') {
            // Render Markdown
            const markdownView = document.createElement('div');
            markdownView.classList.add('markdown-view');
            markdownView.innerHTML = marked.parse(content); // Render Markdown
            islandContent.appendChild(markdownView);
        } else {
            // Render Notes
            const noteView = document.createElement('p');
            noteView.textContent = content;
            islandContent.appendChild(noteView);
        }

        islandImages.innerHTML = '';
        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            islandImages.appendChild(img);
        });

        dynamicIsland.style.display = 'block';
    }

    closeIsland.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            this.click();
        }
    });   

    // Handle the close button for the dynamic island
    closeIsland.onclick = () => {
        dynamicIsland.classList.add('close');
        setTimeout(() => {
            dynamicIsland.style.display = 'none';
            dynamicIsland.classList.remove('close');
        }, 300); // Match this duration with the CSS animation duration
    };

    // Handle the add entry button click
    addEntryButton.addEventListener('click', function () {
        const content = activeNoteType === 'markdown' ? markdown.value.trim() : notepad.value.trim();
        if (content) {
            const title = `Entry ${editingEntryIndex !== null ? editingEntryIndex + 1 : entriesContainer.children.length + 1}`;
            const images = []; // Assuming images are not handled yet
            saveEntry(title, content, activeNoteType, images);
            if (activeNoteType === 'markdown') {
                markdown.value = '';
            } else {
                notepad.value = '';
            }
        }
    });

    

    // Handle note-type button clicks
    noteTypeButtons.forEach(button => {
        button.addEventListener('click', function () {
            noteTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            activeNoteType = this.getAttribute('data-type');
            if (activeNoteType === 'markdown') {
                markdown.style.display = 'block';
                notepad.style.display = 'none';
            } else {
                notepad.style.display = 'block';
                markdown.style.display = 'none';
            }
        });
    });

    loadEntries();
    loadMilestonesAndTasks();
    resizeWidth();
    updateTimeline();
     // Add event listener to timeline items
     document.getElementById('timeline-elements').addEventListener('click', function (event) {
        const target = event.target.closest('li');
        if (target && target.dataset.id) {
            const milestoneId = target.dataset.id;
            const milestoneElement = document.querySelector(`#milestone-list [data-id="${milestoneId}"]`);
            let progress = getProgressPercentage(milestoneId.charAt(milestoneId.length-1)) * 100;
            progress = progress.toFixed(1);
            if(milestoneElement.querySelector('.completed')) {
                progress = 100;
            }
            if (milestoneElement) {
                const milestoneName = milestoneElement.querySelector('.milestone-name').textContent + ': ' + progress + '%';
                const taskElements = milestoneElement.querySelectorAll('.task-item label');
                showMilestoneDetailsInIsland(milestoneName, taskElements);
            }
        }
    });

    function showMilestoneDetailsInIsland(milestoneName, tasks) {
        islandTitle.textContent = milestoneName;
        islandContent.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('p');
            let date = task.parentElement.querySelector('.date').innerText;
            if(date == '') {
                taskItem.textContent = `${task.innerText}: In Progress `;
            }
            else {
                taskItem.textContent = `${task.innerText}: Completed On  ${date}`;
            }
            islandContent.appendChild(taskItem);
        });
        dynamicIsland.style.display = 'block';
    }
});



// Initialize highlight.js
document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
});

// Function to render Markdown
function renderMarkdown(markdownText) {
    // Set up marked to use highlight.js
    marked.setOptions({
        highlight: function(code, language) {
            // Use 'plaintext' as fallback language
            const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
            return hljs.highlight(validLanguage, code).value;
        }
    });

    // Parse Markdown to HTML
    const htmlContent = marked(markdownText);
    // Insert HTML into the dynamic island content area
    document.getElementById('islandContent').innerHTML = htmlContent;
}

// Function to renumber entries after deletion
function renumberEntries() {
    const entries = document.querySelectorAll('.entry-tile');
    const entriesArray = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach((entry, index) => {
        entry.dataset.index = index;
        const entryTitle = entry.querySelector('h3');
        entryTitle.textContent = `Entry ${index + 1}`;
        entriesArray[index].title = `Entry ${index + 1}`;
    });
    localStorage.setItem('entries', JSON.stringify(entriesArray));
}


// Function to delete an entry
function deleteEntry(entryElement) {
    entryElement.remove();
    renumberEntries();
}

// Add event listeners to delete buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.trash-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const entryElement = e.target.closest('.entry-tile');
            deleteEntry(entryElement);
        });
    });
});

// Function to add new entry
function addEntry(content) {
    const entryContainer = document.querySelector('.entries-container');

    // Create a new entry tile
    const newEntry = document.createElement('div');
    newEntry.className = 'entry-tile';
    const entryNumber = entryContainer.childElementCount + 1;

    newEntry.innerHTML = `
        <h3>Entry ${entryNumber}</h3>
        <p>${content}</p>
        <img src="../img/trash-icon.png" class="trash-icon" alt="Delete">
    `;

    entryContainer.appendChild(newEntry);

    // Add event listener to the delete button
    newEntry.querySelector('.trash-icon').addEventListener('click', (e) => {
        deleteEntry(newEntry);
    });

    renumberEntries(); // Renumber after adding
}

// Adjust the notepad size based on the screen width
function adjustNotepadSize() {
    const notepad = document.getElementById('notepad');
    const markdown = document.getElementById('markdown');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 475) {
        notepad.style.fontSize = '12px';
        markdown.style.fontSize = '12px';
        notepad.style.padding = '10px 5px 10px 30px';
        markdown.style.padding = '10px 5px 10px 30px';
    } else if (screenWidth <= 640) {
        notepad.style.fontSize = '14px';
        markdown.style.fontSize = '14px';
        notepad.style.padding = '15px 5px 15px 40px';
        markdown.style.padding = '15px 5px 15px 40px';
    } else if (screenWidth <= 768) {
        notepad.style.fontSize = '16px';
        markdown.style.fontSize = '16px';
        notepad.style.padding = '20px 10px 20px 60px';
        markdown.style.padding = '20px 10px 20px 60px';
    } else {
        notepad.style.fontSize = '16px';
        markdown.style.fontSize = '16px';
        notepad.style.padding = '20px 15px 20px 80px';
        markdown.style.padding = '20px 15px 20px 80px';
    }
}

// Adjust the notepad size on page load and when the window is resized
window.addEventListener('load', adjustNotepadSize);
window.addEventListener('resize', adjustNotepadSize);



mediaQuery.addEventListener('change', function () {
    resizeWidth();
});
mediaQuery2.addEventListener('change', function () {
    resizeWidth();
});

window.addEventListener('beforeunload', function () {
    saveMilestoneToStorage();
    saveTasksArrayToStorage();
});
window.addEventListener('unload',function () {
    saveMilestoneToStorage();
    saveTasksArrayToStorage();
});
