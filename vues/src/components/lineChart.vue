<template>
  <div class="container">
    <div class="center">
      <h1>Line Chart of Deaths by Leading Causes</h1>
      <h2>Year-wise Distribution</h2>
      <canvas ref="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';

export default {
  data() {
    return {
      chartData: [],
      labels: [],
      datasets: [],
      apiUrl: 'https://data.cityofnewyork.us/resource/jb7j-dtam.json',
    };
  },
  mounted() {
    this.registerChartComponents();
    this.fetchData();
  },
  methods: {
    registerChartComponents() {
      ChartJS.register(ArcElement, Tooltip, Legend);
    },
    async fetchData() {
      try {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        this.processData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    processData(data) {
      const causes = {};
      data.forEach(entry => {
        const year = entry.year;
        const leadingCause = entry.leading_cause;
        const deaths = parseInt(entry.deaths);
        if (!causes[leadingCause]) {
          causes[leadingCause] = {};
        }
        if (!causes[leadingCause][year]) {
          causes[leadingCause][year] = deaths;
        } else {
          causes[leadingCause][year] += deaths;
        }
      });

      this.labels = Object.keys(causes[Object.keys(causes)[0]]).sort();
      this.datasets = Object.keys(causes).map(cause => {
        const data = [];
        Object.keys(causes[cause]).forEach(year => {
          data.push(causes[cause][year]);
        });
        return {
          label: cause,
          data: data,
          fill: false,
          borderColor: this.getRandomColor(),
          tension: 0.4,
        };
      });

      this.renderChart();
    },
    renderChart() {
      const ctx = this.$refs.myChart.getContext('2d');
      this.chart = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;  
  height: 100vh;
}

.center {
  text-align: center;
}
</style>
