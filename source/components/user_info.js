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
                flex-direction: row;
                padding: 20px;
                width: ${width};
                height: ${height};
                margin: 5% 0;
                justify-content: center;
                align-items: center;
                gap: 8rem;
            }

            .container > div {
                flex: 1;
                width: 50%;
                height: auto;
                margin: 0 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .chart-container {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #statsChart {
                width: 400px; /* Increase the width */
                height: 400px; /* Increase the height */
            }

            .user-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                
            }

            .user-pic {
                width: 150px;
                height: 150px;
                background-image: url('../../admin/branding/user_icon.jpg');
                background-size: cover;
                background-position: center;
                border-radius: 50%;
                margin-bottom: 20px;
                border: 2px solid #000;
            }

            .user-text {
                text-align: center;
                font-size: 20px;
                color: white;
            }

            .user-text p {
                margin: 5px 0;
            }

            #devsurf {
                color: #00FFB0;
            }

        </style>

        <div class="container">
            <div class="chart-container">
                <canvas id="statsChart" width="600" height="600"></canvas>
            </div>
            <div class="user-info">
                <div class="user-pic"></div>
                <div class="user-text">
                    <p>Hello, user_id</p>
                    <p>Welcome to <a id="devsurf">DevSurf</a></p>
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
                            color: 'rgba(255, 255, 225)'
                        },
                        angleLines: {
                            color: 'rgba(255, 255, 255)'
                        },
                        pointLabels: {
                            font: {
                                size: 16
                            },
                            color: '#ffffff'
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
