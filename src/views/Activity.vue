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
            name: '活动管理',
            routerList: [
              {
                name: '活动发布',
                url: '/activity/actionslist',
              },
              {
                name: '头条快报',
                url: '/activity/headline',
              },
            ],
          },
        ],
      };
    },
  };

</script>
