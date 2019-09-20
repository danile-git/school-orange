//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
                 // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            lang: "zh_CN",
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
 globalData: {
    userInfo: null,
    baseUrl: "http://orange.natappvip.cc/orange",
    appName: "橘子树英语",
   header: [{ "name": "Starter", "id": "starter", "books": [{ "id": "starter1", "img": "/images/books/starter1.png", "title": "EEC Starter①", "desc": "通过漫画表现不同场景的日常交际，培养儿童早期听说、阅读、想象能力。" }, { "id": "starter2", "img": "/images/books/starter2.png", "title": "EEC Starter②", "desc": "字母认知及课后习题、童话剧，多方面训练学生句型输出及展示能力。" }] }, { "name": "初级", "id": "e1st", "books": [{ "id": "e1st-1", "img": "/images/books/1st-class1.png", "title": "Easy English with Civa①英语轻松学", "desc": "趣味性语音学习，话题轻松实用，多样化挑战任务，贴合学生心理。" }, { "id": "e1st-2", "img": "/images/books/1st-class2.png", "title": "Easy English with Civa②英语轻松学", "desc": "初级综合学习，升级语音训练，语段对话输出，任务式学习提升。" }, { "id": "e1st-3", "img": "/images/books/1st-class3.png", "title": "Easy English with Civa③英语轻松学", "desc": "解决词汇记忆难题，语段呈现所学内容" }] }, { "name": "中级", "id": "e2nd", "books": [{ "id": "e2nd-1", "img": "/images/books/2nd-class1.png", "title": "Easy English with Civa④英语轻松学", "desc": "中级系列首本教材，复习巩固语音知识，话题贴合学生生活。" }, { "id": "e2nd-2", "img": "/images/books/2nd-class2.png", "title": "Easy English with Civa⑤英语轻松学", "desc": "持续巩固词汇记忆，学练结合，听、说、读、写全方位训练学生能力。" }, { "id": "e2nd-3", "img": "/images/books/2nd-class3.png", "title": "Easy English with Civa⑥英语轻松学", "desc": "语篇学习积累词、句。由句到段，整合输出。" }, { "id": "e2nd-4", "img": "/images/books/2nd-class4.png", "title": "Easy English with Civa⑦英语轻松学", "desc": "叠加运用，增强语言运用能力。Civa Guide专项巩固。" }, { "id": "e2nd-5", "img": "/images/books/2nd-class5.png", "title": "Easy English with Civa⑧英语轻松学", "desc": "全面整合中级内容，夯实基础，承上启下。" }] }, { "name": "中考", "id": "e4th", "books": [{ "id": "e4th-1", "img": "/images/books/4th-class1.png", "title": "Ciav中考（预备）", "desc": "语音复习，提升词汇记忆能力。巩固训练，夯实基础。" }, { "id": "e4th-2", "img": "/images/books/4th-class2.png", "title": "Civa中考①", "desc": "专项训练，优能提升。模拟实战，备战冲刺。" }, { "id": "e4th-3", "img": "/images/books/4th-class3.png", "title": "Civa中考②", "desc": "重点突出，把握细节。专项专练，高分必备。" }] }, { "name": "高级", "id": "e3rd", "books": [{ "id": "e3rd-1", "img": "/images/books/3rd-class1.png", "title": "Easy English with Civa⑨英语轻松学", "desc": "听、说、读、写全面训练。时尚话题，流行话题，贴合学生日常。" }, { "id": "e3rd-2", "img": "/images/books/3rd-class2.png", "title": "Easy English with Civa⑩英语轻松学", "desc": "全面提升。Survival English+Project两大板块整合呈现所学。" }, { "id": "e3rd-3", "img": "/images/books/3rd-class3.png", "title": "Easy English with Civa⑪英语轻松学", "desc": "全方位突破，贴合实际。持续训练学生语言运用及实战能力。" }, { "id": "e3rd-4", "img": "/images/books/3rd-class4.png", "title": "Easy English with Civa⑫英语轻松学", "desc": "高级别教材整合巩固，提升语言运用能力。" }] }, { "name": "雅思/托福", "id": "e5th", "books": [{ "id": "e5th-1", "img": "/images/books/5th-class1.png", "title": "Easy English with Civa⑬英语轻松学", "desc": "衔接Easy English with Civa? ，提升综合能力。单元同话题拓展，训练学生能力。" }, { "id": "e5th-2", "img": "/images/books/5th-class2.png", "title": "Easy English with Civa⑭英语轻松学", "desc": "兼顾板块训练、发散思维训练。衔接高中及雅思。" }, { "id": "e5th-3", "img": "/images/books/5th-class3.png", "title": "Easy English with Civa⑮英语轻松学", "desc": "专项听、说。举一反三，轻松搞定雅思听力及口语。" }, { "id": "e5th-4", "img": "/images/books/5th-class4.png", "title": "Easy English with Civa⑯英语轻松学", "desc": "专项读、写。以实战为蓝本，训练实际运用能力。" }] }]
  }, alert: function (e) {
    var toast = {
      title: e.msg,
      image: '/images/error.png',
      duration: 2000,
      mask: true
    };
    switch (e.code) {
      case "1":
        toast.image = '';
        toast.icon = 'success';
        break;
    }
    wx.showToast(toast);
  }
})