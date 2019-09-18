//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgAnim:{},
    baseUrl: app.globalData.baseUrl,
    photos: [{
      "subtitle": "School Environment",
      "title": "Latest News",
      "img": "/images/env/env2.jpg",
      "user": "Admin",
      "time": " March 7,2016"
    }, {
      "subtitle": "School Environment",
      "title": "Latest News",
      "img": "/images/env/env5.jpg",
      "user": "Admin",
      "time": " March 7,2016"
    }, {
      "subtitle": "School Environment",
      "title": "Latest News",
      "img": "/images/env/env6.jpg",
      "user": "Admin",
      "time": " March 7,2016"
    }, {
      "subtitle": "School Environment",
      "title": "Latest News",
      "img": "/images/env/env7.jpg",
      "user": "Admin",
      "time": " March 7,2016"
    }, {
      "subtitle": "School Environment",
      "title": "Latest News",
      "img": "/images/env/env8.jpg",
      "user": "Admin",
      "time": " March 7,2016"
    }, {
      "subtitle": "School Environment",
      "title": "Latest News",
      "img": "/images/env/env9.jpg",
      "user": "Admin",
      "time": " March 7,2016"
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var animation=wx.createAnimation({
      duration:3000,
      timingFunction:"ease-in",
      delay:0
    });
    animation.opacity(1).translateY(-20).step();
    this.setData({imgAnim:animation})
  }
})