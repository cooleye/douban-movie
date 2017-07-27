
var Model = require('../services.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      hotMovies:[],
      isLoading:true,
      page_limit:5,
      page_start:0,
      loadmore:false,
      refresh:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      var that = this;

      Model.fetch(
        'https://movie.douban.com/j/search_subjects', 
        that.data.page_limit, 
        that.data.page_start,
        function(data){
          console.log(data)
            that.setData({
              hotMovies : data
            })
            that.setData({
              isLoading:false
            })
      })

  },
  upper : function(){
      var that = this;
      

      // setTimeout(function(){
      //     that.setData({
      //       isLoading: false
      //     })
      //     that.setData({
      //       refresh: false
      //     })
      // },2000)

      if(this.data.refresh == true){
        Model.fetch(
          'https://movie.douban.com/j/search_subjects',
          that.data.page_limit,
          0,
          function (data) {
            that.setData({
              hotMovies: data
            })
            that.setData({
              isLoading: false
            })
            that.setData({
              refresh: false
            })
          })
      }
      
  },
  lower : function(e){
    
     var that = this;
      this.setData({
        loadmore : true
      })

      this.setData({
        page_start: this.data.page_start + 1
      })
      // var page_start = this.page_start + 1;
      if(this.data.loadmore == true){
        Model.fetch(
          'https://movie.douban.com/j/search_subjects',
          that.data.page_limit,
          that.data.page_start,
          function (data) {
            that.setData({
              hotMovies: that.data.hotMovies.concat(data)
            })
            // console.log(that.data.hotMovies )
            that.setData({
              isLoading: false
            })
            that.setData({
              loadmore: false
            })
          })
      }
  },
  scroll : function(e){

    console.log('scroll...' + e.detail.scrollTop)

      if (e.detail.scrollTop <= 0){
        this.setData({
          refresh: true
        })
      }
  }

  
})