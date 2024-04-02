<template>
  <div class="container">
    <div class="center">
      <h1>Pie Chart Of Deaths Of Different Races and Genders</h1>
      <h2>2014-2007</h2>
      <Pie v-if="loaded" :data="chartData" />
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
      loaded: false,
      chartData: null
    }
  },
  async mounted() {
    this.loaded = false
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json();
      const labels = [];
      const datasets = {};

      data.forEach(item => {
        if (!labels.includes(item.year)) {
          labels.push(item.year);
        }
        if (!datasets[item.race_ethnicity]) {
          datasets[item.race_ethnicity] = {};
        }
        if (!datasets[item.race_ethnicity][item.sex]) {
          datasets[item.race_ethnicity][item.sex] = {};
        }
        if (!datasets[item.race_ethnicity][item.sex][item.year]) {
          datasets[item.race_ethnicity][item.sex][item.year] = [];
        }
        const deaths = parseFloat(item.deaths);
        if (!isNaN(deaths)) {
          datasets[item.race_ethnicity][item.sex][item.year].push(deaths);
        }
      });

      const pee = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

      const chartDatasets = [];

Object.keys(datasets).forEach((race, raceIndex) => {
  Object.keys(datasets[race]).forEach((gender, genderIndex) => {
    const label = `${race} - ${gender}`;
    const backgroundColor = pee[(raceIndex + genderIndex) % pee.length];
    const data = labels.map(year => {
      if (datasets[race][gender][year]) {
        return datasets[race][gender][year].reduce((acc, curr) => acc + curr, 0);
      } else {
        return null;
      }
    });
    chartDatasets.push({ label, backgroundColor, data });
  });
});

      this.chartData = {
        labels: labels,
        datasets: chartDatasets
      };
      this.loaded = true;
    } catch (error) {
      console.error('Oopsies', error)
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
</style>