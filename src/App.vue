<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">

      <router-link class="navbar-brand" to="/">Stocks App</router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/news">News</router-link>
          </li>

        </ul>
      </div>

    </div>
  </nav>

  <router-view />

</template>

<style>
#app {
  font-family:-apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.navbar{
      background: #20283c!important;
    color: white!important;
    border-bottom: 1px solid #3b4253;
}
.navbar-brand {
  font-weight: 800!important;
}
</style>
