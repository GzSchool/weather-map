// pages/weather/weather.js
const app = getApp();
const amap = app.data.amap;
const key = app.data.key;
Page({
  data: {
    address: '',
    weather: '',
    temperature: '',
    humidity: '',
    windpower: '',
    winddirection: ''
  },
  onLoad() {
    var _this = this;
    var myAmap = new amap.AMapWX({ key: key });
    myAmap.getWeather({
      type: 'live',
      success(data) {
        if (data.city) {
          _this.setData({
            address: data.liveData.city,
            humidity: data.liveData.humidity,
            temperature: data.liveData.temperature,
            weather: data.liveData.weather,
            winddirection: data.liveData.winddirection,
            windpower: data.liveData.windpower
          })
        }
      },
      fail() {
        wx.showToast({ title: '失败！' })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: "地图搜索",
      desc: "本地天气",
      path: "../pages/weather/weather"
    }
  }
})