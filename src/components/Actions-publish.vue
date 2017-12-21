<template>
  <div class="activity_wrapper">
    <div class="action_bar">
      <Button shape="circle" icon="ios-undo-outline" @click="$router.back()"></Button>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="活动标题" prop="ra_title">
        <Input v-model="formValidate.ra_title" placeholder="请输入标题" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="活动链接" prop="ra_url">
        <Input v-model="formValidate.ra_url" placeholder="请输入链接" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="主图" prop="ra_image">
        <upload :url="uploadUrl" size="300x200" :imgs.sync="formValidate.ra_image"></upload>
      </FormItem>
      <FormItem label="置顶" prop="ra_by">
        <RadioGroup v-model="formValidate.ra_by">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="主要内容" prop="ra_content">
        <quill-editor ref="myTextEditor"
          :content="formValidate.ra_content"
          :options="editorOption"
          @change="onEditorChange($event)">
        </quill-editor>
      </FormItem>
      <FormItem>
        <Button type="warning" style="width: 140px;" @click="handleSubmit">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import apis from '@/apis';
import upload from '@/components/Upload';

export default {
  components: { upload },
  data() {
    return {
      uploadUrl: apis.uploadImage,
      formValidate: {
        ra_title: this.$route.query.ra_title || '',
        ra_url: this.$route.query.ra_url || '',
        ra_content: this.$route.query.ra_content || '',
        ra_by: this.$route.query.ra_by || 0,
        ra_image: this.$route.query.ra_image ? [this.$route.query.ra_image] : [],
      },
      ruleValidate: {
        ra_title: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' },
        ],
        ra_by: [
          { required: true, message: 'Please select ', trigger: 'blur' },
        ],
        ra_url: [
          { type: 'url', message: 'Incorrect url format', trigger: 'blur' },
        ],
        ra_image: [
          { required: true, message: 'please select a picture' },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      if (!this.$route.query.ra_id) {
        this.$http.post(apis.ActivityAdd, {
          ra_title: this.formValidate.ra_title,
          ra_url: this.formValidate.ra_url,
          ra_content: this.formValidate.ra_content,
          ra_by: this.formValidate.ra_by,
          ra_image: this.formValidate.ra_image[0],
        }).then(res => res.json())
          .then((res) => {
            if (res.result) {
              const that = this;
              this.$Message.success({
                content: '提交成功',
                onClose() {
                  that.$router.back();
                },
              });
            }
          });
      } else {
        this.$http.post(apis.ActivityEdit, {
          ra_id: this.$route.query.ra_id,
          ra_title: this.formValidate.ra_title,
          ra_url: this.formValidate.ra_url,
          ra_content: this.formValidate.ra_content,
          ra_by: this.formValidate.ra_by,
          ra_image: this.formValidate.ra_image[0],
        }).then(res => res.json())
          .then((res) => {
            if (res.result) {
              const that = this;
              this.$Message.success({
                content: '提交成功',
                onClose() {
                  that.$router.back();
                },
              });
            }
          });
      }
    },
    onEditorChange({ html }) {
      this.formValidate.ra_content = html;
    },
  },
};
</script>


<style>
.activity_wrapper {
  padding-top: 30px;
}
.action_bar {
  display: flex;
  justify-content: flex-end;
  padding: 30px 0;
}
.action_bar .ivu-btn.ivu-btn-icon-only {
  color: var(--grey-lightergrey) !important;
}
</style>
