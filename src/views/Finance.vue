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
            name: '财务管理',
            routerList: [
              {
                name: '账单对账',
                url: '/Finance/FinanceList',
              },
              // {
              //   name: '财务统计',
              //   url: '/Finance/FinanceCount',
              // },
            ],
          },
        ],
      };
    },
  };

</script>
