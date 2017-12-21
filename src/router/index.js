import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main';
import admin from '@/views/admin';
import Order from '@/views/Order';
import Print from '@/views/Print';
import PrintSet from '@/components/PrintSet';
import Finance from '@/views/Finance';
import Activity from '@/views/Activity';
import FinanceList from '@/components/FinanceList';
import FinanceCount from '@/components/FinanceCount';
import FinancelDetail from '@/components/FinancelDetail';
import Table from '@/views/Table';
import Account from '@/views/Account';
import Error from '@/components/error';
import Login from '@/components/Login';
import TableList from '@/components/TableList';
import classList from '@/components/classList';
import ReleaseList from '@/components/ReleaseList';
import FoodList from '@/components/FoodList';
import Package from '@/components/Package';
import AccountList from '@/components/AccountList';
import OrderList from '@/components/OrderList';
import aPublish from '@/components/Actions-publish';
import ActionsList from '@/components/ActionsList';
import Headline from '@/components/Headline';
import HeadlinePublish from '@/components/Headline-publish';


Vue.use(Router);


export default new Router({
  base: 'admin/restaurant-back',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      redirect: '/admin/FoodList',
      children: [
        {
          path: 'admin',
          name: 'admin',
          component: admin,
          redirect: '/admin/FoodList',
          children: [
            {
              path: 'FoodList',
              name: 'FoodList',
              component: FoodList,
            },
            {
              path: 'ReleaseList',
              name: 'ReleaseList',
              component: ReleaseList,
            },
            {
              path: 'classList',
              name: 'classList',
              component: classList,
            },
            {
              path: 'Package',
              name: 'Package',
              component: Package,
            },
          ],
        },
        {
          path: '/Order',
          name: 'Order',
          component: Order,
          redirect: '/Order/OrderList',
          children: [
            {
              path: 'OrderList',
              name: 'OrderList',
              component: OrderList,
            },
          ],
        },
        {
          path: '/Print',
          name: 'Print',
          component: Print,
          redirect: '/Print/PrintSet',
          children: [
            {
              path: 'PrintSet',
              name: 'PrintSet',
              component: PrintSet,
            },
          ],
        },
        {
          path: '/Finance',
          name: 'Finance',
          component: Finance,
          redirect: '/Finance/FinanceList',
          children: [
            {
              path: 'FinanceList',
              name: 'FinanceList',
              component: FinanceList,
            },
            {
              path: 'FinanceCount',
              name: 'FinanceCount',
              component: FinanceCount,
            },
            {
              path: 'FinanceList/FinancelDetail',
              name: 'FinancelDetail',
              component: FinancelDetail,
            },
          ],
        },
        {
          path: '/Table',
          name: 'Table',
          component: Table,
          redirect: '/Table/TableList',
          children: [
            {
              path: 'TableList',
              name: 'OrderList',
              component: TableList,
            },
          ],
        },
        {
          path: '/Account',
          name: 'Account',
          component: Account,
          redirect: '/Account/AccountList',
          children: [
            {
              path: 'AccountList',
              name: 'AccountList',
              component: AccountList,
            },
          ],
        },
        {
          path: 'activity',
          name: 'activity',
          redirect: '/activity/actionslist',
          component: Activity,
          children: [
            {
              path: 'actionslist',
              component: ActionsList,
            },
            {
              path: 'actions-publish',
              component: aPublish,
            },
            {
              path: 'headline',
              component: Headline,
            },
            {
              path: 'headline-publish',
              component: HeadlinePublish,
            },
          ],
        },
      ],
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
  ],
});
