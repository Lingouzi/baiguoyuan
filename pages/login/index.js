// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'未填写',
    sex:'女',
    birthday:'未填写',
    card:'普卡会员'

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
  getPhoneNumber: function (e) {
    var that = this
    let tel = wx.getStorageSync('phone')
    if (!tel){
      wx.request({
        url: wx.getStorageSync('config').userinfo_url1,
        data: {
          sessionKey: wx.getStorageSync('session').session_key,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        },
        header: wx.getStorageSync('header'),
        success(res) {
          if(res.data.code==200){
          wx.setStorageSync('phone', res.data.data.phoneNumber);
            wx.request({
              url: wx.getStorageSync('config').login_url,
              data: {
                openid: wx.getStorageSync('session').openid,
                platform: 'mini_program',
                mobile: res.data.data.phoneNumber,
                smsvcode:'2456'
              },
              method: 'post',
              header: wx.getStorageSync('header'),
              success(res) {
                if (res.data.code == 200) {
                  wx.setStorageSync('token', res.data.data);//存储token
                  let createTime = new Date();
                  wx.setStorageSync('createTime', createTime);
                  wx.navigateBack({
                    delta: 2, 
                  })
                } else {
                  let mess = res.data.message
                  wx.showToast({
                    title: mess,
                    icon: 'none',
                    duration: 2000
                  })

                }
              }
            })
          }else{
            let mess = res.data.message
            wx.showToast({
              title: mess,
              icon: 'none',
              duration: 2000
            })

          }
        }
      })
    }else{
      wx.request({
        url: wx.getStorageSync('config').login_url,
        data: {
          openid: wx.getStorageSync('session').openid,
          platform: 'mini_program',
          mobile: tel,
          smsvcode: '2456'
        },
        method: 'post',
        header: wx.getStorageSync('header'),
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            wx.setStorageSync('token', res.data.data.access_token);//存储token
            let createTime = new Date();
            wx.setStorageSync('createTime', createTime);
            wx.navigateBack({
              delta: 2, 
            })
            // wx.redirectTo({
            //   url: '/pages/index/index',
            // })
          } else {
            let mess = res.data.message
            wx.showToast({
              title: mess,
              icon: 'none',
              duration: 2000
            })

          }
        }
      })
    }
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