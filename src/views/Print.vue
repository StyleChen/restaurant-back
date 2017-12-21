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
            name: '打印设置',
            routerList: [
              {
                name: '打印间隔',
                url: '/Print/PrintSet',
              },
            ],
          },
        ],
      };
    },
  };

</script>
