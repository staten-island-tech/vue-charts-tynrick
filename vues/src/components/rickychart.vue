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
      const asian_peepoo = [];
      const white_peepoo = [];
      const hispanic_peepoo = [];
      const black_peepoo = [];
      const other_peepoo = [];
      const unknown_peepoo = [];
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
          white_peepoo.push(item.deaths);}
        if (item.race_ethnicity = "Hispanic" | item.deaths != "."){
          hispanic_peepoo.push(item.deaths);}
        if (item.race_ethnicity = "Black Non-Hispanic " | item.deaths != "."){
          black_peepoo.push(item.deaths);}
        if (item.race_ethnicity = "Other Race/Ethnicity" | item.deaths != "."){
          other_peepoo.push(item.deaths);}
        if (item.race_ethnicity = "Not Stated/Unknown" | item.deaths != "."){
          unknown_peepoo.push(item.deaths);}
          console.log(asian_peepoo)
        } else{
        console.log("oops");
        }});
    } catch (error) {
      console.error('oopsies', error)
    }
  }
}
</script>