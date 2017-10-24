'use strict';

const express =  require('express');
const app = express();
const chatcat = require('./app');
const passport = require('passport');



app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(chatcat.session);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))

app.use('/', chatcat.router);
// app.use('/', require('./routes/index'));
// app.use('/', require('./routes/index'));



chatcat.ioServer(app).listen(app.get('port'), ()=> {
  console.log("chatcat running on 3000");
})