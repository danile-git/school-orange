//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"新闻中心",
    baseUrl: "http://orange.nat100.top",
    headerImg:app.globalData.baseUrl + "/images/tt1.png",
    news: [],
    index:0,
    count:1,
    total:1
  },
// { "img": "/orage/images/h3.jpg", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。", "time": "2019年5月4日", "url": "http://www.baidu.com" }, { "img": "/images/h1.png", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。", "time": "2019年5月4日", "url": "https://weibo.com/?c=spr_qdhz_bd_360jsllqcj_weibo_001" }
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews(this.data.index,this.data.count);
  },
  getNews:function(index,count){
  var  $this=this;
    wx.request({
      url: this.data.baseUrl + '/news',
      data: { "i":index, "c": count },
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      }, complete: function () {

      },
      success: function (res) {
        console.log(res)  
        if (res.data.statusCode==200){
       
        $this.setData({

          news: $this.data.news.concat(res.data.news)
        })
        console.log(res.data)
        }
      }, fail: function (res) {
        app.alert({ "msg": "刷新失败,请检查网络", "code": "0" });
      }
    })
  },
  getNewData:function(){
    if(this.data.total<=this.data.index*this.data.count){
      app.alert({ "msg": "已经到底了", "code": "1"});
    }else{
     var next= this.data.index+1;
     this.setData({
       index:next
     })
    this.getNews(next,this.data.count);
    }
  }
  ,
  navurl:function(e){
    wx.navigateTo({
      url:"/pages/nav/nav?url="+e.currentTarget.dataset.url,
    })
  }
})