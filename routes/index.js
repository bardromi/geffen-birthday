const router = require('express').Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.use('/list', require('./list.js'));

module.exports = router;
