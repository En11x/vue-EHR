//ehr_channel 招聘需求



var db = require("./db.js");

function Channel(channel) {
  this.id = channel.id;
  this.name = channel.name;
  this.mark = channel.mark;
  this.addTime = channel.addTime;
}

Channel.addChannel = function(channel, callback) {
  var selectSql = "insert into ehr_channel (id,name,mark,addTime,logicToDelete) values (null,?,?,?,1)";
  db.query(selectSql, [channel.name,channel.mark,channel.addTime], function(err, result) {
    if (err) return callback(err);
    callback(err, result);
  });
};
//更新dept
Channel.updateChannel = function(channel, callback) {
  let selectSql =
    "update ehr_channel set name=?,mark=?,addTime=? where id=?";
  db.query(
    selectSql,
    [
      channel.name,
      channel.mark,
      channel.addTime,
      channel.id
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Channel.queryChannel = function(callback) {
  var selectSql =
    "select * from ehr_channel where logicToDelete = 1";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Channel.deleteChannel = function(ids, callback) {
  let selectSql = "update ehr_channel set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Channel;
