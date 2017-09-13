import express from 'express';
import path from 'path';
let router = express.Router();

router.get('/', function(req, res){
  // res.sendFile(path.join(__dirname,'../src/index.html'));
  res.render('index');
});

router.get('/users', function (req, res) {
  res.json([
    {"id": 1, "firstName":"Bob", "lastName": "Smith", "email": "bobsmit@gmail.com"},
    {"id": 2, "firstName":"Tammy", "lastName": "Norrton", "email": "tnorton@yahoo.com"},
    {"id": 3, "firstName":"Tina", "lastName": "Lee", "email": "lee.tina@hotmail.com"}
  ]);
});

export default router;
