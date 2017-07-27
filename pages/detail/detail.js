// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{},
    filmname:'',
    filmcover:'',
    rate:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log('id:' + options.id)
      var id = options.id;
      this.setData({
        filmname: options.filmname
      })
      this.setData({
        filmcover : options.cover
      })
      this.setData({
        rate : options.rate
      })
      var that = this;
      wx.request({
        url: 'https://m.douban.com/rexxar/api/v2/movie/'+id+'/credits',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function(res){
            console.log(res)
            that.setData({
              details : res.data
            })
        }
      })
  }
 
})