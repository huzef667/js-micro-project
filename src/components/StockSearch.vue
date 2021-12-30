<template>
  <div>
    <div class="d-flex justify-content-center search">

      <div class="col-xl-4">
        <div style="width: 100%">
          <div class="form">
            <i class="fa fa-search"></i>
            <input
              type="text"
              class="form-control form-input"
              v-model="state.searchQuery"
              @input="debounceSearch"
              placeholder="Search Stocks"
              ref="searchQueryInput"
            />
          </div>
        </div>

        <div
          v-if="!state.typing && state.searchResults.length > 0"
          class="search-results"
        >
        
          <a
            v-for="search in state.searchResults.slice(0, 8)"
            :key="search.fullSymbol"
            @click="navigateToDetails({exchange: search.exchange, symbol: search.fullSymbol })"
            
          >
            <img :src="search.logoURL" />
            {{ search.companyName }}
          </a>
        </div>

        <div class="search-loading" v-if="state.typing">
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
import axios from "axios"
import { useRouter } from 'vue-router'

export default {
  name: "StockSearch",

  setup(props, context) {

    const router = useRouter()
      const searchQueryInput = ref(null)

    const state = reactive({
      typing: null,
      debounce: null,
      searchQuery: null,
      searchResults: []
    })

    const debounceSearch = () => {
      state.typing = true
      clearTimeout(state.debounce)

      state.debounce = setTimeout(async () => {
        state.searchResults = await searchTicker(state.searchQuery)
        state.typing = false
      }, 300)

    }

    const searchTicker = async (keyword) => {
      const data = {
        data: {
          search: keyword
        }
      }
      const response = await axios.post("https://us-central1-stockalarm-8b019.cloudfunctions.net/search", data)
      return response.data.result.tickers
    }

    const navigateToDetails = (query) => {
      
      router.push({
        name: "Stock Info",
        query: {
          ticker: `${query.exchange}:${query.symbol}`
        }
      })
  
      state.searchQuery = null
      state.searchResults = []
      searchQueryInput.value.blur()
      context.emit("clicked", { exchange: query.exchange, symbol: query.symbol })
    }

    return {
      state,
      debounceSearch,
      searchTicker,
      navigateToDetails,
      searchQueryInput
    }

  }
}
</script>




<style scoped>
.search {
  position: absolute;
  width: 100%;
  top: 1%;
  z-index: 30;
}
.search-results {
  display: flex;
  flex-direction: column;
 background: #292f3e;
  width: 100%;
  border-radius: 10px;
  text-align: left;
  padding: 10px;
  margin-top: 10px;
}
.search-loading {
  display: flex;
  background: #292f3e;
  width: 100%;
  border-radius: 10px;
  text-align: left;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-top: 10px;
  justify-content: center;
}

a {
  background: #292f3e;
  padding: 10px;
  text-decoration: none;
  color: white!important;
  font-weight: 500;
}
a:hover {
    background: #1e2331;
    color: white;
  border-radius: 10px;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}


.form-control {
  background-color: #292f3e;
    background-clip: padding-box;
    border: 1px solid #3b4253;
    color: white;
}
@media(min-width: 768px) {
  .search {
  top: 3%;
}
}
</style>
