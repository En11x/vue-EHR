//ehr_departure  离职员工管理

var db = require("./db.js");

function Departure(departure) {
  this.id = departure.id;
  this.instructions = departure.instructions;
  this.departureTime = departure.departureTime;
  this.empId = departure.empId;
  this.empName = departure.empName;
}

Departure.addDeparture = function(departure, callback) {
    var selectSql = "select id from ehr_emp where name = ? ";
    db.query(selectSql, [departure.empName], function(err, data) {
      if (err) return callback(err);
      if (data.length == 0) return callback(err);
      let empId = data[0].id;
      var selectSql2 =
        "insert into ehr_departure (id,instructions,departureTime,emp_id,logicToDelete) values (null,?,?,?,1)";
      db.query(
        selectSql2,
        [
          departure.instructions,
          departure.departureTime,
          empId,
        ],
        function(err, result) {
            if (err) return callback(err)
            var selectSql3 = 'update ehr_emp set logicToDelete = 0 where id = ?';
            db.query(selectSql3,[empId],function(err,result1){
                if (err) return callback(err)
                callback(err,result1)
            })
        }
      );
    });
  };


//更新departure
Departure.updateDeparture = function(departure, callback) {
  let selectSql =
    "update ehr_departure set instructions =?,departureTime =?,emp_id =(select id from ehr_emp where name =?) where id=? ";
  db.query(
    selectSql,
    [
      departure.instructions,
      departure.departureTime,
      departure.empName,
      departure.id,
      
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Departure.queryDeparture = function(callback) {
  var selectSql =
    "select d.id,d.instructions,d.departureTime,e.name as empName from ehr_departure d,ehr_emp e where d.logicToDelete = 1 and d.emp_id = e.id";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};



//逻辑删除departure信息
Departure.deleteDeparture = function(ids, callback) {
  let selectSql = "update ehr_departure set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Departure;
