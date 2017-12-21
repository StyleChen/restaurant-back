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
            name: '菜品管理',
            routerList: [
              {
                name: '菜品列表',
                url: '/admin/FoodList',
              },
              {
                name: '发布菜品',
                url: '/admin/ReleaseList',
              },
              {
                name: '分类列表',
                url: '/admin/classList',
              },
              {
                name: '套餐设置',
                url: '/admin/Package',
              },
            ],
          },
        ],
      };
    },
  };

</script>
