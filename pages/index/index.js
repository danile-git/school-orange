import WxValidate from '../../utils/WxValidate.js'
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: app.globalData.appName,
    userInfo: {},
    baseUrl: app.globalData.baseUrl,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    headerImg: [app.globalData.baseUrl + "/images/tt1.png", app.globalData.baseUrl+"/images/tt2.png"],
    header: app.globalData.header,
    tabScroll: 0,
    currentTab: 0,
    windowHeight: '',
    windowWidth: '',
    height:1000,
    showModalStatus: false,//是否显示
    currentGoods:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {    
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.setAppData(this.data.userInfo)
     }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
         
        }, fail:res=>{
          console.log(res)
        }
      })
    }
    // this.getUserInfo()
    this.WxValidate = new WxValidate(
      {
        name: {
          required: true,
          minlength: 2
        }, age: {
          required: true,
          max: 99,
          min: 3
        },
        phone: {
          required: true,
          tel: true
        }, code: {
          required: true,
          minlength: 5,
          maxlength:10
        },sex:{
          required: true
        }
      }
      , {
        name: {
          required: '请填正确的姓名',
        },
        phone: {
          required: '请填写您的手机号',
        },age:{
          required: '请填写年龄',
        }, code: {
          required: '请填写验证码',
        }, sex: {
          required: '请选择性别',
        }
      }

    );
    // for (var idx in this.data.headerImg) {
    //   var img = this.data.headerImg[idx];
    //   this.data.headerImg[idx] = this.data.baseUrl + img;
    //   console.log(this.data.headerImg[idx]);
    // }
   
    //console.log(app.globalData.userInfo);

  },setAppData:function(userInfo){
    app.globalData.userInfo =userInfo
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({ //修改标题文字
      title:app.globalData.appName
    })
  },
  clickMenu: function (e) {
    var current = e.currentTarget.dataset.current; //获取当前tab的index
    var tabWidth = this.data.windowWidth;  // 导航tab共5个，获取一个的宽度
    this.setData({
      tabScroll: (current - 2) * tabWidth //使点击的tab始终在居中位置
    })
    if (this.data.currentTab == current) {
      return false
    } else {
      this.setData({ currentTab: current});
    }
  },
  changeContent: function (e) {
    var current = e.detail.current // 获取当前内容所在index,文档有
    var tabWidth = this.data.windowWidth / 6;
    console.log(current);
    this.setData({
      currentTab: current,
      tabScroll: (current - 2) * tabWidth
    })
  },
  appointment:function(e){
      //预约
    //提交错误描述
    var formData = e.detail.value;
    console.log(formData);
    if (!this.WxValidate.checkForm(formData)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showToast({
        title: `${error.msg} `,
        image: '/images/error.png',
        duration: 2000,
        mask:true
      })
      return false;
    }
    //预约信息
    var regInfo = { "name": formData.name, "age": formData.age, "tel": formData.phone, "code": formData.code, "sex": formData.sex};
    var $this=this;
    wx.request({
      url: $this.data.baseUrl+'/test.php', //仅为示例，并非真实的接口地址
      data:regInfo,
      method:"POST",
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      }, complete:function(){

      },
      success: function (res) {
        app.alert({"msg":"succ","code":"1"});
        console.log(res.data)
      }, fail:function(res){
        app.alert({ "msg": "预约失败,请检查网络", "code":"0"});
      }
    })


  },
  //显示对话框
  showModal: function (e) {
  var current=e.currentTarget.dataset.current;
  console.log(current);
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      currentGoods:current
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }, //显示对话框
  showModalDetail: function (e) {
    var current = e.currentTarget.dataset.current;
    var currentTab = e.currentTarget.dataset.index;
   
    wx.navigateTo({
      url: "/pages/detail/detail?tab=" + currentTab+"&index="+current
    })
    
    }
})
