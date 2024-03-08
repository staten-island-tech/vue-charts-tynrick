<template>
    <Bar
      id="my-chart-id-2"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart2',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: [ 'January', 'Apirl', 'May' ],
          datasets: [ { data: [40, 50, 32] } ]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
  </script>