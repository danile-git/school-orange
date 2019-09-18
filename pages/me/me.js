//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [{ "text": "已预约", "img": "/images/pview.png", "url": "/pages/prview/prview" }, { "text": "朋友圈", "img": "/images/circle.png", "url": "/pages/circle/circle" }, { "text": "新闻", "img": "/images/news.png", "url": "/pages/news/news" }, { "text": "设置", "img": "/images/set.png", "url": "/pages/setting/setting" }],
    userInfo: {},
    baseUrl: app.globalData.baseUrl,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
  this.login();
  },
  getUserInfo: function (e) {
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    this.login();
  },
  login:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
      
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang:"zh_CN",
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
  ,
  mitemClick:function(e){
    if(this.data.hasUserInfo){
      var user = this.data.userInfo;
    wx.navigateTo({
      url: e.currentTarget.dataset.url +"?uid=osnCH5P9GZ0S3wXDC_h0lFksEy6c"
    })
    }
  else{
    app.alert({"msg":"未登录，请登录后重试","code":"0"});
  } 
  }
})