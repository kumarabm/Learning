const express = require('express');
const app = express();
const router = express.Router();

require("dotenv").config();

const controller = require('../controller/common')

router.post('/adduser', controller.user);
router.delete('/deleteuser/:id', controller.remove_user);
router.put('/updateuser', controller.modify);
router.get('/getusers/:id?', controller.getuser);


module.exports = router;