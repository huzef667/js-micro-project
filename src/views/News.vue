<template>
    <div class='container'>
      <h1 class='text-center mb-5 mt-5 text-white display-3 fw-bold'>Finance News</h1>

      <div class='d-flex justify-content-center' v-for='(news, index) in state.news' :key='index'>
        <div class='col-xl-8'>
          <div class='row g-0  rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative card-finance'>
            <a class='col p-4 d-flex flex-column position-static news-link'  :href="news.link" target="_blank">
              <strong class='d-inline-block mb-2 text-primary text-finance'>Finance</strong>
              <h3 class='mb-0'>{{ news.title }}</h3>
              <div class='mb-1 text-muted'>
                {{ new Date(news.date).toDateString() }}
              </div>
              <p class='card-text mb-auto'>{{ news.content.slice(0, 230) }}</p>

            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'

export default {
  name: 'News',

  setup() {
    const state = reactive({
      news: null,
    })

    const getNews = async () => {
      const response = await axios.get(
        'https://eodhistoricaldata.com/api/news?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&s=AAPL.US&offset=0&limit=10'
      )
      state.news = response.data
    }

    getNews()

    return {
      getNews,
      state
    }

  }
}
</script>

<style scoped>
.news-link {
  text-align: left;
  text-decoration: none;
  color: white;
}
.text-finance {
      color: #43caff!important;
}
.card-finance {
  background: #3179f512;
    color: white;
    border: 1px solid #ffffff1f;
}
</style>
