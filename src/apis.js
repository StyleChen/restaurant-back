const apis = {
  uploadImage: 'http://upload.dreamhiway.com/uploadimg',
  Login: '/Restaurant/Login', // 登录
  SignOut: '/Restaurant/Login/SignOut', // 退出登录
  TableAdd: '/Restaurant/Admin/TableAdd', // 桌号添加
  TableList: '/Restaurant/Admin/TableList', // 桌号列表
  TableDel: '/Restaurant/Admin/TableDel', // 桌号删除
  TableEdit: '/Restaurant/Admin/TableEdit', // 桌号修改
  TableQr: '/Restaurant/Qr', // 桌号二维码
  TableQrDownload: '/Restaurant/Qr/download', // 桌号二维码下载
  FoodTypeList: '/Restaurant/Admin/FoodTypeList', // 分类列表
  FoodTypeAdd: '/Restaurant/Admin/FoodTypeAdd', // 分类列表添加
  FoodTypeEdit: '/Restaurant/Admin/FoodTypeEdit', // 分类列表修改
  FoodTypeDel: '/Restaurant/Admin/FoodTypeDel', // 分类列表删除
  FoodAdd: '/Restaurant/Admin/FoodAdd', // 菜品发布
  FoodList: '/Restaurant/Admin/FoodList', // 菜品列表
  FoodEdit: '/Restaurant/Admin/FoodEdit', // 菜品修改
  FoodDetail: '/Restaurant/Admin/FoodDetail', // 菜品列表
  UserAdd: '/Restaurant/Admin/UserAdd', // 新增账号
  UserList: '/Restaurant/Admin/UserList', // 账号列表
  UserEdit: '/Restaurant/Admin/UserEdit', // 账号修改
  OrderList: '/Restaurant/Admin/OrderList', // 订单列表
  FinanceCountList: '/Restaurant/Admin/FinanceCountList', // 账单统计
  FinanceCountDetailList: '/Restaurant/Admin/FinanceCountDetailList', // 账单统计详情
  FinanceCountDetail: '/Restaurant/Admin/FinanceCountDetail', // 账单统计详情总金额
  NoticeAdd: '/Restaurant/Admin/NoticeAdd', // 吉米呷呷餐厅公告新增
  NoticeList: '/Restaurant/admin/NoticeList', // 吉米呷呷餐厅前端公告管理
  NoticeEdit: '/Restaurant/Admin/NoticeEdit',
  NoticeDelete: '/Restaurant/Admin/NoticeDelete',
  ActivityList: '/Restaurant/admin/ActivityList', // 吉米呷呷餐厅前端活动管理
  ActivityAdd: '/Restaurant/Admin/ActivityAdd', // 吉米呷呷餐厅后台活动新增
  ActivityEdit: '/Restaurant/Admin/ActivityEdit',
  ActivityDelete: '/Restaurant/Admin/ActivityDelete',
  PrintSet: '/Restaurant/Admin/PrintSet', // 打印时间间隔设置
  PrintSetDetail: '/Restaurant/Admin/PrintSetDetail', // 默认打印时间间隔
};

if (process.env.NODE_ENV === 'development') {
  Object.keys(apis).forEach((key) => {
    if (key.includes('upload')) {
      apis[key] = apis[key].replace(/.*\//, 'http://192.168.2.199:8102/');
    } else {
      apis[key] = `/api${apis[key]}`;
    }
  });
}

export default apis;
