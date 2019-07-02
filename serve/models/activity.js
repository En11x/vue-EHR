//ehr_Activity 团建活动
var db = require("./db.js");

function Activity(activity) {
  this.id = activity.id;
  this.theme = activity.theme
  this.activityAddress = activity.activityAddress;
  this.introduce = activity.introduce;
  this.activityTheDetail = activity.activityTheDetail;
  this.initateTime = activity.initateTime;
  this.spending = activity.spending;
  this.state = activity.state;
  this.empId = activity.empId;
  this.empName = activity.empName;
}

Activity.addActivity = function(activity, callback) {
//     console.log(activity)
//   var selectSql =
//     "insert into ehr_activity (id,theme,activityAddress,introduce,activityTheDetail,initateTime,spending,state,emp_id,logicToDelete) values (null,?,?,?,?,?,?,?,(select id from ehr_emp where name = ?),1)";
//   db.query(selectSql, [activity.theme,activity.activityAddress,activity.introduce,activity.activityTheDetail,activity.initateTime,activity.spending,activity.state,activity.name], function(
//     err,
//     result
//   ) {
//     if (err) return callback(err);
//     callback(err, result);
//   });
console.log(activity)
var selectSql = "select id from ehr_emp where name = ?";
  db.query(selectSql, [activity.empName], function(err, data) {
    if (err) return callback(err);
    if (data.length == 0) return callback(err);
    let empId = data[0].id;
    var selectSql2 =
      "insert into ehr_activity (id,theme,activityAddress,introduce,activityTheDetail,initateTime,spending,state,emp_id,logicToDelete) values (null,?,?,?,?,?,?,?,?,1)";
    db.query(
      selectSql2,
      [
        activity.theme,
        activity.activityAddress,
        activity.introduce,
        activity.activityTheDetail,
        activity.initateTime,
        activity.spending,
        activity.state,
        empId
      ],
      function(err, result) {
        callback(err, result);
      }
    );
  });
};
//更新dept
Activity.updateActivity = function(activity, callback) {
    console.log(activity)
  let selectSql =
    "update ehr_activity set theme =?,activityAddress=?,introduce=?,activityTheDetail=?,initateTime=?,spending=?,state=?,emp_id=(select id from ehr_emp where name = ?) where id=?";
  db.query(selectSql, [activity.theme,activity.activityAddress,activity.introduce,activity.activityTheDetail,activity.initateTime,activity.spending,activity.state,activity.empName,activity.id], function(err,result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Activity.queryActivity = function(callback) {
  var selectSql =
    "select a.*,e.name as empName from ehr_activity a,ehr_emp e where a.logicToDelete = 1 and a.emp_id = e.id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Activity.deleteActivity = function(ids, callback) {
  let selectSql = "update ehr_activity set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Activity;
