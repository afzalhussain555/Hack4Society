var bodyParser  = require('body-parser'),
    express     = require('express'),
    path        = require("path"),
    app         = express();

app.set("view engine", 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res){
    res.render('index');
})

app.get('/index', function(req, res){
    res.render('index');
})
app.get('/jobs', function(req, res){
    res.render('jobs');
})

app.get('/about', function(req, res){
    res.render('about');
})

app.get('/learn', function(req, res){
    res.render('learn');
})

app.get('/new-post', function(req, res){
    res.render('new-post');
})

app.get('/job-post', function(req, res){
    res.render('job-post');
})

var port = process.env.PORT || 3000;
app.listen(port, function(req, res){
    console.log('Server running at : ' + port);
}) 
