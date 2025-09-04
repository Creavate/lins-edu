
function createChart(canvasId, chartType, labels, data, label) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

$(document).ready(function () {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data1 = [12, 19, 3, 5, 2, 3];
  const data2 = [7, 11, 5, 8, 3, 7];

  createChart('chart1', 'bar', labels, data1, 'Performance');
  createChart('chart2', 'line', labels, data2, 'Progress');
});