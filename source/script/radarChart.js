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
            body {
                margin: 0;
                font-family: Arial, sans-serif;
            }

            .container {
                display: flexbox;
                flex-direction: row;
                padding: 20px;
                width: ${width};
                height: ${height};
                margin: 5% 0;
                justify-content: center;
                align-items: center;
                gap: 8rem;
            }

            .chart-container {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #statsChart {
                width: 450px; /* Increase the width */
                height: 450px; /* Increase the height */
            }
        </style>

        <div class="container">
            <div class="chart-container">
                <canvas id="statsChart" width="600" height="600"></canvas>
            </div>
        </div>
        `;
    }

    loadChart() {
        const ctx = this.shadowRoot.querySelector('#statsChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Frontend Engineering', 'Backend Engineering', 'Databases Engineering', 'Network Engineering', 'Data Analytics Engineering'],
                datasets: [{
                    label: 'Stats',
                    data: [100, 80, 90, 60, 30],
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
                responsive: false, // Disable responsiveness to respect the canvas size
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
                            color: 'rgba(54, 54, 54, 0.2)' // Light gray for the grid lines
                        },
                        angleLines: {
                            color: 'rgba(54, 54, 54, 0.2)' // Light gray for the angle lines
                        },
                        pointLabels: {
                            font: {
                                size: 14
                            },
                            color: 'rgb(54, 162, 235)' // Teal color for the labels
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
