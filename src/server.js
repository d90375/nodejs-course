const { PORT } = require('./common/config');
const app = require('./app');
const { fillGreen } = require('./common/chalk');
const generateDB = require('./mock/readerDB');

generateDB();

app.listen(PORT, () =>
  console.log(fillGreen(`App is running on http://localhost:${PORT}`))
);
