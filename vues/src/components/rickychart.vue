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
      if (response.status !=200) {
        throw new Error(response.statusText)
      }
      const data = await response.json();
     
      const labels = [];
      const datasets = [];


      data.forEach(item => {
        labels.push(item.year);
        datasets.push({
          ethnicity: item.race_ethnicity,
           data: [item.deaths],
          backgroundColor: '#f87979',
        });
      });


      this.chartData = {
        labelss: labels,
        datasetss: datasets,
      };


      this.loaded = true;
    } catch (error) {
      console.error('oopsies', error)
    }
  }
}
</script>
