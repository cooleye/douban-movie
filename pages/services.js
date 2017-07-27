var store = require('./store.js')
var config = require('./config.js')
module.exports = {
  getLocation: function (cb) {
    var location = store.location
    if (location) {
      cb(location)
      return;
    }
    wx.getLocation({
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1',
          header: {
            "Content-Type": "json",
          },
          success: function (res) {
            var data = res.data
            store.location = data.result
            cb(data.result)
          }
        })
      }
    })
  },
  getCity: function (cb) {
    this.getLocation(function (location) {
      cb(location.addressComponent.city.replace('市', ''))
    })
  },
  fetch: function (url, count,start, cb) {
    var that = this
    wx.request({
      url: url ,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data:{
        type: "movie",
        tag: "热门",
        page_limit: 5,
        page_start: start
      },
      success: function (res) {
        if (res.data.subjects.length != 0) {
          cb(res.data.subjects)
        }
      }
    })
  }
}