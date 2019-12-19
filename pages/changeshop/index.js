
// pages/changeshop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  changshop(e) {
    let name = e.currentTarget.dataset.name
    let num = e.currentTarget.dataset.id
    console.log(num)
    this.setData({
      num: num
    })
    setTimeout(function () {
      console.log(name)
      wx.switchTab({
        url: '/pages/index/index?shopname=' + name
      })
    }, 1500)
  },
  compare(item1,item2){
    return item1.distance - item2.distance
  },
  onLoad: function (options) {
    let name = options.shopname
    const that = this
    that.setData({
      myLatitude: options.myLatitude,
      myLongitude: options.myLongitude
    })
    wx.request({
      url: wx.getStorageSync('config').nearshop_url,
      header: wx.getStorageSync('header'),
      success(res) {
         wx.hideToast()
        if (res.data.code == 200) {
          let shop = res.data.data.shoplist
          let nearshop = [],shoplist=[]
          shop.forEach(item => {
            let s = that.distance(that.data.myLatitude, that.data.myLongitude, item.latitude, item.longitude)
            if (s < 10) {
              item.distance = s
              shoplist.push(item)
            }
          })
          nearshop = shoplist.sort(that.compare)
          that.setData({
            nearshop: nearshop
          })
          nearshop.forEach((item, index) => {
            if (item.shopname == name) {
              that.setData({
                num: index
              })
            }
          })
    
        } else {
          let mess = res.data.message
          wx.showToast({
            title: mess,
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail() {
        wx.showToast({
          title: '返回上级，重新进入！',
          icon: 'success',
          duration: 2000
        })
      }
    })

  },
  distance(la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
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
    wx.showToast({
      title: '加载中',
      icon: 'loadding',
      duration: 3000
    })

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