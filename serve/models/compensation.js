//ehr_compensation

var db = require("./db.js");

function Compensation(compensation) {
  this.id = compensation.id;
  this.basicSalary = compensation.basicSalary;
  this.subsidies = compensation.subsidies;
  this.socialSecurityId = compensation.socialSecurityId;
  this.socialSecurityRate = compensation.socialSecurityRate;
  this.empId = compensation.empId
}

Compensation.addCompensation = function(compensation, callback) {

  var selectSql =
    "insert into ehr_compensation (id,basicSalary,subsidies,socialSecurity_id,emp_id,logicToDelete) values (null,?,?,(select id from ehr_socialsecurity where purchaseRate =?),?,1)";
  db.query(selectSql, [compensation.basicSalary, compensation.subsidies, compensation.socialSecurityRate,compensation.empId], function(
    err,
    result
  ) {
    if (err) return callback(err);
    callback(err, result);
  });
};
//更新
Compensation.updateCompensation = function(compensation, callback) {
  let selectSql =
    "update ehr_compensation set basicSalary =?,subsidies =?,socialSecurity_id=?,emp_id = ? where id=?";
  db.query(selectSql, [compensation.basicSalary, compensation.subsidies,compensation.socialSecurityId,compensation.empId, compensation.id], function(err,result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Compensation.queryCompensation = function(callback) {
  var selectSql =
    "select c.id,c.basicSalary,c.subsidies,s.id as socialSecurityId ,s.purchaseRate as purchaseRate,e.id as empId,e.name as name from ehr_compensation c,ehr_socialsecurity s,ehr_emp e where c.logicToDelete = 1 and c.socialSecurity_id = s.id and c.emp_id = e.id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Compensation.deleteCompensation = function(ids, callback) {
  let selectSql = "update ehr_compensation set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Compensation;
