//ehr_rule 考勤规则

var db = require("./db.js");

function Rule(rule) {
  this.id = rule.id;
  this.rulesName = rule.rulesName;
  this.clockInNum = rule.clockInNum;
  this.amStartTime = rule.amStartTime;
  this.amEndTime = rule.amEndTime;
  this.pmStartTime = rule.pmStartTime;
  this.pmEndTime = rule.pmEndTime;
  this.clockInIocation = rule.clockInIocation;
  this.instructions = rule.instructions;
  this.empId = rule.empId;
  this.empName = rule.empName;
}

Rule.addRule = function(rule, callback) {
  var selectSql = "select id from ehr_emp where name = ? ";
  db.query(selectSql, [rule.empName], function(err, data) {
    if (err) return callback(err);
    if (data.length == 0) return callback(err);
    let empId = data[0].id;
    var selectSql2 =
      "insert into ehr_rule (id,rulesName,clockInNum,amStartTime,amEndTime,pmStartTime,pmEndTime,clockInIocation,instructions,emp_id,logicToDelete) values (null,?,?,?,?,?,?,?,?,?,1)";
    db.query(
      selectSql2,
      [
        rule.rulesName,
        rule.clockInNum,
        rule.amStartTime,
        rule.amEndTime,
        rule.pmStartTime,
        rule.pmEndTime,
        rule.clockInIocation,
        rule.instructions,
        empId
      ],
      function(err, result) {
        callback(err, result);
      }
    );
  });
};
//更新dept
Rule.updateRule = function(rule, callback) {
  let selectSql =
    "update ehr_rule set rulesName=?,clockInNum=?,amStartTime=?,amEndTime=?,pmStartTime=?,pmEndTime=?,clockInIocation=?,instructions=?,emp_id=(select id from ehr_emp where name =?) where id=?";
  db.query(
    selectSql,
    [
      rule.rulesName,
      rule.clockInNum,
      rule.amStartTime,
      rule.amEndTime,
      rule.pmStartTime,
      rule.pmEndTime,
      rule.clockInIocation,
      rule.instructions,
      rule.empName,
      rule.id
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Rule.queryRule = function(callback) {
  var selectSql =
    "select r.*,e.name as empName from ehr_rule r,ehr_emp e where r.logicToDelete = 1 and e.id = r.emp_id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Rule.deleteRule = function(ids, callback) {
  let selectSql = "update ehr_rule set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Rule;
