var express = require('express'),
router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Validator Example', errors: req.session.errors });
  req.session.errors = null;
});

/* Validate errors. */
router.post('/', function(req, res, next) {

  if(req.check('validateMe', 'Please select at least one option').notEmpty()){
    if (req.body.validateMe==='email'){
      if(req.check('email','Is not a valid email').isEmail().value){
        req.check('email', 'Email not from domain divorce.me').customEmail(req);
      }
    };
    if (req.body.validateMe==='date') {
      req.check('day', 'Invalid day').isInt({min:1, max:31});
      req.check('month', 'Invalid month').isInt({min:1, max:12});
      req.check('year', 'Invalid year').isInt({min:1900, max:2016});



    }
  }

  var errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  }

  res.redirect('/');
});

module.exports = router;
