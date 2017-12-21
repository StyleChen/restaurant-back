<template>
  <div>
    <div class="dateTime">
      <div class="back" @click="goBack"><Icon type="reply" size="20" color="#bbb"></Icon></div>
      <p>{{totalTime}} 账单 : </p>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <p>入账金额</p>
      <h3 style="color: #ea5820; font-size: 30px;">￥{{totalData.total.toFixed(2)}}</h3>
    </div>
    <ul class="totalList">
      <li>
        <p>会员卡支付 :</p>
        <div class="totalDetail kaxinxi">
          <p><i class="icon icon-kaxinxi iconfont"></i></p>
          <p class="">￥{{parseFloat(totalData.vip).toFixed(2)}}</p>
        </div>
      </li>
      <li>
        <p>现金支付 :</p>
        <div class="totalDetail xianjin">
          <p><i class="icon icon-xianjin iconfont"></i></p>
          <p>￥{{parseFloat(totalData.cash).toFixed(2)}}</p>
        </div>
      </li>
      <li>
        <p>刷卡支付 :</p>
        <div class="totalDetail qiapian">
          <p><i class="icon icon-qiapian iconfont"></i></p>
          <p>￥{{parseFloat(totalData.bank).toFixed(2)}}</p>
        </div>
      </li>
      <li>
        <p>微信支付 :</p>
        <div class="totalDetail weixin">
          <p><i class="icon icon-weixin iconfont"></i></p>
          <p>￥{{parseFloat(totalData.wechat).toFixed(2)}}</p>
        </div>
      </li>
      <li>
        <p>支付宝支付 :</p>
        <div class="totalDetail zhifubao">
          <p><i class="icon icon-zhifubao iconfont"></i></p>
          <p>￥{{parseFloat(totalData.ali).toFixed(2)}}</p>
        </div>
      </li>
    </ul>
    <div style="position: relative;">
      <Table :columns="columns" :data="datas"></Table>
      <Page :total="totalPage" show-elevator @on-change="changePage" :page-size="8"></Page>
      <Select v-model="paytype" class="paySelect" placeholder="支付方式">
        <Option value="">全部</Option>
        <Option value="会员卡支付">会员卡支付</Option>
        <Option value="现金支付">现金支付</Option>
        <Option value="刷卡支付">刷卡支付</Option>
        <Option value="微信支付">微信支付</Option>
        <Option value="支付宝支付">支付宝支付</Option>
      </Select>
    </div>
  </div>
</template>
<script>
import apis from '@/apis';

export default {
  data() {
    return {
      totalTime: this.$route.query.date,
      totalData: {
        ali: 0,
        bank: 0,
        cash: 0,
        total: 0,
        vip: 0,
        wechat: 0,
      },
      columns: [
        {
          title: '订单号',
          key: 'ro_number',
          width: 150,
        },
        {
          title: '开桌时间',
          key: 'ro_opentbaledate',
          width: 150,
        },
        {
          title: '就餐人数',
          key: 'people',
          width: 120,
        },
        {
          title: '支付方式',
          key: 'ro_paytype',
          width: 120,
        },
        {
          title: '就餐时段',
          key: 'ro_timeinterval',
        },
        {
          title: '优惠',
          key: 'ro_discount',
        },
        {
          title: '实收金额(元)',
          key: 'ro_actualprice',
        },
      ],
      datas: [],
      totalPage: 0,
      paytype: '',
    };
  },
  methods: {
    getList(pageIndexs = 1, paytype = this.paytype) {
      this.$http.post(apis.FinanceCountDetailList,
      { pageIndex: pageIndexs, pageSize: 8, totalTime: this.totalTime, ro_paytype: paytype })
      .then(res => res.json()).then((res) => {
        if (res.success) {
          this.datas = [];
          res.result.data.map((val) => {
            const obj = val;
            obj.people = `${val.ro_mealAnum}成人${val.ro_mealBnum}儿童`;
            obj.ro_actualprice = parseFloat(obj.ro_actualprice).toFixed(2);
            this.datas.push(obj);
            return this.datas;
          });
          this.totalPage = res.result.total;
        }
      });
    },
    changePage(val) {
      this.getList(val);
    },
    goBack() {
      history.back(-1);
    },
  },
  mounted() {
    this.$http.post(apis.FinanceCountDetail, { totalTime: this.totalTime })
    .then(res => res.json()).then((res) => {
      if (res.success) {
        this.totalData = res.result;
      }
    });
    this.getList();
  },
  watch: {
    paytype(val) {
      this.getList(1, val);
    },
  },
};
</script>

<style>
.dateTime {
  padding-top: 10px;
  overflow: hidden;
  line-height: 35px;
}
.back {
  width: 35px;
  height: 35px;
  background-color: #edeff1;
  float: right;
  border-radius: 50%;
  text-align: center;
  padding-top: 3px;
}
.totalList {
  overflow: hidden;
  margin-bottom: 20px;
}
.totalList li {
  float: left;
  width: 164px;
  height: 125px;
  border-radius: 5px;
  background-color: #edeff1;
  margin-left: 20px;
  padding: 15px 13px;
}
.totalList li:first-child {
  margin-left: 0;
}
.totalList li > p {
  font-size: 14px;
}
.totalDetail {
  text-align: center;
  font-size: 14px;
}
.kaxinxi {
  color: #ea5820;
}
.xianjin {
  color: #f2b955;
}
.qiapian {
  color: #a0c3f3;
}
.weixin {
  color: #07af12;
}
.zhifubao {
  color: #009fe8;
}
.totalDetail .iconfont {
  font-size: 32px;
}
.paySelect {
  position: absolute;
  width: 95px;
  top: 5px;
  left: 430px;
  background: transparent;
}
.paySelect .ivu-select-selection {
  background: #f8f8f9;
  border: none;
}
</style>

