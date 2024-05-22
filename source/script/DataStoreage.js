class Project {
    constructor(projID, name, description, tags, tasks, milestones, notes) {
        this.projID = projID; // project ID
        this.name = name; // project name
        this.description = description; // description on home page
        this.tags = tags; // tags to calculate skill chart
        this.tasks = tasks; // array of { taskName, completionDate, milstoneID }
        this.milestones = milestones; // array of { milestoneID, milestoneName, completionDate }
        this.notes = notes; // markdown text
    }
}

class User {
    constructor(userID, name, password, projects) {
        this.userID = userID; // user id
        this.name = name; // user name
        this.password = password; // user password
        this.projects = projects; // array of projects
    }

    addProject(project) {
        this.projects.push(project);
    }

    editProject(projectID, updatedProject) {
        let index = this.projects.findIndex(p => p.id === projectID);
        if(index !== -1) {
            this.projects[index] = updatedProject;
            return true;
        }
        return false;
    }

    deleteProject(projectID) {
        let index = this.projects.findIndex(p => p.id === projectID);
        if(index !== -1) {
            this.projects.splice(index, 1);
            return true;
        }
        return false;
    }
}

function saveToLocalStorage(users) {
    localStorage.setItem('softwareSurferesDevJournalUsersData', JSON.stringify(users));
}

function loadFromLocalStorage() {
    let usersStr = localStorage.getItem('softwareSurferesDevJournalUsersData');
    if(!usersStr) return {};
    let usersData = JSON.parse(usersStr);
    let users = {}
    Object.keys(usersData).forEach(userID => {
        let userData = usersData[userID];
        let projects = userData.project.map(p => new Project(p.id, p.name, p.description, 
            p.tags, p.tasks, p.milestones, p.notes));
        users[username] = new User(userData.userID, userData.name, 
            userData.password, projects);
    });
    return users;
}

function addUser(users, user) {
    users[user.userID] = user;
    saveToLocalStorage(users);
}

function getUser(users, userID) {
    return users[userID];
}