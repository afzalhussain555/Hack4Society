
var bodyParser  = require('body-parser'),
    express     = require('express'),
    path        = require("path"),
    app         = express(),
    mongoose = require("./db/mongoose"),
    Candidate = require("./models/candidate"),
    Company = require("./models/company"),
    Job = require("./models/job"),
    cookieParser = require("cookie-parser"),
    Mongoose = require("mongoose")


app.set("view engine", 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

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

//add company
app.post("/addCompany", async(req, res)=>{
    
    const company = new Company({
        ...req.body
    })
    try{
        await company.save()
    } catch(error){
        console.log(error)
        res.send(400)        
    }
    console.log(company._id)
    res.cookie('num-num-cookie',company._id)
    res.sendStatus(200)
})

//post a job
app.post("/newPost", async (req, res)=>{
    let company_id = Mongoose.Types.ObjectId(req.header('cookie').split("num-num-cookie=j%3A%22")[1].split("%22")[0])
    const job = new Job({
        ...req.body,
        owner: company_id,
    })
    try{

        await job.save()
    } catch(error){
        console.log(error)
        res.send(400)
        
    }
    res.sendStatus(200)
    
})
//want a job
app.post("/wantJob", async(req,res)=>{
    const candidate = new Candidate({
        ...req.body
    })
    try{
        await candidate.save()
        console.log(candidate)
    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
    res.sendStatus(200)
})

//get all jobs
app.post("/searchJobs", async (req, res)=>{    
    console.log(req.body)
    const filter = {
        salary: req.body.salary,
        title: req.body.title,
        location: req.body.location  
    };
    for(var f in filter) {
        if(filter[f] == undefined) {
            delete filter[f];
        }
        if(filter[f] == "") {
            delete filter[f];
        }

    }

    console.log(filter)
    
    try{
        const all = await Job.find(filter);
        console.log(all)
        res.send(all)
    }catch(error){
        res.sendStatus(400)
    }

})

//get all candidates
app.post("/searchCandidates", async (req, res)=>{    
    const filter = {
        name: req.body.name,
        skills: req.body.skills,
        location: req.body.location  
    };
    for(var f in filter) {
        if(filter[f] == undefined) {
            delete filter[f];
        }
    }

    console.log(filter)
    
    try{
        const all = await Candidate.find(filter);
        console.log(all)
        res.send(all)
    }catch(error){
        res.sendStatus(400)
    }

})


var port = process.env.PORT || 3000;
app.listen(port, function(req, res){
    console.log('Server running at : ' + port);
}) 



