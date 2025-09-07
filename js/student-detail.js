$(() => {
  const chartInstances = {};

  /**
   * Creates and configures a new Chart.js instance on a specific canvas.
   * @param {string} canvasId - The ID of the canvas element where the chart will be rendered.
   * @param {string} title - The title of the chart.
   * @param {string[]} labels - The labels for the X-axis (e.g., months).
   * @param {object[]} datasets - The datasets to be displayed in the chart.
   */
  function createChart(canvasId, title, labels, datasets) {
    // If a chart instance already exists for this canvas, destroy it before creating a new one.
    if (chartInstances[canvasId]) {
      chartInstances[canvasId].destroy();
    }

    const ctx = $('#' + canvasId)[0].getContext('2d');
    chartInstances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  /**
   * Fetches and parses data from a CSV file.
   * @param {string} filePath - The path to the CSV file.
   * @returns {Promise<object[]>} A promise that resolves with the CSV data.
   */
  function fetchData(filePath) {
    return new Promise((resolve, reject) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (results) => {
          // Filter out empty rows that PapaParse might create
          const validData = results.data.filter(row => Object.values(row).some(val => val));
          resolve(validData);
        },
        error: (error) => {
          console.error(`Error loading or parsing the file ${filePath}:`, error);
          reject(error);
        }
      });
    });
  }

  /**
   * Renders the charts on the screen based on the provided data.
   * @param {object[]} levelChartData - The data for the level chart.
   * @param {object[]} scoreChartData - The data for the score chart.
   */
  function renderCharts(levelChartData, scoreChartData) {
    // Process data for the Level Evolution chart
    const levelLabels = levelChartData.map(row => row.month);
    const levelElaData = levelChartData.map(row => row.ela);
    const levelMathData = levelChartData.map(row => row.math);

    const levelDataset = [
      { label: 'ELA', data: levelElaData, borderColor: '#8979FF', backgroundColor: 'rgba(137, 121, 255, 0.2)', fill: true },
      { label: 'MATH', data: levelMathData, borderColor: '#FF928A', backgroundColor: 'rgba(255, 146, 138, 0.2)', fill: true },
    ];

    // Process data for the Score Evolution chart
    const scoreLabels = scoreChartData.map(row => row.month);
    const scoreElaData = scoreChartData.map(row => row.ela);
    const scoreMathData = scoreChartData.map(row => row.math);

    const scoreDataset = [
      { label: 'ELA', data: scoreElaData, borderColor: '#8979FF', backgroundColor: 'rgba(137, 121, 255, 0.2)', fill: true },
      { label: 'MATH', data: scoreMathData, borderColor: '#FF928A', backgroundColor: 'rgba(255, 146, 138, 0.2)', fill: true },
    ];

    // Render each chart with its specific dataset.
    createChart('chart1', 'Level Evolution OT', levelLabels, levelDataset);
    createChart('chart2', 'Score Evolution OT', scoreLabels, scoreDataset);
  }

  // Starts the process: fetches the data from both files and then renders the charts.
  Promise.all([
    fetchData('./data/level-evolution.csv'),
    fetchData('./data/score-evolution.csv')
  ])
    .then(([levelData, scoreData]) => {
      renderCharts(levelData, scoreData);
    })
    .catch(error => {
      console.error("Could not render the charts:", error);
    });
});