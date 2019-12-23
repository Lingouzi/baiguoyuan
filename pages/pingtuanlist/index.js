// pages/pingtuanlist/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopname:'',
    page:1,
    limit:20,
    total:'',
    num:'',
    ptlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getptlist(){
    const that=this
    wx.request({
      url: wx.getStorageSync('config').pingtuan_url,
      header: wx.getStorageSync('header'),
      data:{
        shopname:that.data.shopname
      },
      success(res){
        if(res.data.code=200){
          if (that.data.ptlist.length!=0){
            that.setData({
              ptlist: res.data.data
              })
          }else{
            that.setData({
              ptlist: res.data.data,
              total: res.data.total,
              num: res.data.data.length
            })
          }
        }else{
          let mess = res.data.message
          wx.showToast({
            title: mess,
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail(){}
    })

  },

  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      shopname: app.globalData.shopname
    })
    this.getptlist()


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
    if (this.data.num<this.data.total){
      this.setData({
        page:this.data.page + 1
      })
        this.getptlist()
    }else{
      wx.showToast({
        title: '没有更多',
        icon: 'success',
        duration: 2000
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})