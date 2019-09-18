import WxValidate from '../../utils/WxValidate.js'
//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"设置",
    baseUrl: app.globalData.baseUrl,
    userInfo:{},
    gender:[],
    userImg:"",
    headerImg:app.globalData.baseUrl + "/images/tt1.png",
    order: [{ "img": "/images/books/starter1.png", "title": "EEC Starter①", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。", "time": "2019年5月4日" }, { "img": "/images/books/starter1.png", "title": "EEC Starter①", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。", "time": "2019年5月4日" }],
    actionSheetHidden: true, // 是否显示底部可选菜单
    actionSheetItems: [
      { bindtap: 'changeImage', txt: '修改头像' },
      { bindtap: 'viewImage', txt: '查看头像' }
    ]
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      userInfo: app.globalData.userInfo
    })
    var flg=this.data.userInfo.gender==1?true:false;
    var _gender = [{ 'name': '男', 'value': '1', 'checked': flg }, { 'name': '女', 'value': '0', 'checked': !flg },];
    this.setData({
      gender: _gender,
      userImg: this.data.userInfo.avatarUrl
    });


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
        }, sex: {
          required: true
        }
      }
      , {
        name: {
          required: '请填正确的姓名',
        },
        phone: {
          required: '请填写您的手机号',
        }, age: {
          required: '请填写年龄',
        }, sex: {
          required: '请选择性别',
        }
      }

    );
  }, // 点击头像 显示底部菜单
  clickImage: function () {
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
  },

  // 上传头像
  changeImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片，只有一张图片获取下标为0
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          userImg: tempFilePaths,
          actionSheetHidden: !that.data.actionSheetHidden
        })
        that.uploadFile(' https://orange.natappvip.cc/uploadImage', tempFilePaths, 'imgFile', {}, function (res) {
          console.log(res);
          if (null != res) {
            that.setData({
              userImg: res
            })
          } else {
            // 显示消息提示框
            wx.showToast({
              title: '上传失败',
              icon: 'error',
              duration: 2000
            })
          }
        });
      }
    })
  },
  // 查看原图
  viewImage: function () {
    var that = this;
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [that.data.userImg] // 需要预览的图片http链接列表
    })
  },
  //上传文件
  uploadFile:function(url, filePath, name, formData, cb) {
    console.log('a=' + filePath)
    //var $this=this;
  wx.uploadFile({
      url: url,
      filePath: filePath,
      name: name,
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      formData: formData, // HTTP 请求中其他额外的 form data
      success: function (res) {
        if (res.statusCode == 200 && !res.data.result_code) {
          return typeof cb == "function" && cb(res.data)
        } else {
          return typeof cb == "function" && cb(false)
        }
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      }
    })
  },
  settingUpdate:function(e){
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
        mask: true
      })
      return false;
    }
    //预约信息
    var regInfo = { "name": formData.name, "age": formData.age, "tel": formData.phone, "code": formData.code, "sex": formData.sex };
    var $this = this;
    wx.request({
      url: $this.data.baseUrl + '/test.php', //仅为示例，并非真实的接口地址
      data: regInfo,
      method: "POST",
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