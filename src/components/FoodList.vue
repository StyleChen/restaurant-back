<template>
  <div class="userwrap" style="position: relative;">
    <div class="userAction">
      <Input v-model="searchText" placeholder="请输入菜品名称">
      <Button slot="prepend" icon="ios-search"></Button>
      </Input>
    </div>
    <Table :columns="columns" :data="datas"></Table>
    <Page :total='pageTotal' show-elevator :current="parseInt(current)" @on-change="pageSelect" :page-size="8"></Page>
    <Select class="typess" v-model="types" placeholder='分类'>
        <Option value="all">全部</Option>
        <Option :value="item.rft_id" v-for="item in classList" :key="item.rft_id">{{item.rft_typename}}</Option>
    </Select>
    <Select class="states" v-model="state" placeholder='状态'>
        <Option value="all">全部</Option>
        <Option value="1">正常</Option>
        <Option value="0">下架</Option>
    </Select>
  </div>
</template>
<script>
import apis from '@/apis';

export default {
  data() {
    const that = this;
    return {
      current: sessionStorage.pageIndex ? sessionStorage.pageIndex : 1,
      pageTotal: 0, // 翻页总条数
      state: '', // 状态
      types: '', // 分类
      classList: [], // 分类列表
      searchText: '', // 搜索
      columns: [
        {
          title: '菜品名称',
          width: 310,
          align: 'left',
          render(h, params) {
            return h('div', [
              h('img', {
                attrs: {
                  src: `http://upload.dreamhiway.com/img/${params.row.rf_imgae}_670x670.jpg`,
                },
                style: {
                  margin: '10px',
                  marginLeft: 0,
                  width: '55px',
                  height: '55px',
                  verticalAlign: 'middle',
                },
                on: {
                  click: () => {
                  },
                },
              }),
              h('span', {
                style: {
                },
                on: {
                  click: () => {
                  },
                },
              }, params.row.rf_name),
            ]);
          },
        },
        {
          title: '分类',
          key: 'rft_typename',
        },
        {
          title: '单价',
          key: 'rf_price',
        },
        {
          title: '库存',
          key: 'stock',
        },
        {
          title: '状态',
          key: 'state',
        },
        {
          title: '操作',
          render(h, paramss) {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                },
                style: {
                },
                on: {
                  click: () => {
                    that.$router.push({
                      name: 'ReleaseList',
                      query: { id: paramss.row.rf_id },
                    });
                  },
                },
              }, '修改'),
            ]);
          },
        },
      ],
      datas: [],
    };
  },
  methods: {
    getList(pageIndexs = sessionStorage.pageIndex, pageSizes = 8, key = '', types = '', state = '') {
      console.log(pageIndexs);
      this.$http.post(apis.FoodList,
      { pageIndex: pageIndexs, pageSize: pageSizes, keyword: key, rf_type: types, rf_state: state })
                  .then(res => res.json()).then((ress) => {
                    if (ress.success) {
                      this.pageTotal = ress.result.total;
                      this.datas = [];
                      ress.result.data.map((val) => {
                        const obj = val;
                        if (val.rt_stock === -1) {
                          obj.stock = '99+';
                        } else {
                          obj.stock = val.rt_stock;
                        }
                        if (val.rf_state === 1) {
                          obj.state = '正常';
                        } else {
                          obj.state = '下架';
                        }
                        this.datas.push(obj);
                        sessionStorage.pageIndex = pageIndexs;
                        return this.datas;
                      });
                    }
                  });
    },
    // 翻页
    pageSelect(val) {
      this.getList(val, 8, this.searchText, this.types, this.state);
    },
  },
  watch: {
    types(val) {
      let value = '';
      if (val !== 'all') {
        value = val;
      }
      this.getList(1, 8, this.searchText, value, this.state);
    },
    state(val) {
      let value = '';
      if (val !== 'all') {
        value = val;
      }
      this.getList(1, 8, this.searchText, this.types, value);
    },
    searchText(val) {
      this.getList(1, 8, val, this.types, this.state);
    },
  },
  mounted() {
    sessionStorage.pageIndex = sessionStorage.pageIndex ? sessionStorage.pageIndex : 1;
    this.getList();
    // 分类列表
    this.$http.post(apis.FoodTypeList)
          .then(res => res.json()).then((ress) => {
            if (ress.success) {
              this.classList = ress.result;
            }
          });
  },
};
</script>
<style>
  .typess,
  .states {
    position: absolute;
    top: 95px;
    width: 100px;
  }
  .typess .ivu-select-selection,
  .states .ivu-select-selection {
    background: #f8f8f9;
    border: none;
  }
  .typess .ivu-select-selected-value,
  .typess .ivu-select-placeholder,
  .states .ivu-select-selected-value,
  .states .ivu-select-placeholder {
    text-align: center;
  }
  .typess {
    left: 295px;
  }
  .states {
    left: 653px;
  }
</style>
