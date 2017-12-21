<template>
  <div class="userWrap">
    <Form ref="formValidate" :model="release" :label-width="100" :rules="ruleValidate">
      <FormItem label="菜品图片"  prop="rf_imgae">
        <Input v-model="release.rf_imgae" style="width: 280px;" hidden></Input>
        <Upload
          multiple
          type="drag"
          :format="['jpg','jpeg','png']"
          :headers="{Accept: 'application/json; charset=utf-8'}"
          action="http://upload.dreamhiway.com/uploadimg?key=o2o&t=670x670"
          :on-success="uploadSuccess">
          <div class="uploadDiv">
            <img :src="`http://upload.dreamhiway.com/img/${this.release.rf_imgae}_670x670.jpg`" v-if="release.rf_imgae" alt="" class="rf_imgae">
            <Icon v-else type="ios-cloud-upload" size="52" style="color: #3399ff;margin-top: 21px;"></Icon>
          </div>
        </Upload>
      </FormItem>
      <FormItem label="菜品名称"  prop="rf_name">
        <Input v-model="release.rf_name" style="width: 280px;"></Input>
      </FormItem>
      <FormItem label="分类"  prop="rf_type">
        <Select v-model="release.rf_type" style="width: 280px;">
          <Option :value="item.rft_id" v-for="item in classList" :key="item.rft_id">{{item.rft_typename}}</Option>
        </Select>
      </FormItem>
      <FormItem label="单价"  prop="rf_price">
        <InputNumber v-model="release.rf_price" style="width: 280px;"></InputNumber>
      </FormItem>
      <FormItem label="库存">
        <InputNumber :min="1" v-model="release.rt_stock" style="width: 280px;"></InputNumber>
      </FormItem>
      <FormItem label="状态"  prop="rf_state">
        <Select v-model="release.rf_state" style="width: 280px;">
          <Option value="1">正常</Option>
          <Option value="0">下架</Option>
        </Select>
      </FormItem>
      <FormItem label="营养成分"  prop="rf_body">
        <Input v-model="release.rf_body" style="width: 560px;" type="textarea" :autosize="{minRows: 8,maxRows: 15}" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem>
        <Button type="warning" style="width: 140px;" @click="handleSubmit()">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import apis from '@/apis';

  export default {
    props: ['release'],
    data() {
      const hdidReg = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('分类不能为空'));
        } else {
          callback();
        }
      };
      const price = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('单价不能为空'));
        } else {
          callback();
        }
      };
      return {
        classList: [], // 分类列表
        ruleValidate: {
          rf_name: [
            { required: true, message: '名称不能为空', trigger: 'blur' },
          ],
          rf_body: [
            { required: true, message: '营养成分不能为空', trigger: 'blur' },
          ],
          rf_imgae: [
            { required: true, message: '主图不能为空', trigger: 'blur' },
          ],
          rf_price: [
            { validator: price, required: true, trigger: 'blur' },
          ],
          rf_type: [
            { validator: hdidReg, required: true, trigger: 'blur' },
          ],
          rf_state: [
            { required: true, message: '状态不能为空', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            let url = apis.FoodAdd;
            if (this.release.rf_id) {
              url = apis.FoodEdit;
            }
            this.$http.post(url, this.release)
              .then(res => res.json()).then((ress) => {
                if (ress.success) {
                  this.$Message.success('发布成功!');
                }
              });
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      uploadSuccess(file) {
        this.release.rf_imgae = file.path + file.name;
      },
    },
    mounted() {
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
  .ivu-upload {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    background-color: #ffffff;
    overflow: hidden;
  }
  .ivu-upload-drag {
    border: solid 1px #d2d2d2;
  }
  .rf_imgae {
    max-width:100%;
  }
</style>
