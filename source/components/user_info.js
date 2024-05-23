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
                    display: flex;
                    background-color: #FFFFFF;
                    border: 3px solid #000;
                    padding: 20px;
                    width: ${width};
                    height: ${height};
                    margin: auto;
                    align-items: center;
                    justify-content: center;
                }

                .chart-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #statsChart {
                    width: 200px;
                    height: 200px;
                }

                .user-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .user-pic {
                    width: 250px;
                    height: 250px;
                    background-color: #ffffff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 30px;
                    margin-top: -40px;
                    border: 2px solid #000;
                }

                .user-text {
                    text-align: center;
                    font-size: 30px;
                }

                .user-text p {
                    margin: 5px 0;
                }
            </style>
            <div class="container">
                <div class="chart-container">
                    <canvas id="statsChart";></canvas>
                </div>
                <div class="user-info">
                    <div class="user-pic">User Photo</div>
                    <div class="user-text">
                        <p>User Name</p>
                        <p>User Information</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadChart() {
        const ctx = this.shadowRoot.querySelector('#statsChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Placeholder 1', 'Placeholder 2', 'Placeholder 3', 'Placeholder 4', 'Placeholder 5'],
                datasets: [{
                    label: 'Stats',
                    data: [100, 80, 90, 60, 30],
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    pointBackgroundColor: 'rgb(75, 192, 192)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(75, 192, 192)',
                    pointRadius: 0
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                responsive: true,  // Disable responsiveness to use the canvas width and height
                plugins: {
                    legend: {
                        display: false  // Hide the legend
                    },
                    
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.5)'  // Color of the pentagon lines
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.5)'  // Color of the lines from the center to the vertices
                        },
                        pointLabels: {
                            font: {
                                size: 16  // Increase font size
                            },
                            color: '#000'  // Make text color darker
                        },
                        ticks: {
                            display: false, // Hide value label
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }
}

customElements.define('stats-graph', StatsGraph);
