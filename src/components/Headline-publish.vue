<template>
  <div class="headline_publish_wrapper">
    <div class="action_bar">
      <Button shape="circle" icon="ios-undo-outline" @click="$router.back()"></Button>
    </div>
    <h1 class="headline_h1">头条发布</h1>
    <div class="content-wrapper">
      <RadioGroup v-model="rn_type" >
        <Radio label="1">
          <span>客户端</span>
        </Radio>
        <Radio label="2">
          <span>电视</span>
        </Radio>
      </RadioGroup>
      <Input v-model="rn_content" placeholder="请输入头条" style="width: 400px"></Input>
      <Button type="warning" style="width: 140px;" @click="handleSubmit">提交</Button>
    </div>
  </div>
</template>

<script>
import apis from '@/apis';

export default {
  data() {
    return {
      rn_type: this.$route.query.rn_type || 1,
      rn_content: this.$route.query.rn_content || '',
    };
  },
  methods: {
    handleSubmit() {
      if (!this.$route.query.rn_id) {
        this.$http.post(apis.NoticeAdd, {
          rn_type: this.rn_type,
          rn_content: this.rn_content,
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
        this.$http.post(apis.NoticeEdit, {
          rn_id: this.$route.query.rn_id,
          rn_type: this.rn_type,
          rn_content: this.rn_content,
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
  },
};
</script>

<style scoped>
.headline_h1 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 1em;
}
.action_bar {
  display: flex;
  justify-content: flex-end;
  padding: 30px 0;
}
.action_bar .ivu-btn.ivu-btn-icon-only {
  color: var(--grey-lightergrey) !important;
}
.content-wrapper {
  text-align: center;
}
</style>
