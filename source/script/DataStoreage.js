/**
 * Class representing a project.
 * @class
 */
class Project {
    /**
     * Create a project.
     * @param {number} projID - The unique ID of the project.
     * @param {string} name - The name of the project.
     * @param {string} description - A brief description of the project.
     * @param {string[]} tags - Related tags for the project.
     * @param {Object[]} tasks - An array of tasks associated with the project.
     * @param {Object[]} milestones - Milestones to be achieved in the project.
     * @param {string} notes - Additional notes in markdown format.
     */
    constructor(projID, name, description, tags, tasks, milestones, notes) {
        this.projID = projID;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.tasks = tasks;
        this.milestones = milestones;
        this.notes = notes;
    }
}

/**
 * Class representing a user.
 * @class
 */
class User {
    /**
     * Create a user.
     * @param {number} userID - The unique identifier for the user.
     * @param {string} name - The name of the user.
     * @param {string} password - The password for the user.
     * @param {Project[]} projects - The projects associated with the user.
     */
    constructor(userID, name, password, projects) {
        this.userID = userID;
        this.name = name;
        this.password = password;
        this.projects = projects;
    }

    /**
     * Add a new project to the user's list of projects.
     * @param {Project} project - The new project to add.
     */
    addProject(project) {
        this.projects.push(project);
    }

    /**
     * Update an existing project.
     * @param {number} projectID - The ID of the project to update.
     * @param {Project} updatedProject - The updated project details.
     * @returns {boolean} True if the update was successful, false otherwise.
     */
    editProject(projectID, updatedProject) {
        let index = this.projects.findIndex(p => p.projID === projectID);
        if (index !== -1) {
            this.projects[index] = updatedProject;
            return true;
        }
        return false;
    }

    /**
     * Delete a project from the user's list.
     * @param {number} projectID - The ID of the project to delete.
     * @returns {boolean} True if the deletion was successful, false otherwise.
     */
    deleteProject(projectID) {
        let index = this.projects.findIndex(p => p.projID === projectID);
        if (index !== -1) {
            this.projects.splice(index, 1);
            return true;
        }
        return false;
    }
}

/**
 * Save user data to local storage.
 * @param {User[]} users - The array of users to save.
 */
function saveToLocalStorage(users) {
    localStorage.setItem('softwareSurferesDevJournalUsersData', JSON.stringify(users));
}

/**
 * Load user data from local storage.
 * @returns {Object} The users loaded from local storage.
 */
function loadFromLocalStorage() {
    let usersStr = localStorage.getItem('softwareSurferesDevJournalUsersData');
    if (!usersStr) return {};
    let usersData = JSON.parse(usersStr);
    let users = {};
    Object.keys(usersData).forEach(userID => {
        let userData = usersData[userID];
        let projects = userData.project.map(p => new Project(p.id, p.name, p.description, p.tags, p.tasks, p.milestones, p.notes));
        users[userData.name] = new User(userData.userID, userData.name, userData.password, projects);
    });
    return users;
}

/**
 * Add a new user to the local storage.
 * @param {Object} users - The current list of users.
 * @param {User} user - The new user to add.
 */
function addUser(users, user) {
    users[user.userID] = user;
    saveToLocalStorage(users);
}

/**
 * Retrieve a user by ID.
 * @param {Object} users - The current list of users.
 * @param {number} userID - The ID of the user to retrieve.
 * @returns {User} The user if found, undefined otherwise.
 */
function getUser(users, userID) {
    return users[userID];
}

module.exports = { Project, User };