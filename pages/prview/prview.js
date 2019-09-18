//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    title:"我的预约",
    baseUrl: "http://orange.nat100.top",
    headerImg:app.globalData.baseUrl + "/images/tt1.png",
    order: [{ "img": "http://localhost:8080/orange/images/books/starter1.png", "title": "EEC Starter①", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。", "time": "2019年5月4日" }, { "img": "http://localhost:8080/orange/images/books/starter1.png", "title": "EEC Starter①", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。", "time": "2019年5月4日" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({ 
      openid:options.uid
      });
      var openid=options.uid;
    console.log("000" + openid)
    wx.request({
      url: this.data.baseUrl + '/order', //仅为示例，并非真实的接口地址
      data: { "wxcode": openid},
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      }, complete: function () {

      },
      success: function (res) {
        app.alert({ "msg": "succ", "code": "1" });
        console.log(res.data)
      }, fail: function (res) {
        app.alert({ "msg": "预约失败,请检查网络", "code": "0" });
      }
    })
  }
})