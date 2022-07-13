let figures = [];
let colors = ['hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%)']

const totalSpend = document.querySelector('#totalSpend');

fetch('data.json')
  .then(res => res.json())
  .then((data) => {
    let sum = 0;
    // update figures from JSON file in chart
    for (let i = 0; i < data.length; i++) {
      figures.push(data[i].amount);

      // sum all figures and amend total value
      sum += data[i].amount;
      totalSpend.innerHTML = '$' + sum;
    }

    console.log(figures);
    console.log(sum);

    // Find max value and make bar color cyan
    const maxFigure = Math.max(...figures);
    const maxIndex = figures.indexOf(maxFigure);
    console.log(maxIndex);

    colors.splice(maxIndex, 1, 'hsl(186, 34%, 60%)');
    myChart.update();
  })

const labels = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      data: figures,
      backgroundColor: colors,
      borderRadius: 5,
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        xAlign: 'center',
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          },
          title: () => null
        },

      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'hsl(28, 10%, 53%)',
          beginAtZero: true
        }
      },
      y: {
        display: false
      }
    }
  }
})