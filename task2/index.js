const express = require('express');
const app = express();
const router = express.Router();

app.listen(4000, () => console.log('listen port 4000'));

app.get('/', (req, res) => {
  res.json({ name: 'Jhon' });
});

// router.get('/employees/:id', function(req, res) {
//   res.json({ id: req.params.id });
// });

app.use('/', router);
