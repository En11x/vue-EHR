var db = require("./db.js");
//ehr_dept
function Dept(dept) {
  this.id = dept.id;
  this.name = dept.name;
  this.mark = dept.mark;
  this.company_id = dept.company_id;
  this.companyId = dept.companyId;
  this.companyName = dept.companyName
  this.logicToDelete = dept.logicToDelete;
}

Dept.addDept = function(dept, callback) {
  var selectSql =
    "insert into ehr_dept (id,name,mark,company_id,logicToDelete) values (null,?,?,?,1)";
  db.query(
    selectSql,
    [dept.name, dept.mark, dept.companyId],
    function(err, result) {
      if (err)return callback(err);
      callback(err, result);
    }
  );
};
//更新dept
Dept.updateDept = function(dept, callback) {
  let selectSql =
    "update ehr_dept set name =?,mark =?,company_id = ? where id=? ";
  db.query(
    selectSql,
    [
      dept.name,
      dept.mark,
      dept.companyId,
      dept.id,
      
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Dept.queryDept = function(callback) {
  var selectSql =
    "select d.id,d.name,d.mark,c.name as companyName,c.id as companyId from ehr_dept d,ehr_company c where d.logicToDelete = 1 and d.company_id = c.id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//查询dept数据的总数量
// Dept.countDept = function(callback) {
//   let selectSql =
//     "select count(id) as count from ehr_dept where logicToDelete = 1";
//   db.query(selectSql, function(err, result) {
//     if (err) return callback(err);
//     callback(err, result[0]);
//   });
// };

//逻辑删除dept信息
Dept.deleteDept = function(ids, callback) {
  let selectSql = "update ehr_dept set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Dept;
