class ProjectCard extends HTMLElement {
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
            <h3>Project Name</h3>
            <p>Description:</p>
            <div class="description-box">
                <p>Max 200 chars...</p>
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
            <button id='trash'><img src='/trash.ico' alt='Trash'></button>
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
                background-color: rgba(75, 192, 192, 0.2);
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
                right: 50px;
            }
            #trash {
                right: 10px;
            }
            button img {
                width: 15px;
                height: 15px;
            }
        `;
        this.shadowRoot.append(style);
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
            <h3>+ Add </h3>
        `;
        this.shadowRoot.append(cardContainer);

        const style = document.createElement('style');
        style.textContent = `
            .card {
                position: relative;
                border: 1.5px dashed black;
                border-radius: 10px;
                padding: 20px;
                background-color: rgba(75, 192, 192, 0.2);
                width: auto;
                margin: 10px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: background-color 0.3s ease;
                max-width: 350px; /* Ensure all cards have the same width */
            }
            .card:hover {
                background-color: rgba(75, 192, 192, 0.4);
            }
            .card h3 {
                text-align: center;
                color: black;
                margin: 10px 0;
            }
        `;
        this.shadowRoot.append(style);
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
    const cardHeight = projectCardsWrapper.clientHeight;
    const cardWidth = projectCardsWrapper.clientWidth;
    const scrollAmount = cardWidth; // Adjust based on the width of one "page" of cards

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
