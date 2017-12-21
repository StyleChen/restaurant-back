<template>
  <Release :release="release"></Release>
</template>
<script>
  import Release from '@/components/Release';
  import apis from '@/apis';

  export default {
    components: { Release },
    data() {
      return {
        release: {
          rf_name: '',
          rt_stock: '',
          rf_imgae: '',
          rf_price: '',
          rf_type: '',
          rf_state: '',
          rf_body: '',
        },
      };
    },
    mounted() {
      if (this.$route.query.id) {
        try {
          this.$http.post(apis.FoodDetail, { rf_id: this.$route.query.id })
          .then(res => res.json()).then((ress) => {
            this.release = ress.result[0];
            this.release.rf_state = this.release.rf_state.toString();
          });
        } catch (e) {
          this.$Message.error(e);
        }
      }
    },
  };
</script>
