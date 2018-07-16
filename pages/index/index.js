Page({
  data: {
    menu: [
      {
        title:'检索周边',
        url: '../around/around'
      },
      {
        title: '检索地址信息',
        url: '../adress/adress'
      },
      {
        title: '检索天气',
        url: '../weather/weather'
      },
      {
        title: '检索地址',
        url: '../inputSearch/inputSearch'
      },
      {
        title: '检索路线',
        url: '../toRoad/toRoad'
      }
      
    ]
  },
  getType(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.type
    })
  },
  onShareAppMessage:function(){
    return{
      title:"地图搜索",
      desc:"这个小程序太好用了",
      path:"../pages/index/index" 
    }
  }
})