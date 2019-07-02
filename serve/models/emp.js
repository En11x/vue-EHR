//ehr_emp

var db = require("./db.js");

function Emp(emp) {
  this.id = emp.id;
  this.userid = emp.userid;
  this.sign = emp.sign;
  this.avatar = emp.avatar;
  this.name = emp.name;
  this.password = emp.password;
  this.birthday = emp.birthday;
  this.sex = emp.sex;
  this.phone = emp.phone;
  this.QQ = emp.QQ;
  this.email = emp.email;
  this.age = emp.age;
  this.currentAddress = emp.currentAddress;
  this.deptId = emp.deptId;
  this.paygradesId = emp.paygradesId;
  this.positionId = emp.positionId;
  this.positionName = emp.positionName;
  this.deptName = emp.deptName;
}

Emp.addEmp = function(emp, callback) {
  console.log(emp);
  var selectSql =
    "insert into ehr_emp (id,name,password,birthday,sex,phone,QQ,email,age,currentAddress,dept_id,paygrades_id,position_id,logicToDelete) values (null,?,?,?,?,?,?,?,?,?,?,1,?,1)";
  db.query(
    selectSql,
    [
      emp.name,
      emp.password,
      emp.birthday,
      emp.sex,
      emp.phone,
      emp.QQ,
      emp.email,
      emp.age,
      emp.currentAddress,
      emp.deptId,
      emp.positionId
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};
//更新
Emp.updateEmp = function(emp, callback) {
  let selectSql =
    "update ehr_emp set name =?,password=?,birthday = ?,sex = ?,phone = ?,QQ = ?,email = ?,age = ?,currentAddress = ?,dept_id=?,position_id =? where id=?";
  console.log(emp);
  db.query(
    selectSql,
    [
      emp.name,
      emp.password,
      emp.birthday,
      emp.sex,
      emp.phone,
      emp.QQ,
      emp.email,
      emp.age,
      emp.currentAddress,
      emp.deptId,
      emp.positionId,
      emp.id
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Emp.editEmp = function(emp, callback) {
  let selectSql =
    "update ehr_emp set userid=?,sign=?, avatar =?,name =?,password=?,birthday = ?,sex = ?,phone = ?,QQ = ?,email = ?,age = ?,currentAddress = ? where id=?";
  console.log(emp);
  db.query(
    selectSql,
    [
      emp.userid,
      emp.sign,
      emp.avatar,
      emp.name,
      emp.password,
      emp.birthday,
      emp.sex,
      emp.phone,
      emp.QQ,
      emp.email,
      emp.age,
      emp.currentAddress,
      emp.id
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Emp.queryEmpByUserId = function(emp, callback) {
  var selectSql = "select * from ehr_emp where userid = ?";
  db.query(selectSql, [emp.userid], function(err, result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Emp.queryEmpByPhone = function(emp, callback) {
  var selectSql = "select * from ehr_emp where phone = ?";
  db.query(selectSql, [emp.phone], function(err, result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Emp.queryEmp = function(callback) {
  var selectSql =
    " select e.id,e.avatar,e.name,e.password,e.birthday,e.sex,e.phone,e.qq,e.email,e.age,e.currentAddress,d.id as deptId ,d.name as deptName,c.name as companyName,p.id as positionId,p.name as positionName from ehr_emp e,ehr_dept d,ehr_paygrades pg,ehr_position p,ehr_company c where e.logicToDelete = 1 and e.dept_id = d.id and e.paygrades_id = pg.id and e.position_id = p.id and e.dept_id = d.id and d.company_id = c.id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Emp.deleteEmp = function(ids, callback) {
  let selectSql = "update ehr_emp set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Emp;
