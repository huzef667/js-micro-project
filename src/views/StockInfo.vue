<template>
  <div class="wrapper">
    <StockSearch @clicked="renderTradingView"/>

    <VueTradingView
      :options="{
        symbol: state.symbol
      }"
      v-if="state.ready"
      :key="state.TradingViewState"
    />

  </div>
</template>



<script>
import { useRoute } from "vue-router"
import { reactive } from "vue"

import StockSearch from "../components/StockSearch.vue"
import VueTradingView from "../components/TradingView.vue"

export default {
  name: "StockInfo",

  setup() {
    const route = useRoute()

    const state = reactive({
      TradingViewState: 0,
      symbol: "NASDAQ:AAPL",
      ready: false
    })
    
    const renderTradingView = ({ exchange, symbol }) => {
      state.symbol = `${exchange}:${symbol}`
      state.TradingViewState += 1
    }

    state.symbol = route.query.ticker
    state.ready = true

    return {
      state,
      renderTradingView
    }
  },

  components: {
    StockSearch,
    VueTradingView
  }

}
</script>


<style>
iframe {
  width: 100% !important;
  height: 90vh !important;
}
</style>
