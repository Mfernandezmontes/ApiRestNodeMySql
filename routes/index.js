var express = require('express');
var router = express.Router();

var bookController = require('../controllers/book_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('/ GET');
});

/*GET /book*/
router.get('/book',bookController.all)

router.get('/book/:id',bookController.id)

router.post('/book', bookController.insert)

router.delete('/book/:id',bookController.delete)

router.put('/book', bookController.update)

module.exports = router;
