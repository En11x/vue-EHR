//ehr_articlewages  工资条管理
var db = require("./db.js");

function Wage(wage) {
  this.id = wage.id;
  this.empId = wage.empId
  this.empName = wage.empName;
  this.shouldSend = wage.shouldSend;
  this.bonus = wage.bonus;
  this.fine = wage.fine;
  this.insured = wage.insured;
  this.time = wage.time;
  this.realHair = wage.realHair;
}

Wage.addWage = function(wage, callback) {
  var selectSql =
    "insert into ehr_articlewages (id,emp_id,empName,shouldSend,bonus,fine,insured,time,realHair,logicToDelete) values (null,?,?,?,?,?,?,?,?,1)";
  db.query(selectSql, [wage.empId,wage.empName,wage.shouldSend,wage.bonus,wage.fine,wage.fine,wage.insured,wage.time,wage.realHair], function(
    err,
    result
  ) {
    if (err) return callback(err);
    callback(err, result);
  });
};
//更新dept
Wage.updateWage = function(wage, callback) {
  let selectSql =
    "update ehr_articlewages set emp_id =?,empName=?,shouldSend=?,bonus=?,fine=?,insured=?,time=?,realHair=? where id=?";
  db.query(selectSql, [wage.empId,wage.empName,wage.shouldSend,wage.bonus,wage.fine,wage.fine,wage.insured,wage.time,wage.realHair], function(err,result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Wage.queryWage = function(callback) {
  var selectSql =
    "select * from ehr_articlewages where logicToDelete = 1";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Wage.deleteWage = function(ids, callback) {
  let selectSql = "update ehr_articlewages set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Wage;
