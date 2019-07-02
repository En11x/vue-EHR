//ehr_rewardpunish
//奖惩管理


var db = require("./db.js");

function Reward(reward) {
  this.id = reward.id;
  this.situation = reward.situation;
  this.money = reward.money;
  this.judge = reward.judge;
  this.time = reward.time;
  this.empId = reward.empId;
  this.empName = reward.empName;
}

Reward.addReward = function(reward, callback) {
  var selectSql =
    "insert into ehr_rewardpunish (id,situation,money,judge,time,emp_id,logicToDelete) values (null,?,?,?,?,(select id from ehr_emp where name = ?),1)";
  db.query(selectSql, [reward.situation, reward.money, reward.judge,reward.time,reward.empName], function(
    err,
    result
  ) {
    if (err) return callback(err);
    callback(err, result);
  });
};
//更新dept
Reward.updateReward = function(reward, callback) {
  let selectSql =
    "update ehr_rewardpunish set situation =?,money =?,judge = ?,time=?,emp_id=? where id=?";
  db.query(selectSql, [reward.situation, reward.money, reward.judge,reward.time,reward.empId, reward.id], function(err,result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Reward.queryReward = function(callback) {
  var selectSql =
    "select r.*,d.name from ehr_rewardpunish r,ehr_emp d where r.logicToDelete = 1 and r.emp_id = d.id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Reward.deleteReward = function(ids, callback) {
  let selectSql = "update ehr_rewardpunish set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Reward;
