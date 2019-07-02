//ehr_holiday节假日

var db = require("./db.js");

function Holiday(holiday) {
  this.id = holiday.id;
  this.name = holiday.name;
  this.time = holiday.time;
  this.content = holiday.content;
}

Holiday.addHoliday = function(holiday, callback) {
  var selectSql =
    "insert into ehr_holiday (id,name,time,logicToDelete,content) values (null,?,?,1,?)";
  db.query(selectSql, [holiday.name, holiday.time, holiday.content], function(
    err,
    result
  ) {
    if (err) return callback(err);
    callback(err, result);
  });
};
//更新dept
Holiday.updateHoliday = function(holiday, callback) {
  let selectSql =
    "update ehr_holiday set name =?,time =?,content = ? where id=?";
  db.query(selectSql, [holiday.name, holiday.time, holiday.content,holiday.id], function(err,result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Holiday.queryHoliday = function(callback) {
  var selectSql =
    "select * from ehr_holiday where logicToDelete = 1";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Holiday.deleteHoliday = function(ids, callback) {
  let selectSql = "update ehr_holiday set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Holiday;
