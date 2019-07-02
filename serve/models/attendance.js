//ehr_attendance 考勤情况

var db = require("./db.js");

function Attendance(attendance) {
  this.id = attendance.id;
  this.clockInTime = attendance.clockInTime;
  this.clockInIocation = attendance.clockInIocation;
  this.tag = attendance.tag;
  this.empId = attendance.empId;
  this.empName = attendance.empName;
  
}

Attendance.addAttendance = function(attendance, callback) {
  var selectSql = "select id from ehr_emp where name = ? ";
  db.query(selectSql, [attendance.empName], function(err, data) {
    if (err) return callback(err);
    if (data.length == 0) return callback(err);
    let empId = data[0].id;
    var selectSql2 =
      "insert into ehr_attendance (id,clockInTime,clockInIocation,tag,emp_id,logicToDelete) values (null,?,?,?,?,1)";
    db.query(
      selectSql2,
      [
        attendance.clockInTime,
        attendance.clockInIocation,
        attendance.tag,
        empId
      ],
      function(err, result) {
        callback(err, result);
      }
    );
  });
};
//更新dept
Attendance.updateAttendance = function(attendance, callback) {
  let selectSql =
    "update ehr_attendance set clockInTime=?,clockInIocation=?,tag=?,emp_id=(select id from ehr_emp where name =?) where id=?";
  db.query(
    selectSql,
    [
      attendance.clockInTime,
      attendance.clockInIocation,
      attendance.tag,
      attendance.empName,
      attendance.id
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Attendance.queryAttendance = function(callback) {
  var selectSql =
    "select r.*,e.name as empName from ehr_attendance r,ehr_emp e where r.logicToDelete = 1 and e.id = r.emp_id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Attendance.deleteAttendance = function(ids, callback) {
  let selectSql = "update ehr_attendance set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Attendance;
