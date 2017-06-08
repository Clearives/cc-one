<template>
<div class="hello">
  <mt-header title="msg">
    <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to cc-one',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .test {
    font-size: 0.28rem;
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
  }
</style>
