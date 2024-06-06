const { Project, User } = require('../source/script/DataStoreage.js');

describe('User class tests', () => {
    let user;
    beforeEach(() => {
        user = new User(1, 'JohnDoe', 'password123', []);
    });

    test('addProject - adds a project successfully', () => {
        const project = new Project(1, 'Project 1', 'Description', ['tag1', 'tag2'], [], [], 'Notes');
        user.addProject(project);
        expect(user.projects).toContain(project);
    });

    test('editProject - updates an existing project', () => {
        const initialProject = new Project(1, 'Project 1', 'Initial Description', [], [], [], '');
        user.projects.push(initialProject);
        const updatedProject = new Project(1, 'Project 1', 'Updated Description', [], [], [], '');
        expect(user.editProject(1, updatedProject)).toBe(true);
        expect(user.projects[0].description).toBe('Updated Description');
    });

    test('deleteProject - deletes a project', () => {
        const project = new Project(1, 'Project 1', 'Description', [], [], [], '');
        user.projects.push(project);
        expect(user.deleteProject(1)).toBe(true);
        expect(user.projects).not.toContain(project);
    });
});