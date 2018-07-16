const app = getApp();
const amap = app.data.amap;
const key = app.data.key;

Page({
  data: {
    isShow: false,
    tips: {},
    longitude: '',
    latitude: '',
    markers: []
  },
  onLoad() {
    var _this = this;
    wx.getLocation({
      success: function (res) {
        if (res && res.longitude) {
          _this.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            markers: [{
              id: 0,
              longitude: res.longitude,
              latitude: res.latitude,
              iconPath: '../../src/images/ding.png',
              width: 32,
              height: 32
            }]
          })
        }
      }
    })
  },
  bindInput: function (e) {
    var _this = this;
    var keywords = e.detail.value;
    var myAmap = new amap.AMapWX({key:key});
    myAmap.getInputtips({
      keywords: keywords,
      location: '',
      success: function (res) {
        if (res && res.tips) {
          _this.setData({
            isShow: true,
            tips: res.tips
          });
        }
      },
      fail(info){
        console.log(info);
      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var location = e.target.dataset.location.split(',');

    this.setData({
      isShow: false,
      longitude: location[0],
      latitude: location[1],
      markers: [{
        id: 0,
        longitude: location[0],
        latitude: location[1],
        iconPath: '../../src/images/ding.png',
        width: 32,
        height: 32,
        anchor: { x: .5, y: 1 },
        label: {
          content: keywords,
          color: 'blue',
          fontSize: 12,
          borderRadius: 5,
          bgColor: '#fff',
          padding: 3,
          x: 0,
          y: -50,
          textAlign: 'center'
        }
      }]
    })
  },
  onShareAppMessage: function () {
    return {
      title: "地图搜索",
      desc: "地址分享",
      path: "../pages/inputSearch/inputSearch"
    }
  }
})