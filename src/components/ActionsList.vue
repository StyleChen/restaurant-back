<template>
  <div>
    <div class="userAction">
      <Input v-model="searchText" placeholder="请输入标题">
      <Button slot="prepend" icon="ios-search"></Button>
      </Input>
      <div class="float-right">
        <Button type="warning" size="large" @click="$router.push('/activity/actions-publish')">发布活动</Button>
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
            key: 'ra_title',
            width: 300,
          },
          {
            title: '链接',
            key: 'ra_url',
            align: 'center',
          },
          {
            title: '发布时间',
            key: 'ra_time',
            align: 'center',
          },
          {
            title: '置顶',
            key: 'ra_by',
            align: 'center',
            width: 80,
            render(h, params) {
              return h('div', params.row.ra_by === 0 ? '否' : '是');
            },
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
                        path: '/activity/actions-publish',
                        query: {
                          ra_id: params.row.ra_id,
                          ra_by: params.row.ra_by,
                          ra_title: params.row.ra_title,
                          ra_url: params.row.ra_url,
                          ra_content: params.row.ra_content,
                          ra_image: params.row.ra_image,
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
        this.$http.post(apis.ActivityDelete, { ra_id: params.row.ra_id })
          .then((res) => {
            res.json().then((ress) => {
              if (ress.success) {
                this.$Message.success('删除成功');
                this.actionsList(1, 10);
              }
            });
          });
      },
      // 列表
      actionsList(pageIndexNum = 1, pageSizeNum = 10, keywords = '') {
        this.$http.post(apis.ActivityList,
          { pageIndex: pageIndexNum, pageSize: pageSizeNum, ra_title: keywords })
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
        this.actionsList(val, 10);
      },
    },
    watch: {
      searchText(val) {
        this.actionsList(1, 10, val);
      },
    },
    mounted() {
      this.actionsList(1, 10);
    },
  };
</script>
<style>

</style>
