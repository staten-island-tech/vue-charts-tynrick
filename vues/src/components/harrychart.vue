<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

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
    this.fetchData();
  },
  methods: {
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
      // Process data to get labels and datasets for the chart
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
      this.chart = new Chart(ctx, {
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
/* Add styles if necessary */
</style>
