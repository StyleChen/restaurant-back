<template>
  <div>
    <header class="header">
      <div class="wrap">
        <ul class="left_ul">
          <li><a href="#"><i class="icon iconfont icon-home"></i>梦高速首页</a></li>
          <li><a href="#"><i class="icon iconfont icon-shouji"></i>手机梦云街</a></li>
        </ul>
        <ul class="right_ul">
          <li>您好,{{ra_realname}}</li>
          <li><a href="#" class="line" @click="modal=true">退出</a></li>
          <li><a href="#" class="line">帮助中心</a></li>
          <li><a href="#" class="line">网站导航</a></li>
          <li><a href="#"><i class="icon iconfont icon-weixin1"></i></a></li>
          <li><a href="#"><i class="icon iconfont icon-weibo-logo"></i></a></li>
        </ul>
      </div>
    </header>
    <nav class="nav">
      <div class="wrap">
        <img src="../assets/images/logo.png" alt="" class="logo">
        <ul class="nav-bar">
          <router-link to="/admin" class="nav-bar__link" tag="li">菜品管理</router-link>
          <router-link to="/Order" class="nav-bar__link" tag="li">订单管理</router-link>
          <router-link to="/Finance" class="nav-bar__link" tag="li">财务管理</router-link>
          <router-link to="/Table" class="nav-bar__link" tag="li">桌号管理</router-link>
          <router-link to="/Account" class="nav-bar__link" tag="li">账号管理</router-link>
          <router-link to="/activity" class="nav-bar__link" tag="li">公告管理</router-link>
          <router-link to="/Print" class="nav-bar__link" tag="li">设置管理</router-link>
        </ul>
      </div>
    </nav>
    <div class="wrap">
      <router-view></router-view>
    </div>
    <Modal v-model="modal" title="退出登录" @on-ok="logout" @on-cancel="cancel">
      <h3 style="text-align: center;">确定退出当前账号?</h3>
    </Modal>
  </div>
</template>

<script>
import apis from '@/apis';

export default {
  data() {
    return {
      ra_realname: JSON.parse(sessionStorage.getItem('userInfo')).ra_realname,
      modal: false,
    };
  },
  methods: {
    logout() {
      this.$http.post(apis.SignOut).then((res) => {
        res.json().then((ress) => {
          if (ress.success) {
            sessionStorage.removeItem('userInfo');
            location.href = '/waiter/restaurant/login';
          }
        });
      });
    },
    cancel() {
      return false;
    },
  },
};
</script>

<style>
.header {
  height: 30px;
  background: #f5f5f5;
  width: 100%;
  color: #666;
}
.header a {
  color: #666;
}
.left_ul {
  float: left;
  line-height: 30px;
}
.right_ul {
  float: right;
  line-height: 30px;
}
.header li {
  float: left;
}
.header li a{
  padding: 0 8px;
}
.line {
  border-right: 1px solid #999;
}
.header .right_ul li:last-child {
  margin-right: 0;
}
.header .left_ul li:first-child {
  margin-left: 0;
}
.header .iconfont {
  margin-right: 5px;
}
.nav {
  background: var(--theme);
  height: 60px;
  margin-bottom: 10px;
}
.nav img{
  margin-top: 10px;
  float: left;
}
.nav-bar {
  float: left;
  margin-left: 60px;
}
.nav-bar .router-link-active {
  background: #ec6413;
}
.nav-bar__link{
  height: 60px;
  width: 100px;
  float: left;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
.ivu-input {
  background: #FFFFFF;
}
</style>
