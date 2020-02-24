//app.js
var {config,header}=require("./config.js")
App({
  onLaunch: function () {
   
    // 展示本地存储能力
    wx.setStorageSync("config", config)
    wx.setStorageSync("header", header)
    let nowtime=new Date()
    let token=wx.getStorageSync("token")
    let createtime=wx.getStorageSync("createtime")
    if (token && ((nowtime - createtime) < 14 * 24 * 3600 * 1000)){
      wx.request({
        url: wx.getStorageSync("config").freshen_url,
        header:wx.getStorageSync("header"),
        method:"post",
        data:{
          token: wx.getStorageSync("token").access_token
        },
        success(res){
          if(res.data.code==200){
            wx.setStorageSync("token", res.data.data)
          }else{
            let message=res.data.message
            wx.showToast({
              title: message,
              icon:"success",
              duration:"2000"
            })
          }
        },
        fail(){
          wx.showToast({
            title: "重新刷新！",
            icon: "error",
            duration: "2000"
          })
        }
      })
    }else if(!token){
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId  
          let code=res.code
          wx.request({
            url: wx.getStorageSync("config").openid_url,
            header: wx.getStorageSync('header'),
            data:{
              code:code
            },
            success(res){
              if(res.data.code==200){
                wx.setStorageSync("session", res.data.data)
                let createTime = new Date();
                wx.setStorageSync('createTime', createTime);
                //如果没有token在app中先获取openid,可以在login页面可以是使用
              }else{
                let message=res.data.message
                wx.showToast({
                  title: message,
                  icon: "error",
                  duration: "2000"
                })
              }
            },
            fail(){
              wx.showToast({
                title: "重新进入！",
                icon: "error",
                duration: "2000"
              })
            
            }          
          })
        }
      })     
    }else{
      console.log(wx.getStorageSync("token"))
      console.log("已经有token了，而且没过期！")
    }
    console.log('333')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('222')
        if (!(res.authSetting['scope.userInfo'])) {         
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('111')
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log('21212')
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    shopname:''
  }
})