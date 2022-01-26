const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

//css stylesheet stuff
// const path = require('path');

//handlebars stuff
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
//

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//css stylesheet path
// app.use(express.static(path.join(__dirname, 'public')));
//

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening!'));
});

