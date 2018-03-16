'use strict';

const express =  require('express');
const app = express();
const chatcat = require('./app');
const passport = require('passport');



app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');

app.use(chatcat.session);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))

app.use(require('morgan')('combined', {
  stream: {
    write: message => {
      chatcat.logger.log('info', message)
    }
  }
}))

app.use('/', chatcat.router);



chatcat.ioServer(app).listen(app.get('port'), ()=> {
  console.log("chatcat running on 3000");
})