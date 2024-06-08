class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const projectName = this.getAttribute('project-name') || 'Project Name';
        const description = this.getAttribute('description') || '';
        const cardContainer = document.createElement('div');
        cardContainer.setAttribute('class', 'card');
        cardContainer.innerHTML = `
            <h3>${projectName}</h3>
            <p>Description:</p>
            <div class="description-box">
                <textarea placeholder="Max 200 chars...">${description}</textarea>
            </div>
            <div class="tags">
                <label for="tags">Project Tags:</label>
                <select id="tags">
                    <option value="frontend">Frontend Engineering</option>
                    <option value="backend">Backend Engineering</option>
                    <option value="database">Database Engineering</option>
                    <option value="network">Network Engineering</option>
                    <option value="data">Data Analytics Engineering</option>
                </select>
            </div>
            <button id='edit'><img src='/edit.ico' alt='Edit'></button>
            <button id='trash'><img src='/trash.png' alt='Trash'></button>
        `;
        this.shadowRoot.append(cardContainer);

        const style = document.createElement('style');
        style.textContent = `
            .card {
                position: relative;
                border: 1.5px solid black;
                border-radius: 10px;
                padding: 20px;
                background-color: rgba(54, 162, 235, 0.2);
                width: 100%;
                margin: 10px 0;
                display: flexbox;
                flex-direction: row;
                justify-content: space-between;
                box-sizing: border-box;
                max-width: 200px; /* Ensure all cards have the same width */
            }
            .card p {
                margin: 5px 0;
                color: black;
            }
            .card h3 {
                text-align: center;
                color: black;
                margin: 10px 0;
            }
            .description-box {
                border: 1px solid white;
                border-radius: 5px;
                padding: 10px;
                margin-bottom: 10px;
                height: 30px;
                background-color: rgba(75, 192, 192, 0.2);
            }
            .description-box textarea { /* Added textarea styles */
                width: 100%;
                height: 100%;
                border: none;
                background: transparent;
                resize: none;
                outline: none;
                color: black;
                font-family: inherit;
                font-size: inherit;
            }
            .description-box p {
                margin: 5px 0;
                color: black;
            }
            .tags {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
            }
            .tags label {
                color: black;
                margin-bottom: 5px;
            }
            .tags select {
                padding: 5px;
                border-radius: 5px;
                border: 1px solid white;
                background-color: rgba(10, 25, 47, 0.8);
                color: white;
            }
            button {
                background-color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                padding: 2.5px;
                position: absolute;
                top: 10px;
            }
            #edit {
                right: 30px;
                background: none;
            }
            #trash {
                right: 5px;
                background: none;
            }
            button img {
                width: 15px;
                height: 15px;
            }
        `;
        this.shadowRoot.append(style);

        this.shadowRoot.querySelector('#tags').addEventListener('change', () => {
            document.querySelector('stats-graph').updateChart();
        });

        this.shadowRoot.querySelector('#trash').addEventListener('click', () => {
            this.remove();
        });

        this.shadowRoot.querySelector('#edit').addEventListener('click', () => {
            window.location.href = 'project.html';
        }); 
    }
}

class AddProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const cardContainer = document.createElement('div');
        cardContainer.setAttribute('class', 'card');
        cardContainer.innerHTML = `
            <h3 id='add'>+ Add</h3>
        `;
        this.shadowRoot.append(cardContainer);

        const style = document.createElement('style');
        style.textContent = `
            .card  {
                position: relative;
                border: 1.5px dashed black;
                border-radius: 10px;
                padding: 20px;
                background-color: rgba(75, 192, 192, 0.2);
                min-width: 10rem;
                min-height: 12rem;
                width: auto;
                height: 100%;
                margin: 10px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: background-color 0.3s ease;
                max-width: 350px; /* Ensure all cards have the same width */
            }
            card:hover {
                background-color: rgba(75, 192, 192, 0.4);
            }
            
            .card h3 {
                text-align: center;
                color: black;
                margin: 10px 0;
            }
        `;
        this.shadowRoot.append(style);

        cardContainer.addEventListener('click', () => {
            const newCard = document.createElement('project-card');
            this.parentElement.appendChild(newCard); 
        });
    }
}

customElements.define('project-card', ProjectCard);
customElements.define('add-project-card', AddProjectCard);

// JavaScript for scrolling functionality
document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const projectCardsWrapper = document.querySelector('.project-card-wrapper');
    const projectCards = document.querySelector('.project-cards');

    let currentScrollPosition = 0;
    // const cardHeight = projectCardsWrapper.clientHeight;
    const cardWidth = projectCardsWrapper.clientWidth;
    const scrollAmount = cardWidth;

    rightArrow.addEventListener('click', () => {
        const maxScroll = -(projectCards.scrollWidth - cardWidth);
        if (currentScrollPosition > maxScroll) {
            currentScrollPosition -= scrollAmount;
            projectCards.style.transform = `translateX(${currentScrollPosition}px)`;
        }
    });

    leftArrow.addEventListener('click', () => {
        if (currentScrollPosition < 0) {
            currentScrollPosition += scrollAmount;
            projectCards.style.transform = `translateX(${currentScrollPosition}px)`;
        }
    });
});

