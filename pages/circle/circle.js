//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"我的朋友圈",
    focus:true,
    baseUrl: "http://localhost:8080/orange",
    headerImg:app.globalData.baseUrl + "/images/tt1.png",
    talkList: [{ "img": "/images/h3.jpg", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。", "time": "2019年5月4日", "goods": "Danile，Danile，Danile，Danile，Danile，Danile，Danile，Danile，Danile", "comm": [{ "name": "Daniel", "talk": "真的可以不错，不错" }] }, { "img": "/images/h1.png", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。", "time": "2019年5月4日", "goods": "Danile，Danile，Danile，Danile，Danile，Danile，Danile，Danile，Danile", "comm": [{ "name": "Daniel", "talk": "真的可以不错，不错" }] }]
    , isShow: true, //判断是否显示弹出框
    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    animation:null,
    currentTalkIdx:null//当前点击的对话索引
    , inputHeight:0,
    inputShow:false,
    userInfo:{},
    actionSheetHidden: true, // 是否显示底部可选菜单
    actionSheetItems: [
      { bindtap: 'cmmCircle', txt: '发表朋友圈' },
      { bindtap: 'circleHis', txt: '我的历史' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
    this.setData({
      openid: options.uid,
      userInfo: app.globalData.userInfo
    });
    console.log(this.data.userInfo)
  },
  cmmCircle:function(){
    //朋友圈
    wx.navigateTo({
      url: "/pages/cmmCircle/cmmCircle"
    })
  }
  ,
  // 点击了点赞评论
  TouchDiscuss: function (e) {
    // this.data.isShow = !this.data.isShow
    console.log(e.currentTarget.dataset.idx);
    var idx = e.currentTarget.dataset.idx;

    // 动画
    var $this=this;
    var animation= wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
    });
    // var tkList=this.data.talkList;
    // var currTalk=tkList[idx];
    // currTalk.comm.push({ "name": "Daniel", "talk": "真的可以不错，不错" });
    this.setData({
      animation: animation,
      currentTalkIdx:idx
    })
    var y=e.detail.y-15;
    if (this.data.isShow == false) {
      this.setData({
        popTop:y,
        popWidth: 0,
        isShow: true
      })
      // 0.3秒后滑动
      setTimeout(function () {
        animation.width(0).opacity(1).step()
        $this.setData({
          animation: animation.export(),
        })
      }, 100)
    } else {
      // 0.3秒后滑动
      setTimeout(function () {
        animation.width(120).opacity(1).step()
        $this.setData({
          animation: animation.export(),
        })
      }, 100)

      this.setData({
        popTop:y,
        popWidth: 0,
        isShow: false
      })
    }
  }, close_tg:function(){
    var $this=this;
    if ($this.data.isShow == false) {
      var animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'linear',
        delay: 0,
      });
      //var animation = this.data.animation;
      console.log(animation)

      animation.width(0).opacity(1).step()
      $this.setData({
        animation: animation.export(),
      })
      $this.setData({
        popWidth: 0,
        isShow: true
      });
  }
  },
   goodsOrtalk:function(e){
    var type=e.currentTarget.dataset.type;
    //1点赞 ，2 评论

    var tkList=this.data.talkList;
    var currTalk=tkList[this.data.currentTalkIdx];
    switch(type){
      case "1":
        currTalk.goods+="，"+this.data.userInfo.nickName;
        this.setData({
          talkList: tkList
        });
      break;
      case "2":
        this.setData({
          inputShow: true
        });
      break;
    }

    this.close_tg();
  
  },
  //监听input获得焦点

  bindfocus: function (e) {

    let that = this;
    let height = 0;
    let height_02 = 0;
    wx.getSystemInfo({
      success: function (res) {
        height_02 = res.windowHeight;
      }
    })
    height = e.detail.height - (app.globalData.height_01 - height_02);
    console.log('app is', app.globalData.height_01);
    that.setData({
      height: height,
    })
    console.log('获得焦点的 e is', e);
  },

  //监听input失去焦点

  bindblur: function (e) {
    this.setData({
      height: 0,
      inputShow: false,
    });
    console.log('失去焦点的 e is', e);
  }, bindconfirm:function(e){
    var value = e.detail.value;
    if(value==""){
      app.alert({ "msg": "评论内容不能为空", "code": "0" });   
    }else{
      var tkList = this.data.talkList;
      var currTalk = tkList[this.data.currentTalkIdx];
      currTalk.comm.push({ "name": this.data.userInfo.nickName, "talk": value });
      this.setData({
        talkList: tkList
      });
    app.alert({ "msg": "评论成功", "code": "1" });
    }
  }, // 点击头像 显示底部菜单
  clickImage: function () {
    console.log(4544)
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },
  // 点击其他区域 隐藏底部菜单
  actionSheetbindchange: function () {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  }
})