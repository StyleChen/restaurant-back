<template>
  <aside-main :titleData="titleData"></aside-main>
</template>

<script>
  import AsideMain from '@/components/AsideMain';
//  import apis from '@/apis';

  export default {
    components: { AsideMain },
    data() {
      return {
        titleData: [
          {
            name: '订单管理',
            routerList: [
              {
                name: '订单列表',
                url: '/Order/OrderList',
              },
            ],
          },
        ],
      };
    },
  };

</script>
