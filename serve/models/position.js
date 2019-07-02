//ehr_position

var db = require("./db.js");

function Position(position) {
  this.id = position.id;
  this.name = position.name;
  this.mark = position.mark;
  this.deptId = position.deptId;
}

Position.addPosition = function(position, callback) {
  var selectSql =
    "insert into ehr_position (id,name,mark,dept_id,logicToDelete) values (null,?,?,?,1)";
  db.query(selectSql, [position.name, position.mark, position.deptId], function(
    err,
    result
  ) {
    if (err) return callback(err);
    callback(err, result);
  });
};
//更新dept
Position.updatePosition = function(position, callback) {
  let selectSql =
    "update ehr_position set name =?,mark =?,dept_id = ? where id=?";
  db.query(selectSql, [position.name, position.mark, position.deptId, position.id], function(err,result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Position.queryPosition = function(callback) {
  var selectSql =
    "select p.id,p.name,p.mark,d.name as deptName,d.id as deptId from ehr_position p,ehr_dept d where p.logicToDelete = 1 and p.dept_id = d.id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Position.deletePosition = function(ids, callback) {
  let selectSql = "update ehr_position set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Position;
