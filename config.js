var host = "http://yapi.demo.qunar.com/mock/42018"
var config = {
  host,
  inteshop_url: host + '/integralshop', //积分商城
  checkca_url: host + '/checkcart',//确定订单
  surplus_url: host + '/surplus',//余额明细
  prosh_url: host + '/productshop',//类目
  ptproinfos_url: host + '/ptproductinfos',//拼团产品详细
  qu_login_url: host + '/quick_login',//绑定后快捷登录
  coupon_url: host + '/coupon',//优惠券
  ctpro_url: host + '/ctproduct',//成团信息
  shopinfo_url: host + '/shopinfo',//门店详情
  nearshop_url: host + '/nearshop',//附近门店
  city_url: host + '/city',//选择城市
  proinf_url: host + '/productinfos',//产品详细
  // login_url: host + '/login',//登录
  shoplist_url: host + '/shoplist',//提货门店
  set_url: host + '/set',//设置
  remind_url: host + '/remindreg',//签到提醒
  addresslist_url: host + '/addresslist',//地址列表
  address_url: host + '/address',//地址
  deleaddress_url: host + '/deleaddress',//删除地址
  getcurrentshop_url: host + '/getcurrentshop',//获取当前店铺
  senduser_url: host + '/senduser',//用户绑定
  question_url: host + '/question',//反馈问题
  questionlist_url: host + '/questionlist',//反馈问题列表
  member_url: host + '/member',//会员码
  members_url: host + '/members',//个人中心
  help_url: host + '/help',//客服帮助
  ask_url: host + '/ask',//在线提问
  password_url: host + '/password',//修改密码
  pingtuan_url: host + '/pingtuan',//拼团列表
  register_url: host + '/register',//签到
  checkregister_url: host + '/checkregister',//确定签到
  tjproduct_url: host + '/tjproduct',//推荐列表
  shopcartlist_url: host + '/shopcartlist',//购物车列表
  yxproductlist_url: host + '/yxproductlist',//为你优选
  search_url: host + '/search',//搜索
  hotsearch_url: host + '/hotsearch' ,//热门搜索
  userinfo_url: host + '/userinfo',//个人信息
  changeinfo_url: host + '/changeuserinfo',//修改信息
  freshen_url: "http://api.bzffs.cc/api/auth/refresh",//刷新token
  login_url:"http://api.bzffs.cc/api/auth/login",//登录，返回token
  openid_url:"http://api.bzffs.cc/api/wechat/mini_program/openid"//获取openid

}
var header = { 'x-service-id': '1' }
module.exports = {config, header }
