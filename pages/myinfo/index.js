// pages/myinfo/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    sexindex:0,
    birthday:'',
    user:'',
    sexarray:['男','女']
  },
  changesex(e){
    this.setData({
      sexindex: e.detail.value
    })
  },
  changedate(e){
    this.setData({
      birthday:e.detail.value
    })
  },
  putmyinfo(){
    const that=this
    wx.request({
      url: wx.getStorageSync('config').changeinfo_url,
      header: that.data.header,
      method:'post',
      data:{
        token:"that.data.token",
        // token: that.data.token,
        sex: that.data.sexarray[that.data.sexindex],
        birthday: that.data.birthday,
        user: that.data.user,
        name: that.data.name
      },
      success(res){
        
        if (res.data.code == 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'loading',
            duration: 2500
          })
          wx.switchTab({
            url: '/pages/member/index'
          })
        } else if (res.data.code == 202) {
          wx.showToast({
            title: '错误202',
            icon: 'error',
            duration: 2000
          })
        } else {
          let message = res.data.data.message
          wx.showToast({
            title: message,
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail(){
        wx.showToast({
          title: '重新提交！',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this
    wx.request({
      url: wx.getStorageSync('config').userinfo_url,
      header: that.data.header,
      data: {
        token:that.data.token
      },
      success(res){
        if(res.data.code==200){
          that.setData({
            name:res.data.data.name,
            sex: res.data.data.sex,
            birthday: res.data.data.birthday,
            user: res.data.data.user
          })
        } else if (res.data.code == 202){
          wx.showToast({
            title: '错误202',
            icon: 'error',
            duration: 2000
          })
        }else{
          let message=res.data.data.message
          wx.showToast({
            title: message,
            icon: 'error',
            duration: 2000
          })  
        }
      },
      fail(res){
        wx.showToast({
          title: '重新进入页面',
          icon:'error',
          duration:2000
        })

      }
    })

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