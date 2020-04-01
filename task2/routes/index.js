const express = require('express');

const controllers = require('../controllers/data');

const router = express.Router();

router.get('/', (req, res) => {
  controllers
    .getData()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end('something went wrong');
    });
});

router.get('/:id', (req, res) => {
  controllers
    .getName(+req.params.id)
    .then(name => res.json(name))
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end('something went wrong');
    });
});

module.exports = router;
