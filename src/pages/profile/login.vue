<template>
  <div class="login">
    <mt-header fixed title="登录"></mt-header>
    <div class="login-box">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="userid"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <div class="btn-login">
        <mt-button @click="handleLogin">点击登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'blueimp-md5';


export default {
  name: 'login',
  data() {
    return {
      userid: '',
      password: ''
    };
  },
  methods: {
    handleLogin: function() {
      if (this.userid == '' || this.password == '') return;
      let params = {
        userid: this.userid,
        password: md5(this.password)
      };
      axios.post('/api/login', params).then((res) => {
        if (res.data.code === 200) {
          location.href = '#/admin';
          sessionStorage.setItem('user', JSON.stringify(params));
        } else {
          console.log('登录失败');
        }
      });
    },
  }
};
</script>

<style lang="less">
  .login {
    .login-box {
      margin-top: 80px;
      .btn-login {
        width: 80%;
        height: 50px;
        line-height: 50px;
        margin: 20px auto;
        cursor: pointer;
        button {
          width: 100%;
          height: 100%;

        }
      }
    }
  }
</style>
