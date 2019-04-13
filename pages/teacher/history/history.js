Page({
  data: {
    cId: '',
    cName: '',
    items:[],
    objects:{},
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    this.cId = options.cId;
    this.setData({
      cId: options.cId
    });
    this.cName = options.cName;
    this.setData({
      cName:options.cName
    });

    //var address = 'http://120.55.54.247:8080';
    var address = 'http://localhost:8080/TeachingAssistantSystem'
    //var address = 'https://www.ufeng.top/TeachingAssistantSystem'

    wx.request({
      url: address + '/getHomeworkHistory',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        c_id: this.cId
      },
      success: function (res) {
        var list = res.data;
        for (let i = 0; i < list.length; i++) {
          that.setData({
            objects: {
              title: list[i].hTitle
            }
          })
          that.data.items.push(that.data.objects);
        }
        var vvv = that.data.items;
        //console.log(that.data.items);
        that.setData({
          items: vvv
        })
      }
    },
    )
  },

  toDetail:function(e) {
    console.log(e.currentTarget.dataset.title)
    var h_title = e.currentTarget.dataset.title;
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