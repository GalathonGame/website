const express = require('express');
const app = new express();
const session = require('express-session');
const expressEdge = require('express-edge');
const edge = require('edge.js');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const connectFlash = require('connect-flash');

//connect to database
mongoose.connect('mongodb+srv://admin:d@nhph@n141204@danhphan.kjnld.gcp.mongodb.net/Galathon?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;

//handle mongo error
db.on('error', console.log);
db.once('open', function () {
    console.log('Connected to database');
})

//use session for tracking logins and store it in MongoDB database
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//using external modules
app.use(connectFlash());
app.use(fileUpload());

//parsing incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//serve static files from template
app.use(express.static(__dirname));
app.use('/posts', express.static(__dirname));
app.use('/posts/:id', express.static(__dirname));
//using Edge Template Engine
app.use(expressEdge.engine);
app.set('views', __dirname);

// app.use('*', (req, res, next) => {
//     edge.global('auth', req.session.userId);
//     next();
// });

const Route = require('./routes/route');
Route(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('App listening on port', PORT);
});