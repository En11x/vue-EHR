var express = require("express");
var router = express.Router();

var scanDirModules = require('../helper')

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });
const scanResult = scanDirModules(__dirname, __filename)

for (const prefix in scanResult) {

  if (scanResult.hasOwnProperty(prefix)) {

    router.use(prefix, scanResult[prefix])

  }

}

module.exports = router;
