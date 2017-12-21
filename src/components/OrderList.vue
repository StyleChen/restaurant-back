<template>
  <div class="userwrap">
    <div class="userAction">
      <Input v-model="searchText" placeholder="请输入订单号...">
      <Button slot="prepend" icon="ios-search"></Button>
      </Input>
    </div>
    <Table :columns="columns" :data="datas"></Table>
    <Page :total="PageTotal" show-elevator @on-change="pageSelect"></Page>
  </div>
</template>
<script>
  import apis from '@/apis';

  export default {
    data() {
      return {
        PageTotal: 0,
        searchText: '',
        columns: [
          {
            title: '订单号',
            key: 'ro_number',
            width: '200',
          },
          {
            title: '开桌时间',
            key: 'ro_opentbaledate',
            width: '150',
          },
          {
            title: '就餐人数',
            key: 'ro_meal',
          },
          {
            title: '支付方式',
            key: 'ro_paytype',
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
            title: '实收金额',
            key: 'ro_actualprice',
          },
        ],
        datas: [],
      };
    },
    methods: {
      // 订单列表
      orderList(pageIndexNum = 1, pageSizeNum = 10, keywords = '') {
        this.$http.post(apis.OrderList,
          { pageIndex: pageIndexNum, pageSize: pageSizeNum, keyword: keywords })
          .then((res) => {
            res.json().then((ress) => {
              if (ress.success) {
                this.datas = ress.result.data;
                this.datas.map((val) => {
                  const value = val;
                  value.ro_meal = `${val.ro_mealAnum}成人${val.ro_mealBnum}儿童`;
                  return value;
                });
                this.PageTotal = ress.result.total;
              }
            });
          });
      },
      pageSelect(val) {
        this.orderList(val, 10, this.searchText);
      },
    },
    mounted() {
      this.orderList();
    },
    watch: {
      searchText(val) {
        this.orderList(1, 10, val);
      },
    },
  };
</script>
