const express = require('express');
const routes = require('./routes');
const middleware = require('./middlewares')
const PORT = process.env.PORT || 3000;
const db = require('./models')
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

middleware(app)
routes(app);

//connect to sql
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is lisening on port ${PORT}`);
  })
})
