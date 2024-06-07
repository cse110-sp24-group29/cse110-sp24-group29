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
  }, 10000); // Increase timeout to 10 seconds

  test('should add a new milestone', async () => {
    await page.evaluate(() => {
      addMilestone('Test Milestone');
    });

    await page.waitForSelector('#milestone-list li:last-child .milestone-name');
    const milestoneText = await page.$eval('#milestone-list li:last-child .milestone-name', el => el.textContent);
    expect(milestoneText).toBe('Test Milestone');
  }, 10000); // Increase timeout to 10 seconds

  test('should add a new task to a milestone', async () => {
    await page.evaluate(() => {
      addTask(document.querySelector('.add-task'), 1, 'Test Task');
    });

    await page.waitForSelector('#task-list1 li:last-child label');
    const taskText = await page.$eval('#task-list1 li:last-child label', el => el.textContent);
    expect(taskText).toBe('Test Task');
  }, 10000); // Increase timeout to 10 seconds

  test('should toggle the menu', async () => {
    await page.waitForSelector('.hamburger-menu');
    await page.click('.hamburger-menu');
    let menuDisplay = await page.$eval('#dropdown-menu', el => window.getComputedStyle(el).display);
    expect(menuDisplay).toBe('block');

    await page.click('.hamburger-menu');
    menuDisplay = await page.$eval('#dropdown-menu', el => window.getComputedStyle(el).display);
    expect(menuDisplay).toBe('none');
  }, 10000); // Increase timeout to 10 seconds

  test('should update progress on task completion', async () => {
    await page.evaluate(() => {
      const taskCheckbox = document.querySelector('#task-list1 input[type="checkbox"]');
      if (taskCheckbox) {
        taskCheckbox.checked = true;
        taskCheckbox.dispatchEvent(new Event('change'));
      }
    });

    const progressWidth = await page.$eval('#progress1', el => el.style.width);
    expect(progressWidth).toBe('100%');
  }, 10000); // Increase timeout to 10 seconds

  test('should delete a task', async () => {
    await page.evaluate(() => {
      const taskLabel = document.querySelector('#task-list1 label');
      if (taskLabel) {
        taskLabel.dispatchEvent(new Event('dblclick'));
      }
    });

    await page.waitForFunction(() => document.querySelectorAll('#task-list1 li').length === 0);
    const taskCount = await page.$$eval('#task-list1 li', tasks => tasks.length);
    expect(taskCount).toBe(0);
  }, 10000); // Increase timeout to 10 seconds

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
  }, 10000); // Increase timeout to 10 seconds

  test('should save milestones to localStorage', async () => {
    await page.evaluate(() => {
      addMilestone('LocalStorage Test Milestone');
      saveMilestoneToStorage();
    });

    const milestones = await page.evaluate(() => localStorage.getItem('milestones'));
    expect(milestones).toContain('LocalStorage Test Milestone');
  }, 10000); // Increase timeout to 10 seconds

  test('should save tasks to localStorage', async () => {
    await page.evaluate(() => {
      const addTaskButton = document.querySelector('.add-task');
      addTaskWithState(addTaskButton, 1, 'LocalStorage Test Task', true);
      saveTasksArrayToStorage();
    });

    const tasks = await page.evaluate(() => localStorage.getItem('tasks'));
    expect(tasks).toContain('LocalStorage Test Task');
  }, 10000); // Increase timeout to 10 seconds

});


describe('Project Page Notes and Entry functionality', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:5503/source/Html/project.html', { waitUntil: 'networkidle2', timeout: 60000 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should load entries from localStorage and display them', async () => {
    await page.evaluate(() => {
        localStorage.setItem('entries', JSON.stringify([
            { title: 'Entry 1', content: 'Content of Entry 1', type: 'notes', images: [] },
            { title: 'Entry 2', content: 'Content of Entry 2', type: 'notes', images: [] }
        ]));
        location.reload();
    });

    await page.waitForSelector('.entry-tile');
    const entryCount = await page.$$eval('.entry-tile', entries => entries.length);
    expect(entryCount).toBe(2);
});

test('should add a new entry', async () => {
    await page.click('#notepad');
    await page.type('#notepad', 'New Entry Content');
    await page.click('#addEntryButton');

    await page.waitForSelector('.entry-tile:last-child h3');
    const entryTitle = await page.$eval('.entry-tile:last-child h3', el => el.textContent);
    const entryContent = await page.$eval('.entry-tile:last-child p', el => el.textContent);
    expect(entryTitle).toBe('Entry 3');
    expect(entryContent).toBe('New Entry Content');
});

test('should edit an existing entry', async () => {
    await page.click('.entry-tile:last-child .edit-icon');
    await page.click('#notepad');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.type('#notepad', 'Edited Entry Content');
    await page.click('#addEntryButton');

    const entryContent = await page.$eval('.entry-tile:last-child p', el => el.textContent);
    expect(entryContent).toBe('Edited Entry Content');
});

test('should delete an entry', async () => {
    await page.click('.entry-tile:last-child .trash-icon');

    await page.waitForFunction(() => document.querySelectorAll('.entry-tile').length === 2);
    const entryCount = await page.$$eval('.entry-tile', entries => entries.length);
    expect(entryCount).toBe(2);
});

test('should display entry details', async () => {
    await page.click('.entry-tile:first-child');

    await page.waitForSelector('#dynamicIsland');
    const islandTitle = await page.$eval('#islandTitle', el => el.textContent);
    const islandContent = await page.$eval('#islandContent p', el => el.textContent);
    expect(islandTitle).toBe('Entry 1');
    expect(islandContent).toBe('Content of Entry 1');
});

test('should close', async () => {
    await page.click('#closeIsland');

    await page.waitForFunction(() => document.getElementById('dynamicIsland').style.display === 'none');
    const islandDisplay = await page.$eval('#dynamicIsland', el => window.getComputedStyle(el).display);
    expect(islandDisplay).toBe('none');
});
});