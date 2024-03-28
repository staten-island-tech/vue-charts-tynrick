<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  async mounted () {
    this.loaded = false

    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
      if (response.status != 200) {
        throw new Error(response.statusText)
      }
      const data = await response.json();
      const years = new Set(data.map(item => item.year)); 
      const labels = Array.from(years).sort(); 
      const ethnicityMap = new Map();

      data.forEach(item => {
        if (!ethnicityMap.has(item.race_ethnicity)) {
          ethnicityMap.set(item.race_ethnicity, Array(labels.length).fill(0));
        }
        const index = labels.indexOf(item.year);
        ethnicityMap.get(item.race_ethnicity)[index] += parseInt(item.deaths);
      });

      const datasets = Array.from(ethnicityMap, ([label, data]) => ({
        label: label,
        data: data,
        backgroundColor: ['#f87979', '#FFB347', '#fdfd96', '#77dd77', '#aec6cf', '##8686AF', '#B39eb5', '#ffd1dc', ]
      }));

      this.chartData = {
        labels: labels,
        datasets: datasets,
      };

      this.loaded = true;
    } catch (error) {
      console.error('oopsies', error)
    }
  }
}
</script>


