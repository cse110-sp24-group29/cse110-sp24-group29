// home.js
import { Project, User } from './DataStoreage.js';

//add button when clicked creates widget and adds it to array 
document.getElementById('add').addEventListener('click', function() {
    newProjectWidget();
    console.log('Card added');
});

//projID, name, description, tags, tasks, milestones, notes
//need to add more details for the constructor and adding the project to the user info
function newProjectWidget() {
    const projectWidget = document.createElement('project-card');
    //let id = User.projects.length + 1;
   let name = "New Project";
   let description = "Project description..."
    projectWidget.setAttribute('project-name', name);
    projectWidget.setAttribute('description', description);
    //projectWidget.setAttribute('tags', JSON.stringify(tags)); *good for adding an array of tags use for later
    //constructor creates project object 
    //let project = Project.constructor(projID, name, description, tags, tasks, milestones, notes);
    //add to user project array
   //User.addProject(project);
    document.querySelector('.project-cards').appendChild(projectWidget);
}