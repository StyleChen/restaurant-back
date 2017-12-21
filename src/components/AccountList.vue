<template>
  <div class="userwrap" style="position: relative;">
    <div class="userAction">
      <Input v-model="searchText" placeholder="请输入账号或姓名">
      <Button slot="prepend" icon="ios-search"></Button>
      </Input>
      <div class="float-right">
        <Button type="warning" size="large" @click="add">新增账号</Button>
      </div>
    </div>
    <Table :columns="columns" :data="datas"></Table>
    <Page :total='pageTotal' show-elevator @on-change="pageSelect"></Page>
    <Select class="types" v-model="types" placeholder='用户组'>
        <Option value="all">全部</Option>
        <Option value="1">超级管理员</Option>
        <Option value="2">服务员</Option>
        <Option value="3">收银员</Option>
        <!-- <Option :value="item.rft_id" v-for="item in classList" :key="item.rft_id">{{item.rft_typename}}</Option> -->
    </Select>
    <Select class="state" v-model="state" placeholder='状态'>
        <Option value="all">全部</Option>
        <Option value="1">正常</Option>
        <Option value="0">暂停权限</Option>
    </Select>
    <Modal
      v-model="modal"
      width="760"
      :styles="{top: '150px'}"
      title="新增账号"
      @on-ok="addUpdate"
      @on-cancel="cancel">
      <Form ref='user' :model='user' :rules='userRules' :label-width='80' style="width:50%">
        <FormItem label='登录账号' prop='ra_username'>
          <Input v-model="user.ra_username" :disabled="Boolean(user.ra_id)"></Input>
        </FormItem>
        <FormItem label='真实姓名' prop='ra_realname'>
          <Input v-model="user.ra_realname" :disabled="Boolean(user.ra_id)"></Input>
        </FormItem>
        <Row>
          <Col span="14">
          <FormItem label='用户组' prop='ra_type'>
            <Select v-model="user.ra_type">
              <Option value="1">超级管理员</Option>
              <Option value="2">服务员</Option>
              <Option value="3">收银员</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10">
          <FormItem label='状态' :label-width='60' prop='ra_state'>
            <Select v-model="user.ra_state">
              <Option value="1">正常</Option>
              <Option value="0">暂停权限</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <FormItem label='密码' prop='ra_pwd'>
          <Input type="password" v-model="user.ra_pwd"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import apis from '@/apis';

export default {
  data() {
    const that = this;
    return {
      modal: false, // 新增账号
      pageTotal: 0, // 翻页总条数
      state: '', // 状态
      types: '', // 分类
      classList: ['超级管理员', '服务员', '收银员'], // 分类列表
      searchText: '', // 搜索
      user: {
        ra_username: '',
        ra_realname: '',
        ra_pwd: '',
        ra_type: '',
        ra_state: '',
      },
      userRules: {
        ra_username: [
          { required: true, message: '登录账号不能为空', trigger: 'blur' },
        ],
        ra_realname: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' },
        ],
        ra_pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        ra_type: [
          { required: true, message: '分组不能为空', trigger: 'blur' },
        ],
        ra_state: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ],
      },
      columns: [
        {
          title: '登录账号',
          key: 'ra_username',
        },
        {
          title: '真实姓名',
          key: 'ra_realname',
        },
        {
          title: '用户组',
          key: 'types',
        },
        {
          title: '状态',
          key: 'state',
        },
        {
          title: '操作',
          render(h, params) {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                },
                style: {
                },
                on: {
                  click: () => {
                    that.modal = true;
                    that.user = params.row;
                    switch (that.user.ra_type) {
                      case '超级管理员':
                        that.user.ra_type = '1';
                        break;
                      case '服务员':
                        that.user.ra_type = '2';
                        break;
                      default:
                        that.user.ra_type = '3';
                    }
                    that.user.ra_state = that.user.ra_state === '正常' ? '1' : '0';
                  },
                },
              }, '编辑'),
            ]);
          },
        },
      ],
      datas: [],
    };
  },
  methods: {
    getList(pageIndexs = 1, pageSizes = 10, key = '', types = '', state = '') {
      this.$http.post(apis.UserList,
      { pageIndex: pageIndexs, pageSize: pageSizes, keyword: key, ra_type: types, ra_state: state })
                  .then(res => res.json()).then((ress) => {
                    if (ress.success) {
                      this.pageTotal = ress.result.total;
                      this.datas = [];
                      ress.result.data.map((val) => {
                        const obj = val;
                        if (val.ra_state === 1) {
                          obj.ra_state = '正常';
                        } else {
                          obj.ra_state = '暂停权限';
                          obj.cellClassName = {
                            state: 'error',
                          };
                        }
                        if (val.ra_type === 1) {
                          obj.ra_type = '超级管理员';
                        } else if (val.ra_type === 2) {
                          obj.ra_type = '服务员';
                        } else {
                          obj.ra_type = '收银员';
                        }
                        obj.types = obj.ra_type;
                        obj.state = obj.ra_state;
                        this.datas.push(obj);
                        return this.datas;
                      });
                    }
                  });
    },
    // 翻页
    pageSelect(val) {
      this.getList(val, 10, this.searchText, this.types, this.state);
    },
    cancel() {
      return false;
    },
    add() {
      this.modal = true;
      this.user = {
        ra_username: '',
        ra_realname: '',
        ra_pwd: '',
        ra_type: '',
        ra_state: '',
      };
    },
    addUpdate() {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.user.ra_type = this.user.ra_type === 'all' ? '' : this.user.ra_type;
          this.user.ra_state = this.user.ra_state === 'all' ? '' : this.user.ra_state;
          let url = apis.UserAdd;
          if (this.user.ra_id) {
            url = apis.UserEdit;
          }
          this.$http.post(url, this.user).then(res => res.json())
            .then((ress) => {
              if (ress.success) {
                this.$Message.success('提交成功!');
                this.getList();
              } else {
                this.$Message.error(ress.msg);
              }
            });
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    },
  },
  watch: {
    types(val) {
      let value = '';
      if (val !== 'all') {
        value = val;
      }
      this.getList(1, 10, this.searchText, value, this.state);
    },
    state(val) {
      let value = '';
      if (val !== 'all') {
        value = val;
      }
      this.getList(1, 10, this.searchText, this.types, value);
    },
    searchText(val) {
      this.getList(1, 10, val, this.types, this.state);
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style>
  .types,
  .state {
    position: absolute;
    top: 95px;
    width: 100px;
  }
  .types .ivu-select-selection,
  .state .ivu-select-selection {
    background: #f8f8f9;
    border: none;
  }
  .types.ivu-select-single .ivu-select-selection .ivu-select-selected-value,
  .types.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .state.ivu-select-single .ivu-select-selection .ivu-select-selected-value,
  .state.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
    text-align: center;
    color: #333;
    font-weight: bold;
  }
  .types {
    left: 353px;
  }
  .state {
    left: 527px;
  }
  .error {
    color: #d6000f;
  }
</style>

