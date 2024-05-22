class Project {
    constructor(name, description, tags, tasks, milestones, notes) {
        this.name = name; // project name
        this.description = description; // description on home page
        this.tags = tags; // tags to calculate skill chart
        this.tasks = tasks; // array of { taskName, completionDate, milstoneID }
        this.milestones = milestones; // array of { milestoneID, milestoneName, completionDate }
        this.notes = notes; // markdown text
    }
}

class User {
    constructor(name, password, projects) {
        this.name = name; // user name
        this.password = password; // user password
        this.projects = projects; // array of projects
    }

    addProject(project) {
        this.projects.push(project);
    }
}
