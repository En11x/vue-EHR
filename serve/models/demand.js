//ehr_recruitmentdemand 招聘需求



var db = require("./db.js");

function Demand(demand) {
  this.id = demand.id;
  this.skillsRequired = demand.skillsRequired;
  this.hiring = demand.hiring;
  this.wageBudget = demand.wageBudget;
  this.initiateTime = demand.initiateTime;
  this.state = demand.state;
  this.mark = demand.mark;
  this.empId = demand.empId;
  this.empName = demand.empName;
}

Demand.addDemand = function(demand, callback) {
  var selectSql = "select id from ehr_emp where name = ? ";
  db.query(selectSql, [demand.empName], function(err, data) {
    if (err) return callback(err);
    if (data.length == 0) return callback(err);
    let empId = data[0].id;
    var selectSql2 =
      "insert into ehr_recruitmentdemand (id,skillsRequired,hiring,wageBudget,initiateTime,state,mark,emp_id,logicToDelete) values (null,?,?,?,?,?,?,?,1)";
    db.query(
      selectSql2,
      [
        demand.skillsRequired,
        demand.hiring,
        demand.wageBudget,
        demand.initiateTime,
        demand.state,
        demand.mark,
        empId
      ],
      function(err, result) {
        callback(err, result);
      }
    );
  });
};
//更新dept
Demand.updateDemand = function(demand, callback) {
  let selectSql =
    "update ehr_recruitmentdemand set skillsRequired=?,hiring=?,wageBudget=?,initiateTime=?,state=?,mark=?,emp_id=(select id from ehr_emp where name =?) where id=?";
  db.query(
    selectSql,
    [
      demand.skillsRequired,
      demand.hiring,
      demand.wageBudget,
      demand.initiateTime,
      demand.state,
      demand.mark,
      demand.empName,
      demand.id
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Demand.queryDemand = function(callback) {
  var selectSql =
    "select r.*,e.name as empName from ehr_recruitmentdemand r,ehr_emp e where r.logicToDelete = 1 and e.id = r.emp_id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Demand.deleteDemand = function(ids, callback) {
  let selectSql = "update ehr_recruitmentdemand set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Demand;
