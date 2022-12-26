var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var produitrouter = require('./routes/produit');


const mongoose = require('mongoose');
const db = require('./database.json');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produits', produitrouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
io.on('connection', (client) => {
  console.log('socket IO connected');
  client.on('notification', (notification) => {
    io.emit('notification', notification);
    console.log(notification)
  });
  client.on('delete', (notification) => {
    console.log(notification)
    io.emit('delete', notification);
  });
});
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to database succefuly")
})
server.listen(3000, function () {
  console.log("app is running on port 3000")
});



//code below to be deleted

// var variable = 'something';
// console.log(variable)

// variable = 4;
// console.log(variable)

// var array  = ["test",3,false];

// var array = array()
 

// for (let i =0;i<array.length;i++) {
//   array[i]
// }

// for (let ite in array) {
//   console.log(ite)
// }

// array.forEach((ite)=>{
//   console.log(ite)
// })
// const numbers = [1,2,3,4,5,6]
// const filteredArray = array.filter((e)=>{
//   return e.isNan();
// })
// const doubling  = numbers.map((e)=>{return e*2});