class StatsGraph extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow DOM to the custom element
        this.attachShadow({ mode: 'open' });
    }

    // Observe changes to the 'width' and 'height' attributes
    static get observedAttributes() {
        return ['width', 'height'];
    }

    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'width' || name === 'height') {
            this.render(); // Re-render the element
            this.loadChart(); // Reload the chart with the new dimensions
        }
    }

    // Called when the element is added to the DOM
    connectedCallback() {
        this.render(); // Render the element
        this.loadChart(); // Load the chart
    }

    // Render the HTML structure for the custom element
    render() {
        const width = this.getAttribute('width') || '100%';
        const height = this.getAttribute('height') || '400px';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: ${width};
                height: ${height};
                max-width: 100%;
                margin: 0 auto;
            }

            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }

            .chart-container {
                position: relative;
                width: 100%;
                height: 100%;
                max-width: 600px; /* Set max-width for the chart container */
                max-height: 600px; /* Set max-height for the chart container */
            }

            #statsChart {
                width: 100%;
                height: 100%;
            }
        </style>

        <div class="container">
            <div class="chart-container">
                <canvas id="statsChart"></canvas>
            </div>
        </div>
        `;
    }

    // Load the radar chart using Chart.js
    loadChart() {
        const ctx = this.shadowRoot.querySelector('#statsChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Frontend\nEngineering',
                    'Backend\nEngineering',
                    'Databases\nEngineering',
                    'Network\nEngineering',
                    'Data Analytics\nEngineering'
                ],
                datasets: [{
                    label: 'Stats',
                    data: [0, 0, 0, 0, 0],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // all chart grid colors changed to teal and grey
                    borderColor: 'rgb(54, 162, 235)', 
                    pointBackgroundColor: 'rgb(54, 162, 235)', 
                    pointBorderColor: 'rgb(75, 75, 75)', 
                    pointHoverBackgroundColor: 'rgb(75, 75, 75)',
                    pointHoverBorderColor: 'rgb(54, 162, 235)', 
                    pointRadius: 0
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                responsive: true, // Enable responsiveness
                maintainAspectRatio: false, // Disable maintaining aspect ratio to use width and height 100%
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        grid: {
                            color: 'rgba(54, 54, 54, 0.5)' // Light gray for the grid lines
                        },
                        angleLines: {
                            color: 'rgba(54, 54, 54, 0.5)' // Light gray for the angle lines
                        },
                        pointLabels: {
                            font: {
                                size: 14
                            },
                            color: 'rgb(0, 0, 0)', // Teal color for the labels
                            callback: function(value) {
                                // Split the label into multiple lines
                                return value.split('\n');
                            }
                        },
                        ticks: {
                            display: false,
                            stepSize: 20
                        }
                    }
                }
            }
        });

        this.updateChart(); // Update the chart with initial data
    }

    // Update the chart with the current distribution of project tags
    updateChart() {
        const tagCounts = {
            frontend: 0,
            backend: 0,
            database: 0,
            network: 0,
            data: 0
        };

        // Wait until 'project-card' elements are defined
        customElements.whenDefined('project-card').then(() => {
            // Count the tags in each project card
            document.querySelectorAll('project-card').forEach(card => {
                const tag = card.shadowRoot.querySelector('#tags').value;
                if (tagCounts[tag] !== undefined) {
                    tagCounts[tag]++;
                }
            });

            // Calculate the percentage of each tag
            const total = Object.values(tagCounts).reduce((acc, count) => acc + count, 0);
            const percentages = total > 0 ? Object.values(tagCounts).map(count => (count / total) * 100) : [0, 0, 0, 0, 0];

            // Update the chart data and redraw the chart
            this.chart.data.datasets[0].data = percentages;
            this.chart.update();
        });
    }
}

// Define the custom element
customElements.define('stats-graph', StatsGraph);
