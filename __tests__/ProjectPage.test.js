const puppeteer = require('puppeteer');

describe('Project Page E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('http://localhost:5503/source/Html/Project.html', { waitUntil: 'networkidle2', timeout: 60000 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should display the project list', async () => {
    await page.waitForSelector('#milestone-list');
    const milestoneListExists = await page.$('#milestone-list') !== null;
    expect(milestoneListExists).toBe(true);
  }, 30000); // Increased timeout to 30 seconds

  test('should add a new milestone', async () => {
    // Add debug log before adding milestone
    console.log('Adding a new milestone...');
    await page.evaluate(() => {
        addMilestone('Test Milestone');
    });

    // Debug log after milestone is added
    console.log('Milestone added. Waiting for selector...');
    await page.waitForSelector('#milestone-list li:last-child .milestone-name');

    // Debug log to check if the element is found
    console.log('Selector found. Checking milestone text...');
    const milestoneText = await page.$eval('#milestone-list li:last-child .milestone-name', el => el.textContent);
    expect(milestoneText).toBe('Test Milestone');

    // Verify the timeline element is also added
    const timelineText = await page.$eval('#timeline-elements li[data-id="milestone-1"] span', el => el.textContent);
    expect(timelineText).toBe('Test Milestone');
  }, 60000); // Increased timeout to 60 seconds

  test('should add a new task to a milestone', async () => {
    await page.evaluate(() => {
      addTask(document.querySelector('.add-task'), 1, 'Test Task', false, '');
    });

    await page.waitForSelector('#task-list1 li:last-child label');
    const taskText = await page.$eval('#task-list1 li:last-child label', el => el.textContent);
    expect(taskText).toBe('Test Task');
  }, 10000); // Increased timeout to 30 seconds

  test('should update progress on task completion', async () => {
    await page.evaluate(() => {
      const taskCheckbox = document.querySelector('#task-list1 input[type="checkbox"]');
      if (taskCheckbox) {
        taskCheckbox.checked = true;
        taskCheckbox.dispatchEvent(new Event('click'));
      }
    });

    await page.waitForFunction(() => document.querySelector('#progress1').style.width === '100%');
    const progressWidth = await page.$eval('#progress1', el => el.style.width);
    expect(progressWidth).toBe('100%');
  }, 10000); // Increased timeout to 30 seconds

  test('should delete a task', async () => {
    await page.evaluate(() => {
      const deleteButton = document.querySelector('#task-list1 .milestone-trash');
      if (deleteButton) {
        deleteButton.click();
      }
    });

    await page.waitForFunction(() => document.querySelectorAll('#task-list1 li').length === 0);
    const taskCount = await page.$$eval('#task-list1 li', tasks => tasks.length);
    expect(taskCount).toBe(0);
  }, 10000); // Increased timeout to 30 seconds

  test('should delete a milestone', async () => {
    await page.evaluate(() => {
      const deleteButton = document.querySelector('#milestone-list .milestoneX');
      if (deleteButton) {
        deleteButton.click();
      }
    });

    await page.waitForFunction(() => document.querySelectorAll('#milestone-list li').length === 0);
    const milestoneCount = await page.$$eval('#milestone-list li', milestones => milestones.length);
    expect(milestoneCount).toBe(0);
  }, 10000); // Increased timeout to 30 seconds

  test('should save milestones to localStorage', async () => {
    await page.evaluate(() => {
      addMilestone('LocalStorage Test Milestone');
      saveMilestoneToStorage();
    });

    const milestones = await page.evaluate(() => localStorage.getItem('milestones'));
    expect(milestones).toContain('LocalStorage Test Milestone');
  }, 10000); // Increased timeout to 30 seconds

  test('should save tasks to localStorage', async () => {
    await page.evaluate(() => {
      const addTaskButton = document.querySelector('.add-task');
      addTask(addTaskButton, 1, 'LocalStorage Test Task', true, '');
      saveTasksArrayToStorage();
    });

    const tasks = await page.evaluate(() => localStorage.getItem('tasks'));
    expect(tasks).toContain('LocalStorage Test Task');
  }, 10000); // Increased timeout to 30 seconds

});
