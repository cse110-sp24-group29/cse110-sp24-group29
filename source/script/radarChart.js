class StatsGraph extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['width', 'height'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'width' || name === 'height') {
            this.render();
            this.loadChart();
        }
    }

    connectedCallback() {
        this.render();
        this.loadChart();
    }

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
    }

}

customElements.define('stats-graph', StatsGraph);
