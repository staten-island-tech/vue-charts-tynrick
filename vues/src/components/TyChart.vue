<template>
    <div class="container">
      <Pie v-if="loaded" :data="chartData" />
    </div>
  </template>
  
  <script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)
  export default {
    name: 'PieChart',
    components: { Pie },
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
       
        const pee = [];
        const poo = [];
        const labels = [];
        const datasets = [];
  
  
  
        data.forEach(item => {
          if (poo.includes(item.year)){
            console.log(datasets)
          } else{
          labels.push(item.year)
          }
          poo.push(item.year)
          if (pee.includes(item.race_ethnicity)){
            console.log(datasets)
          } else{
            datasets.push({
            label: item.race_ethnicity,
            data: item.deaths,
            backgroundColor: ['#f87979', '#FFB347', '#fdfd96', '#77dd77', '#aec6cf', '##8686AF', '#B39eb5', '#ffd1dc', ]
          });
          }
          pee.push(item.race_ethnicity)
  
  
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