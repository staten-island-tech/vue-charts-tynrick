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
    chartData: {
      labels: [],
        datasets: []
    }
  }),
  async mounted () {
    this.loaded = false

    try {
      const { userlist } = await fetch('data.cityofnewyork.us/resource/jb7j-dtam.json')
      this.chartdata = userlist

      userlist.forEach(data => {
        this.chartData.labels.push(data.year)
      })
      userlist.forEach(data => {
        this.chartData.datasets.push(data.deaths)
      })
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>