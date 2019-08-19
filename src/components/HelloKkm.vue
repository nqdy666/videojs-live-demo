<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/demo"><cube-button class="btn">一个Demo页面</cube-button></router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloVve',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 20px;
}
.btn {
  margin: 10px;
}
</style>
