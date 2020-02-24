// pages/member/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    level:'',
    integral:'***',
    code:'***',
    money:'***',
    statue:false,
    inf2:'立即开启水果之旅',
    inf1:'登录/注册',
    customer_logo:'../images/logo.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  gomyinfo(){
    wx.navigateTo({
      url: '/pages/myinfo/index',
    })
  },
  gologin(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  golevel(){
    wx.navigateTo({
      url: '/pages/level/index',
    })
  },
  goqian(){
    wx.navigateTo({
      url: '/pages/qiandao/index',
    })
  },
  gomembercode(){
    wx.navigateTo({
      url: '/pages/membercode/index',
    })
  },
  goshop2(){
    wx.navigateTo({
      url: '/pages/shop2/index',
    })
  },
  goaddress(){
    wx.navigateTo({
      url: '/pages/addresslist/index',
    })
  },
  gohelp(){
    wx.navigateTo({
      url: '/pages/customer/index',
    })
  },
  gocoupon(){
    wx.navigateTo({
      url: '/pages/coupon/index',
    })
  },
  goopinion(){
    wx.navigateTo({
      url: '/pages/puterror/index',
    })
  },
  goset(){
    wx.navigateTo({
      url: '/pages/set/index',
    })
  },
  goApp(){
    wx.navigateTo({
      url: '/pages/App/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that=this
    if(!(wx.getStorageSync('token')=='')){
      this.setData({
        statue:true,
        name:wx.getStorageSync('phone')
      })
      wx.request({
        url: wx.getStorageSync('config').members_url,
        data:{
          token:wx.getStorageSync('token')
        },
        method:'GET',
        success(res){
          console.log(res)
          that.setData({
            coupon: res.data.coupon,
            level: res.data.grade,
            id: res.data.id,
            code: res.data.idcode,
            integral: res.data.integral,
            money: res.data.money
          })
        }


      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})