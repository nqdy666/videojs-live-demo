<template>
  <div class="home">
    <img alt="Vve logo" src="../assets/logo.png">
    <HelloVve msg="您好， VVE"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloVve from '@/components/HelloVve.vue'

export default {
  name: 'home',
  components: {
    HelloVve
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding-top: 100px;
  text-align: center;

  img {
    padding: 10px;
  }
}
</style>
