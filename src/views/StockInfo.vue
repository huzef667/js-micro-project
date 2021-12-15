<template>
  <div>
    <StockSearch />

    <VueTradingView
      :options="{
        symbol: state.symbol
      }"
      v-if="state.ready"
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
      symbol: "NASDAQ:AAPL",
      ready: false
    })

    state.symbol = route.query.ticker
    state.ready = true

    return {
      state
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
