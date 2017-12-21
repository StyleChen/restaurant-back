<template>
  <div class="container">
    <Form :model="formTop" label-position="top">
      <FormItem label="设置厨房打印时间间隔 : ">
        <InputNumber :min="0"  v-model="formTop.input1"></InputNumber >
        <span class="secondTime">分钟</span>
        <Button type="warning" @click.prevent="config">确定</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import apis from '@/apis';

  export default {
    data() {
      return {
        formTop: {
          input1: '',
        },
      };
    },
    methods: {
      config() {
        this.$http.post(apis.PrintSet, { rps_time: this.formTop.input1 })
          .then(res => res.json()).then((res) => {
            if (res.success) {
              this.$Message.success('请刷新收银端页面后生效');
            }
          });
      },
    },
    mounted() {
      this.$http.post(apis.PrintSetDetail)
        .then(res => res.json()).then((res) => {
          console.log(res);
          if (res.success && res.result.rps_time) {
            this.formTop.input1 = res.result.rps_time;
          }
        });
    },
  };
</script>

<style scoped>
.container {
  padding-top: 20px;
}
  .secondTime {
    margin-right: 20px;
  }
</style>
