<template>
  <div>
    <div class="userAction">
      <Input v-model="searchText" placeholder="请输入标题">
      <Button slot="prepend" icon="ios-search"></Button>
      </Input>
      <div class="float-right">
        <Button type="warning" size="large" @click="$router.push('/activity/headline-publish')">发布头条</Button>
      </div>
    </div>
    <Table :columns="columns" :data="datas"></Table>
    <Page :total="PageTotal" show-elevator @on-change="pageSelect"></Page>
  </div>
</template>
<script>
  import apis from '@/apis';

  export default {
    data() {
      const that = this;
      return {
        searchText: '', // 搜索桌号
        columns: [
          {
            title: '标题',
            key: 'rn_content',
            width: 400,
          },
          {
            title: '发布时间',
            key: 'rn_time',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 140,
            render(h, params) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      that.$router.push({
                        path: '/activity/headline-publish',
                        query: {
                          rn_id: params.row.rn_id,
                          rn_content: params.row.rn_content,
                          rn_type: params.row.rn_type,
                        },
                      });
                    },
                  },
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      that.handleDel(params);
                    },
                  },
                }, '删除'),
              ]);
            },
          },
        ],
        datas: [],
      };
    },
    methods: {
      // 删除
      handleDel(params) {
        this.$http.post(apis.NoticeDelete, { rn_id: params.row.rn_id })
          .then((res) => {
            res.json().then((ress) => {
              if (ress.success) {
                this.$Message.success('删除成功');
                this.haedlineList(1, 10);
              }
            });
          });
      },
      // 列表
      haedlineList(pageIndexNum = 1, pageSizeNum = 10, keywords = '') {
        this.$http.post(apis.NoticeList,
          { pageIndex: pageIndexNum, pageSize: pageSizeNum, rn_content: keywords })
          .then((res) => {
            res.json().then((ress) => {
              if (ress.success) {
                this.datas = ress.result.data;
                this.PageTotal = ress.result.total;
              }
            });
          });
      },
      // 翻页
      pageSelect(val) {
        this.haedlineList(val, 10);
      },
    },
    watch: {
      searchText(val) {
        this.haedlineList(1, 10, val);
      },
    },
    mounted() {
      this.haedlineList(1, 10);
    },
  };
</script>
<style>
  .tabel,
  .tabel thead,
  .tabel thead tr,
  .tabel tbody tr,
  .tabel tbody {
    display: block;
    width: 100%;
  }
  .tabel thead {
    border-bottom: 1px dotted #e3e4e5;
  }
  .tabel thead th,
  .tabel tbody td {
    display: inline-block;
    width: 32%;
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 40px;
  }
  .ivu-icon-ios-download-outline {
    font-size: 18px;
    color: var(--theme);
    font-weight: bold;
  }
</style>
