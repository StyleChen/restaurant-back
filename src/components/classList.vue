<template>
  <div>
    <div class="userAction">
      <div class="float-right">
        <Button type="warning" size="large" @click="addTableClick">添加分类</Button>
      </div>
    </div>
    <Table :columns="columns" :data="datas"></Table>
    <Modal v-model="addTable" :title="tableNum === '' ? '添加分类' : '修改分类'" @on-ok="addTableOk" @on-cancel="cancel">
      <Form :label-width='80'>
        <FormItem label="分类名称">
          <Input v-model="tableNum" placeholder="请输入分类..."></Input>
        </FormItem>
        <FormItem label="设备列表">
          <Select name="sel" v-model='print' placeholder='请选择打印设备'>
            <Option :value="sel.name" v-for='sel in list' :key="sel.name">{{sel.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否打印">
          <Select name="isPrint" v-model='isprint' placeholder='请选择是否打印'>
            <Option :value="1">是</Option>
            <Option :value="0">否</Option>
          </Select>
        </FormItem>
        <FormItem label="显示位置">
          <Select name="show" v-model='show' placeholder='请选择显示位置'>
            <Option :value="1">客户端</Option>
            <Option :value="2">服务员端</Option>
            <Option :value="3">全部显示</Option>
          </Select>
        </FormItem>
          <FormItem label="排序号">
            <Input v-model="sortNum" placeholder="请输入排序号..."></Input>
          </FormItem>
      </Form>
    </Modal>
    <Modal v-model="del" title="确定删除该桌？" @on-ok="addTableDel" @on-cancel="cancel">
    </Modal>
  </div>
</template>
<script>
  import apis from '@/apis';

  let lists = [];
  try {
    lists = window.CLODOP.Printers.list;
  } catch (e) {
    lists = [];
    console.log('没有安装打印机检测软件 : ', e);
  }

  export default {
    data() {
      const that = this;
      return {
        isprint: 1, // 是否打印
        show: 3, // 显示位置
        del: false, // 删除桌号
        sortNum: '', // 排序号
        addTable: false, // 添加
        TableEdit: false, // 修改
        params: '', // 当前桌号参数
        list: lists,
        tableNum: '', // 桌号
        print: '', // 打印设备
        columns: [
          {
            title: '分类名称',
            key: 'rft_typename',
            align: 'center',
          },
          {
            title: '打印设备',
            key: 'rft_print',
            align: 'center',
          },
          {
            title: '是否打印',
            key: 'rft_isprint',
            align: 'center',
          },
          {
            title: '显示位置',
            key: 'rft_show',
            align: 'center',
          },
          {
            title: '排序',
            key: 'rft_sort',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
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
                      that.tableNum = params.row.rft_typename;
                      that.sortNum = params.row.rft_sort;
                      that.isprint = params.row.rft_isprint === '否' ? 0 : 1;
                      let show = 3;
                      switch (params.row.rft_show) {
                        case '客户端':
                          show = 1;
                          break;
                        case '服务员端':
                          show = 2;
                          break;
                        default:
                          show = 3;
                      }
                      that.show = show;
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
        /* eslint-disable */
          if (this.tableNum && this.sortNum) {
            if (this.TableEdit) {
              this.TableEdit = false;
              // 分类修改
              this.$http.post(apis.FoodTypeEdit,
                {
                  rft_id: this.params.row.rft_id,
                  rft_typename: this.tableNum,
                  rft_sort: this.sortNum,
                  rft_print: this.print,
                  rft_isprint: this.isprint,
                  rft_show: this.show
                })
                .then((res) => {
                  res.json().then((ress) => {
                    if (ress.success) {
                      this.$Message.success('修改成功');
                      this.TableList();
                    }
                  });
                });
            } else {
              // 添加
              this.$http.post(apis.FoodTypeAdd,
                {
                  rft_sort: this.sortNum,
                  rft_typename: this.tableNum,
                  rft_print: this.print,
                  rft_isprint: this.isprint,
                  rft_show: this.show })
                .then(res => res.json()).then((ress) => {
                if (ress.success) {
                  this.$Message.success('添加成功');
                  this.TableList();
                }
              });
            }
          } else {
            this.$Message.error('操作失败');
          }
      },
      // 取消
      cancel() {
        return false;
      },
      // 删除桌号
      addTableDel() {
        this.$http.post(apis.FoodTypeDel, { rft_id: this.params.row.rft_id })
          .then((res) => {
            res.json().then((ress) => {
              if (ress.success) {
                this.$Message.success('删除成功');
                this.TableList();
              }
            });
          });
      },
      // 分类列表
      TableList() {
        this.$http.post(apis.FoodTypeList)
          .then((res) => {
            res.json().then((ress) => {
              if (ress.success) {
                this.datas = ress.result;
              }
            });
          });
      },
      addTableClick() {
        this.addTable = true;
        this.tableNum = '';
        this.sortNum = '';
        this.isprint = 1;
        this.show = 3;
      },
    },
    mounted() {
      this.TableList();
    },
  };
</script>
<style scoped>
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
