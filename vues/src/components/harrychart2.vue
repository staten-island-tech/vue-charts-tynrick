<template>
  <div class="container">
    <Pie v-if="loaded" :data="chartData" />
  </div>
</template>
<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend)
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
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      const raceMap = new Map()
      data.forEach(item => {
        const key = item.race_ethnicity
        const deaths = parseInt(item.deaths)
        if (raceMap.has(key)) {
          raceMap.set(key, raceMap.get(key) + deaths)
        } else {
          raceMap.set(key, deaths)
        }
      })
      this.chartData = {
        labels: Array.from(raceMap.keys()),
        datasets: [{
          data: Array.from(raceMap.values()),
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#ffce56',
            '#ff8a00',
            '#9966ff',
            '#00cc99'
          ]
        }]
      }
      this.loaded = true
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}
</script>
