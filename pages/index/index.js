// pages/index/index.js
import QQMapWX from '../../libs/qqmap-wx-jssdk.js';
var qqmap = new QQMapWX({
//在腾讯地图开放平台申请密钥 http://lbs.qq.com/mykey.html
 key: 'HWPBZ-SWT6S-S3XO5-62HMP-P2BDF-AEFDV'
});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myLatitude: "",
    myLongitude: "",
    myAddress: "",
    items: [
      {value: 'USA', name: '是'},
      {value: 'CHN', name: '否', checked: 'true'},
    ]
  },
  radioChange(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //用微信提供的api获取经纬度
    wx.getLocation({
     type: 'wgs84',
     success: function(res){
     that.setData({myLatitude: res.latitude, myLongitude: res.longitude})
     //用腾讯地图的api，根据经纬度获取城市
     qqmap.reverseGeocoder({
      location: {
      latitude: that.data.myLatitude,
      longitude: that.data.myLongitude
      },
      success: function (res) {
      // console.log(res)
      var a = res.result
      //获取市和区（区可能为空）
      // that.setData({myAddress: a.city + a.district+a.street})
      that.setData({myAddress:a.address})
      //控制台输出结果
      // console.log(that.data.myAddress)
      }
     })
     }
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