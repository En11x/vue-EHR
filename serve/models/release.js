//ehr_releases 信息发布



var db = require("./db.js");

function Release(release) {
  this.id = release.id;
  this.skillsRequired = release.skillsRequired;
  this.hiring = release.hiring;
  this.wageBudget = release.wageBudget;
  this.initiateTime = release.initiateTime;
  this.state = release.state;
  this.mark = release.mark;
  this.empId = release.empId;
  this.empName = release.empName;
  this.channelId = release.channelId;
  this.channelName = release.channelName;
  this.logicToDelete = release.logicToDelete;
}

Release.addRelease = function(release, callback) {
  var selectSql = "select id from ehr_emp where name = ? ";
  db.query(selectSql, [release.empName], function(err, data) {
    if (err) return callback(err);
    if (data.length == 0) return callback(err);
    let empId = data[0].id;
    var selectSql2 =
      "insert into ehr_releases (id,skillsRequired,hiring,wageBudget,initiateTime,state,mark,emp_id,channel_id,logicToDelete) values (null,?,?,?,?,?,?,?,?,1)";
    db.query(
      selectSql2,
      [
        release.skillsRequired,
        release.hiring,
        release.wageBudget,
        release.initiateTime,
        release.state,
        release.mark,
        empId,
        release.channelId,
      ],
      function(err, result) {
        callback(err, result);
      }
    );
  });
};
//更新dept
Release.updateRelease = function(release, callback) {
  let selectSql =
    "update ehr_releases set skillsRequired=?,hiring=?,wageBudget=?,initiateTime=?,state=?,mark=?,emp_id=(select id from ehr_emp where name =?),channel_id=?,logicToDelete=? where id=?";
  db.query(
    selectSql,
    [
      release.skillsRequired,
      release.hiring,
      release.wageBudget,
      release.initiateTime,
      release.state,
      release.mark,
      release.empName,
      release.channelId,
      release.logicToDelete,
      release.id,
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Release.queryRelease = function(callback) {
  var selectSql =
    "select r.*,e.name as empName,c.name as channelName from ehr_releases r,ehr_emp e,ehr_channel c where r.logicToDelete = 1 and e.id = r.emp_id and r.channel_id = c.id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Release.deleteRelease = function(ids, callback) {
  let selectSql = "update ehr_releases set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Release;
