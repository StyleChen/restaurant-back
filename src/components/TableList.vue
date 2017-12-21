<template>
  <div>
    <div class="userAction">
      <Input v-model="searchText" placeholder="请输入桌号...">
      <Button slot="prepend" icon="ios-search"></Button>
      </Input>
      <div class="float-right">
        <Button type="warning" size="large" @click="addTable=true;tableNum='';">添加桌号</Button>
      </div>
    </div>
    <Table :columns="columns" :data="datas"></Table>
    <Modal v-model="addTable" :title="tableNum === '' ? '添加桌号' : '修改桌号'" @on-ok="addTableOk" @on-cancel="cancel">
      <Input v-model="tableNum" placeholder="多个桌号使用'/'隔开，如'1号桌/2号桌/3号桌...'"></Input>
    </Modal>
    <Modal v-model="del" title="确定删除该桌？" @on-ok="addTableDel" @on-cancel="cancel">
    </Modal>
    <Modal v-model="QrSize" title="二维码下载" @on-ok="cancel" @on-cancel="cancel">
      <tabel class="tabel">
        <thead>
          <tr>
            <th>
              二维码边长
            </th>
            <th>
              建议扫描距离
            </th>
            <th>
              下载链接
            </th>
          </tr>
        </thead>
        <tbody class="downloadList">
          <tr v-for="qr in QrSizes" :key="qr.width">
            <td>{{qr.width}}</td>
            <td>{{qr.distance}}</td>
            <td>
              <a class="glyphicon glyphicon-cloud-download" :href="qr.url">
                <Icon type="ios-download-outline"></Icon>
              </a>
            </td>
          </tr>
        </tbody>
      </tabel>
    </Modal>
    <Page :total="PageTotal" show-elevator @on-change="pageSelect"></Page>
  </div>
</template>
<script>
  import apis from '@/apis';

  export default {
    data() {
      const that = this;
      return {
        QrSize: false, // 二维码尺寸
        QrSizes: [
          {
            width: '8cm',
            distance: '0.5m',
            url: '',
          },
          {
            width: '12cm',
            distance: '0.8m',
            url: '',
          },
          {
            width: '15cm',
            distance: '1m',
            url: '',
          },
          {
            width: '30cm',
            distance: '1.5m',
            url: '',
          },
          {
            width: '50cm',
            distance: '2.5m',
            url: '',
          },
        ], // 二维码尺寸
        PageTotal: 0, // 总条数
        del: false, // 删除桌号
        addTable: false, // 添加
        TableEdit: false, // 修改
        params: '', // 当前桌号参数
        tableNum: '', // 桌号
        searchText: '', // 搜索桌号
        columns: [
          {
            title: '桌号',
            key: 'rtn_tablename',
            align: 'center',
            width: 140,
          },
          {
            title: '下载二维码',
            key: 'down',
            align: 'center',
            render(h, params) {
              return h('div', [
                h('img', {
                  attrs: {
                    src: `${apis.TableQr}?url=${params.row.url}`,
                  },
                  style: {
                    marginRight: '40px',
                    marginTop: '15px',
                    marginBottom: '15px',
                    verticalAlign: 'middle',
                    width: '55px',
                    height: '55px',
                    padding: '5px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  on: {
                    click: () => {
                    },
                  },
                }),
                h('span', {
                  props: {
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      that.params = params;
                      that.QrSize = true;
                      that.QrSizes.map((val) => {
                        const vals = val;
                        vals.url = `${apis.TableQrDownload}?url=${params.row.url}&filename=${params.row.rtn_tablename}(${val.width}).png&text=${params.row.rtn_tablename}&size=${val.width}`;
                        return vals;
                      });
                    },
                  },
                }, '下载更多尺寸>'),
              ]);
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
                      that.addTable = true;
                      that.params = params;
                      that.TableEdit = true;
                      that.tableNum = params.row.rtn_tablename;
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
                      that.del = true;
                      that.params = params;
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
      addTableOk() {
        if (this.TableEdit) {
          this.TableEdit = false;
          // 桌号修改
          this.$http.post(apis.TableEdit,
            { rtn_id: this.params.row.rtn_id, rtn_tablename: this.tableNum })
            .then((res) => {
              res.json().then((ress) => {
                if (ress.success) {
                  this.$Message.success('修改成功');
                  this.TableList(1, 10);
                }
              });
            });
        } else {
          // 添加
          const tableNum = this.tableNum.split('/');
          const tabels = [];
          tableNum.map((val) => {
            tabels.push({
              tablename: val,
            });
            return tabels;
          });
          this.$http.post(apis.TableAdd, { table: tabels })
            .then(res => res.json()).then((ress) => {
              if (ress.success) {
                this.$Message.success('添加成功');
                this.TableList(1, 10);
              }
            });
        }
      },
      // 取消
      cancel() {
        return false;
      },
      // 删除桌号
      addTableDel() {
        this.$http.post(apis.TableDel, { rtn_id: this.params.row.rtn_id })
          .then((res) => {
            res.json().then((ress) => {
              if (ress.success) {
                this.$Message.success('删除成功');
                this.TableList(1, 10);
              }
            });
          });
      },
      // 桌号列表
      TableList(pageIndexNum = 1, pageSizeNum = 10, keywords = '') {
        this.$http.post(apis.TableList,
          { pageIndex: pageIndexNum, pageSize: pageSizeNum, keyword: keywords })
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
        this.TableList(val, 10);
      },
    },
    watch: {
      searchText(val) {
        this.TableList(1, 10, val);
      },
    },
    mounted() {
      this.TableList(1, 10);
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
