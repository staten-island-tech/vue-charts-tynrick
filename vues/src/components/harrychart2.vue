<template>
    <Bar v-if = "loaded"
      id="my-chart-id-2"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
  
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Doughnut
  },
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
      const race = [];
      const year = [];
      const labels = [];
      const datasets = [];


      data.forEach(item => {
        if (year.includes(item.year)){
          console.log(datasets)
        } else{
        labels.push(item.year)
        }
        year.push(item.year)
        if (race.includes(item.race_ethnicity)){
          console.log(datasets)
        } else{
          datasets.push({
          label: item.race_ethnicity,
          data: item.deaths,
          backgroundColor: '#f87979',
        });
        }
        race.push(item.race_ethnicity)

      });


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