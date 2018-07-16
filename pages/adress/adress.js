const app = getApp();
const amap = app.data.amap;
const key = app.data.key;
Page({
  data: {
    isShow: true,
    longitude: null,
    latitude: null,
    markers: [],
    points: [],
    name: '',
    address: '',
    location: ''
  },
  onLoad() {
    var _this = this;
    var myAmap = new amap.AMapWX({ key: key });
    // 获取定位地址的描述数据
    _this.getRegeo(myAmap);

    // 获取输入地址的location
    // 假如输入的是：成都 欧尚庭院
    myAmap.getInputtips({
      keywords: '清华软件园',
      city: '北京',
      success(res) {
        _this.setData({
          location: res.tips[0].location
        })
        /************************************************/
        // 获取输入地址描述数据
        // _this.getRegeo(myAmap);
        /************************************************/
      }
    })

  },
  getRegeo(myAmap) {
    var _this = this;
    myAmap.getRegeo({
      iconPath: '../../src/images/ding.png',
      width: 32,
      height: 32,
      location: _this.data.location,
      success(res) {
        var obj = res[0];
        if (obj) {
          _this.setData({
            longitude: obj.longitude,
            latitude: obj.latitude,
            name: obj.name,
            address: obj.desc,
            points: [{
              longitude: obj.longitude,
              latitude: obj.latitude
            }],
            markers: [{
              id: obj.id,
              latitude: obj.latitude,
              longitude: obj.longitude,
              iconPath: obj.iconPath
            }]
          })
        }
      },
      fail(res) {
        wx.showToast({ title: '失败！' })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: "地图搜索",
      desc: "地址信息",
      path: "../pages/adress/adresss"
    }
  }
})