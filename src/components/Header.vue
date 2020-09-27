<template>
  <header>
    <router-link to="/">
      <h1>Hashtags Keeper.</h1>
    </router-link>
    <div class="btns">
      <button>
        <fa icon="user" />
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
