<template>
  <div class="finance_count_wrapper">
    <div class="date_wrapper">
      销售时间&nbsp;&nbsp;
      <DatePicker type="date" placeholder="起始时间" style="width: 110px"></DatePicker>&nbsp;&nbsp;&nbsp;
      ~&nbsp;&nbsp;&nbsp;
      <DatePicker type="date" placeholder="截止时间" style="width: 110px"></DatePicker>&nbsp;&nbsp;&nbsp;
      <Button type="warning">查询</Button>
    </div>
    <Table :columns="tHead" :data="data1"></Table>
    <Page :total="100" show-elevator></Page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tHead: [
        {
          title: '分类',
          key: 'type',
          width: 150,
          filters: [
            {
              label: 'Greater than 25',
              value: 1,
            },
            {
              label: 'Less than 25',
              value: 2,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.age > 25;
            } else if (value === 2) {
              return row.age < 25;
            }
            return false;
          },
        },
        {
          title: '菜品名称',
          key: 'name',
        },
        {
          title: '销量',
          key: 'count',
          width: 100,
        },
      ],
      data1: [
        {
          type: 'John Brown',
          name: 18,
          count: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
      ],
    };
  },
};
</script>

<style>
.date_wrapper {
  padding: calc(30 / 16 * 1em) 0;
}
</style>
