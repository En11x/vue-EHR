//ehr_paygrades
//奖惩管理


var db = require("./db.js");

function Grade(grade) {
  this.id = grade.id;
  this.name = grade.name;
  this.salary = grade.salary;
  this.mark = grade.mark;
}

Grade.addGrade = function(grade, callback) {
  var selectSql =
    "insert into ehr_paygrades (id,name,salary,mark,logicToDelete) values (null,?,?,?,1)";
  db.query(selectSql, [grade.name, grade.salary, grade.mark], function(
    err,
    result
  ) {
    if (err) return callback(err);
    callback(err, result);
  });
};
//更新dept
Grade.updateGrade = function(grade, callback) {
  let selectSql =
    "update ehr_paygrades set name =?,salary =?,mark = ? where id=?";
  db.query(selectSql, [grade.name, grade.salary, grade.mark,grade.id], function(err,result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Grade.queryGrade = function(callback) {
  var selectSql =
    "select *from ehr_paygrades where logicToDelete = 1";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Grade.deleteGrade = function(ids, callback) {
  let selectSql = "update ehr_paygrades set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Grade;
