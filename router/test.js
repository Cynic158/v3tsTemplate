const express = require("express");
const testhandler = require("../routerhandler/testhandler");
const router = express.Router();

router.post("/uploadimg", testhandler.uploadimg);
router.post("/addfileitem", testhandler.addfileitem);
router.get("/getfilelist", testhandler.getfilelist);
router.post("/deletefileitem", testhandler.deletefileitem);
router.post("/editfileitem", testhandler.editfileitem);

module.exports = router;
