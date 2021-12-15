<template>

<div class="wrapper">

  <StockSearch />

  <div class='top-gainers pt-5'>
    
    <div class='container'>
      <h1 class='text-center mb-5 mt-5 text-white display-3 fw-bold'>Top Gainers Today</h1>
      <div class='row'>
        <div class='px-5 col-xl-4 mb-4' v-for='(stock, index) in state.data' :key='index'>
          <div class='card'>
            <div class='card-body'>
              <h2 class='card-title'>{{ stock.ticker }}</h2>
              <h2 class='card-title'>
                <span class='fw-bold'>${{ Number(stock.price).toFixed(2) }}</span>
                <span class='text-blue'> ({{ Number(stock.changesPercentage).toFixed(2) }})% </span>
              </h2>
              <p class='card-text'>{{ stock.companyName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</div>

</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'
import StockSearch from "../components/StockSearch.vue"

export default {
  name: 'Stocks',

  setup() {
    const state = reactive({
      data: null
    })

    const getStocks = async () => {
      const response = await axios.get(
        'https://financialmodelingprep.com/api/v3/stock/gainers?apikey=1eff1bb9a6af1eab0ae53b62cb403f3b'
      )
      state.data = response.data.mostGainerStock
    }

    getStocks()

    return {
      getStocks,
      state
    }

  },
    components: {
    StockSearch,
  }
}
</script>

<style scoped>
.card {
    background: #3179f512;
    color: white;
    border: 1px solid #ffffff1f;
}
.text-blue {
  color: #43caff
}
.wrapper {
  padding-top: 40px;
}
</style>
