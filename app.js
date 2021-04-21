require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose')
const aboutUsRouter = require('./routes/about-us');
const indexRouter = require('./routes/index');
const trainingsRouter = require('./routes/trainings');
const adminRouter = require("./routes/admin");
const applicationSuccessRouter = require("./routes/application_success");
const requestsRouter = require('./routes/api/requests')
const trainingsListRouter = require('./routes/api/trainingsList')
const app = express();

// mongoose connection
mongoose.connect(process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('DB connection established.')
    }).catch(err => {
  console.log('DB connection failed.')
  console.log(err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutUsRouter);
app.use('/trainings', trainingsRouter);
app.use("/admin", adminRouter);
app.use('/requests', requestsRouter)
app.use('/trainingsList', trainingsListRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
