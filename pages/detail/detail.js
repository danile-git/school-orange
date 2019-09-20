//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    title:"课程详细信息",
    baseUrl: "http://orange.natappvip.cc/orange",
    header: app.globalData.header,
    book:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.tab, options.index);
  },
  getDetail:function(tab,index){
    var tab=parseInt(tab);
    var index=parseInt(index);
    var json = this.data.header[tab].books[index];
    this.setData({
      book:json
    });
  }
})