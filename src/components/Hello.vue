<template>
<div class="hello">
  <div class="test right">
    {{ msg }}
  </div>
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
