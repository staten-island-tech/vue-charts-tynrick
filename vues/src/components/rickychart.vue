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
      const pee = [];
      const poo = [];
      const peepoo = [];
      const labels = [];
      const datasets = [];
      data.forEach(item => {
        if (!poo.includes(item.year)){
          poo.push(item.year)
        if (item.race_ethnicity = "Asian and Pacific Islander" | item.deaths != "."){
          asian_peepoo.push(item.deaths);}
          if (!labels.includes(item.race_ethnicity)){
            labels.push
          }
        if (item.race_ethnicity = "White Non-Hispanic" | item.deaths != "."){
          white_peepoo.push(item.deaths);
          datasets.push({
          label: item.race_ethnicity,
          data: item.deaths,
          backgroundColor: '#ffd700',})}
        if (item.race_ethnicity = "Hispanic" | item.deaths != "."){
          peepoo.push(item.deaths);
          datasets.push({
          label: item.race_ethnicity,
          data: item.deaths,
          backgroundColor: '#ffd700',})}
        if (item.race_ethnicity = "Black Non-Hispanic " | item.deaths != "."){
          peepoo.push(item.deaths);
          datasets.push({
          label: item.race_ethnicity,
          data: item.deaths,
          backgroundColor: '#ffd700',})}
        if (item.race_ethnicity = "Other Race/Ethnicity" | item.deaths != "."){
          peepoo.push(item.deaths);
          datasets.push({
          label: item.race_ethnicity,
          data: item.deaths,
          backgroundColor: '#ffd700',})}
        if (item.race_ethnicity = "Not Stated/Unknown" | item.deaths != "."){
          peepoo.push(item.deaths);
          datasets.push({
          label: item.race_ethnicity,
          data: item.deaths,
          backgroundColor: '#ffd700',})}
          console.log(asian_peepoo)
        } else{
        console.log("oops");
        }});
        this.chartData = {
        labels: labels,
        datasets: datasets,
      };
    } catch (error) {
      console.error('oopsies', error)
    }
  }
}
</script>