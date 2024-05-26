class ProjectWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    render(){
        const widgetContainer = document.createElement('div');
        widgetContainer.setAttribute('class', 'widget');
        widgetContainer.innerHTML = `
            <h2>Project Name</h2>
            <p>Description:</p>
            <div class="description-box">
                Project description...
            </div>
            <p>Tags:</p>
            <div class="tags">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
                <span class="tag">Tag 3</span>
            </div>
            <button id='edit'><img src='../components/edit.ico' height="13" width="13" alt='Edit'></button>
            <button id='trash'><img src='../components/trash.ico' height="13" width="13" alt='Trash'></button>
        `;
        this.shadowRoot.append(widgetContainer);
        const style = document.createElement('style');
        style.textContent = `
            .widget {
                position: relative;
                border: 1.5px solid white;
                border-radius: 5px;
                padding: 2em 2em;
                background-color: rgba(75, 192, 192, 0.2);
                width: 15em;
                margin: 0.5em;
            }
            .widget h2 {
                text-align: center;
                margin-top: .25em;
                font-size: 1em;
                color: white;
            }
            .widget p {
                margin-bottom: 0;
                color: white;
            }
            .widget button {
                background-color: white;
                color: #fff;
                border: 1.5px solid black;
                border-radius: 2px;
                cursor: pointer;
                height: 1.35em;
                width: 1.35em;
                position: absolute;
                right: 5px;
            }
            #edit {
                top: 5px;
            }
            #trash {
                bottom: 5px;
            }
            .widget button:hover {
                background-color: rgb(143, 143, 143);
                height: 1.5em;
                width: 1.5em;
            }
            .description-box {
                border: 1px solid white;
                border-radius: 5px;
                padding: 5px;
                margin-bottom: 5px;
                min-height: 75px; 
                resize: vertical; 
                background-color: rgba(75, 192, 192, 0.2);
            }
            .tags {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 10px;
            }
            .tag {
                background-color: #0A192F;
                color: white;
                padding: 5px 10px;
                border-radius: 2px;
                margin-right: 5px;
                margin-bottom: 5px;
                cursor: pointer;
            }
            .tag:hover {
                background-color: rgba(0, 128, 0, 0.8);
            }
        `;
        this.shadowRoot.append(style);
    }
}
customElements.define('project-widget', ProjectWidget);
