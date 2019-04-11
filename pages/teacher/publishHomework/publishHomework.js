Page({
  data: {
    cId:'',
    cName:'',
    date: '2019-1-1',
    name:[],
    //value:[],
    objects:{},
    items:[],
    hId:'',
    hTitle:'',
    selected:''
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    this.cId = options.cId;
    this.setData({
      cId:options.cId
    });
    this.cName = options.cName;

    this.setData({
      hId: Math.random().toString(36).substr(2, 15)
    })

    //var address = 'http://120.55.54.247:8080';
    var address = 'http://localhost:8080/TeachingAssistantSystem'
    //var address = 'https://www.ufeng.top/TeachingAssistantSystem'

    wx.request({
      url: address + '/getAllCourseQuestions',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        c_id: this.cId
      },
      success: function (res) {
        console.log(res.data);
        var list = res.data;

        for (let i = 0; i < list.length; i++) {
          that.setData({
            objects: {
              name: list[i].id, value: list[i].cqContent, cqId:list[i].cqId
            }
          })
          that.data.items.push(that.data.objects);
        }
        var vvv = that.data.items;
        console.log(that.data.items);
        that.setData({
          items: vvv
        })
      }
    },
    )
  },

  bindDateChange(e) {
    console.log('截止时间改变为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  checkboxChange:function(e) {
    var arr = [];
    var arr2 = [];
    e.detail.value.forEach(current => {
      for (var value of this.data.items) {
        if (current == value.name) {
          arr.push(value.name);
          arr2.push(value.cqId);
          break;
        }
      }
    });

    //console.log(arr.join(""));
    this.setData({ checkArr: arr });
    this.setData({ selected: arr2.join("/")})
    //console.log(this.data.selected);

  },

  toPublish:function(e) {
    //var address = 'http://120.55.54.247:8080';
    var address = 'http://localhost:8080/TeachingAssistantSystem'
    //var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    if(this.data.hTitle.length == 0){
      wx.showToast({
        title: '请输入作业描述',
        content: ''
      })
    }else if(this.data.selected.length == 0){
      wx.showToast({
        title: '请至少选择一题',
        content: ''
      })
    }else{
      wx.request({
        url: address + '/publishHomework',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          c_id: this.data.cId,
          h_id: this.data.hId,
          h_title: this.data.hTitle,
          release_time: this.data.date,
          selected:this.data.selected
        },

        success: function (res) {
          var resData_success = res.data.success;
          var resData_message = res.data.message;
          console.log(resData_message);
          if (resData_success == true) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '发生未知错误',
              content: ''
            })
          }

        }

      })
    }
  },

  descriptionInput: function (e) {
    this.setData({
      hTitle: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})