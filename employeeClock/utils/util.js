// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

const formatTime = data => {
  var timestamp = Date.parse(data);
  //返回当前时间毫秒数
  timestamp = timestamp / 1000;
  //获取当前时间
  var n = timestamp * 1000;
  var date = new Date(n);

  //年
  var Y = date.getFullYear();

  //月
  var M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  //日
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  //时
  var h = date.getHours();
  //分
  var m = date.getMinutes();
  //秒
  var s = date.getSeconds();
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
};

const GetDistance = function(lat1, lng1, lat2, lng2, lentype = 2, decimal = 2) {
  var radLat1 = (lat1 * Math.PI) / 180.0; //PI()圆周率
  var radLat2 = (lat2 * Math.PI) / 180.0;
  var a = radLat1 - radLat2;
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137;
  s = Math.round(s * 1000);
  if (lentype-- > 1) {
    s /= 1000;
  }
  return Math.round(s, decimal);
};

/**
 * caculate the great circle distance
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
  var EARTH_RADIUS = 6378137.0; //单位M
  var PI = Math.PI;

  function getRad(d) {
    return (d * PI) / 180.0;
  }

  var radLat1 = getRad(lat1);
  var radLat2 = getRad(lat2);

  var a = radLat1 - radLat2;
  var b = getRad(lng1) - getRad(lng2);

  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000.0;

  return s;
}

module.exports = {
  formatTime: formatTime,
  getGreatCircleDistance: getGreatCircleDistance
};
