<template>
<div class="hello">
  <h3>{{msg}}</h3>
  <p>Hello, {{user.userid}}</p>
</div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to cc-one',
      user: ''
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .hello {
    width: 80%;
    height: 200px;
    margin: 0 auto;
    margin-top: 15%;
    p {
      color: #f60;
      padding: 20px 0;
    }
  }
</style>
