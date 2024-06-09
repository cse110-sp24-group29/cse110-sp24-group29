const puppeteer = require('puppeteer');

describe('Homepage Tests', () => {
    let browser;
    let page;
    

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/home.html');
    });

    afterAll(async () => {
        await browser.close();
    });


    test('adding new project card', async () => {
        const addProjectCard = await page.$('add-project-card');
        const shadowRoot = await addProjectCard.evaluateHandle(el => el.shadowRoot);
        const addButton = await shadowRoot.$('#add');
        
        await addButton.click();
        
        const projectCards = await page.$$('project-card');
        expect(projectCards.length).toBe(1);
    });

    // test('updating project cards updates radar chart', async () => {
    //     const projectCards = await page.$$('project-card');
    //     const initialRadarChartData = await page.evaluate(() => {
    //         return document.querySelector('stats-graph').chart.data.datasets[0].data;
    //     });
    //     await page.evaluate(() => {
    //         const newData = {
    //             frontend: 0,
    //             backend: 0,
    //             database: 0,
    //             network: 0,
    //             data: 1
    //         };
            
    //         document.querySelectorAll('project-card').forEach(card => {
    //             const tag = card.shadowRoot.querySelector('#tags').value;
    //             card.setAttribute('data', newData[tag]);
    //         });

    //     });

    //     const updatedRadarChartData = await page.evaluate(() => {
    //         return document.querySelector('stats-graph').chart.data.datasets[0].data;
    //     });
    
    //     expect(updatedRadarChartData).not.toEqual(initialRadarChartData);
    // });

    // test('description placeholder text is limited to 200 chars', async () => {
    //     await page.waitForSelector('project-card');
    //     const projectCard = await page.$('project-card');
    //     const shadowRoot = await projectCard.evaluateHandle(el => el.shadowRoot);
    //     const textarea = await shadowRoot.$('textarea');
        
    //     const placeholder = await page.evaluate(el => el.getAttribute('placeholder'), textarea);
    //     expect(placeholder).toBe('Max 200 chars...');
        
    //     const maxLength = 200;
    //     await page.evaluate((el, text) => el.value = text, textarea, 'A'.repeat(maxLength + 1));
    //     const value = await page.evaluate(el => el.value, textarea);
    //     expect(value.length).toBeLessThanOrEqual(maxLength);
    // });

    test('deleting project card', async () => {
        await page.waitForSelector('project-card');
        const projectCard = await page.$('project-card');
        const shadowRoot = await projectCard.evaluateHandle(el => el.shadowRoot);
        const trashButton = await shadowRoot.$('#trash');
        
        await trashButton.click();
        
        const remainingCards = await page.$$('project-card');
        expect(remainingCards.length).toBe(0);
    });

    test('editing project card redirects to project.html', async () => {
        const addProjectCard = await page.$('add-project-card');
        const addShadowRoot = await addProjectCard.evaluateHandle(el => el.shadowRoot);
        const addButton = await addShadowRoot.$('#add');
        
        await addButton.click();
        const projectCard = await page.$('project-card');
        const shadowRoot = await projectCard.evaluateHandle(el => el.shadowRoot);
        const editButton = await shadowRoot.$('#edit');
        
        await editButton.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        
        const url = page.url();
        expect(url).toContain('project.html');
    });


});