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
            name: '桌号管理',
            routerList: [
              {
                name: '桌号列表',
                url: '/Table/TableList',
              },
            ],
          },
        ],
      };
    },
  };

</script>
