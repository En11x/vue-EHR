//index.js
//获取应用实例
const app = getApp();

//引入utils
const util = require("../../utils/util.js");

Page({
  data: {
    latitude: 30.61996,
    longitude: 114.13702,
    markers: [
      {
        id: 1,
        latitude: 30.61996,
        longitude: 114.137,
        iconPath: "/image/location.png",
        title: "武汉轻工大学"
      }
    ],
    circles: [
      {
        latitude: 30.61996,
        longitude: 114.137,
        color: "#07C160",
        fillColor: "#7cb5ec88",
        radius: 200
      }
    ],
    empId: "", //员工id
    time: "",
    times: 0 //打卡次数
  },

  onLoad: function() {
    //获取用户地理位置
    var that = this;
    wx.showLoading({
      title: "定位中",
      mask: true
    });

    //获取时间
    var newTime = util.formatTime(new Date());

    wx.getLocation({
      type: "gcj02",
      altitude: true, //高精度定位
      //定位成功，更新定位结果
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;

        that.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy,
          time: newTime
        });
      },
      //定位失败回调
      fail: function() {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        });
      },

      complete: function() {
        //隐藏定位中信息进度
        wx.hideLoading();
      }
    });
  },

  //点击打卡按钮
  click() {
    if (this.data.empId == "") {
      wx.showToast({
        title: "请输入员工Id",
        icon: "none",
        duration: 2000
      });
    } else {
      wx.getLocation({
        type: "gcj02",
        altitude: true, //高精度定位
        success: res => {
          let latitude = res.latitude,
            longitude = res.longitude;
          var distance = util.getGreatCircleDistance(
            latitude,
            longitude,
            this.data.markers[0].latitude,
            this.data.markers[0].longitude
          );
          if (distance > this.data.circles[0].radius) {
            wx.showToast({
              title: "不在打卡范围内",
              icon: "none",
              duration: 2000
            });
          } else {
            app.qqmapsdk.reverseGeocoder({
              location: {
                latitude: latitude,
                longitude: longitude
              },
              success: res => {
                if (res.message == "query ok") {
                  //获取到地址
                  var address = res.result.address;

                  wx.request({
                    url: "http://pjx.com:3000/emp/queryEmp", //仅为示例，并非真实的接口地址
                    data: {
                      empId: this.data.empId,
                      time: this.data.time,
                      times: this.data.times,
                      address: address
                    },
                    success(res) {
                      console.log(res.data);
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  },

  //输入员工ID
  bindKeyInput: function(e) {
    this.setData({
      empId: e.detail.value
    });
  }
});
