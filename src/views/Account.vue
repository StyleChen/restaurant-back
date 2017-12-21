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
            name: '账号管理',
            routerList: [
              {
                name: '账号列表',
                url: '/Account/AccountList',
              },
            ],
          },
        ],
      };
    },
  };

</script>
