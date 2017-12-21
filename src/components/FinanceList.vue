<template>
  <div class="userAction1">
    <div style="width: 50%; line-height: 40px;">
      <Row>
        <Col span='4'>
          <p>订单时间</p>
        </Col>
        <Col span='12'>
          <DatePicker style="width: 200px;" :value="dateTime" :options='option' type="daterange" @on-change='dateTimeC' placeholder="选择日期区间"></DatePicker>
        </Col>
        <Col span='8'>
          <Button size="small" type="warning" style="width: 70px;" @click="dateTimeChange">查询</Button>
        </Col>
      </Row>
    </div>
    <Table :columns="columns" :data="datas" style="margin-top: 20px;"></Table>
    <Page :total="totalPage" @on-change='pageChange' show-elevator></Page>
  </div>
</template>
<script>
import apis from '@/apis';

export default {
  data() {
    const that = this;
    return {
      totalPage: 0,
      dateTime: ['2017-11-01', `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`],
      option: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
      },
      columns: [
        {
          title: '日期',
          key: 'totalTime',
          align: 'center',
        },
        {
          title: '入账金额(元)',
          key: 'totalPrice',
          align: 'center',
        },
        {
          title: '操作',
          align: 'center',
          render(h, params) {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {
                    that.$router.push({
                      name: 'FinancelDetail',
                      query: { date: params.row.totalTime },
                    });
                  },
                },
              }, '查看'),
            ]);
          },
        },
      ],
      datas: [],
    };
  },
  methods: {
    getList(pageIndexs = 1, pageSizes = 10, date = this.dateTime) {
      this.$http.post(apis.FinanceCountList,
      { begintime: date[0], endtime: date[1], pageIndex: pageIndexs, pageSize: pageSizes })
      .then((res) => {
        res.json().then((ress) => {
          if (ress.success) {
            this.datas = [];
            ress.result.data.map((val) => {
              const value = val;
              value.totalPrice = val.totalPrice.toFixed(2);
              this.datas.push(value);
              return this.datas;
            });
            this.totalPage = ress.result.total;
          }
        });
      }, res => this.$Message.error(res.msg));
    },
    pageChange(val) {
      this.getList(val);
    },
    dateTimeChange() {
      this.getList();
    },
    dateTimeC(val) {
      this.dateTime = val;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style scoped>
.userAction1 {
  padding-top: 30px;
}
</style>

