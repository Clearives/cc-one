<template>
  <div class="register">
    <mt-header fixed title="注册"></mt-header>
    <div class="register-box">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="userid"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <div class="btn-register">
        <mt-button @click.native="handleRsgister">点击注册</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import crypto from 'crypto';

let md5 = crypto.createHash('md5');

export default {
  name: 'register',
  data() {
    return {
      userid: '',
      password: ''
    };
  },
  methods: {
    handleRsgister: function() {
      if (this.userid == '' || this.password == '') return;
      let params = {
        userid: this.userid,
        password: md5.update(this.password).digest('hex')
      };
      axios.post('/api/register', params).then((res) => {
        if (res.data.code === 200) {
          location.href = '#/hello';
          sessionStorage.setItem('user', JSON.stringify(params));
        }
      });
    },
  }
};
</script>

<style lang="less">
  .register {
    .register-box {
      margin-top: 80px;
      .btn-register {
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
