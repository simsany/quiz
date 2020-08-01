var express=require("express");
var bodyParse=require("body-parser");
var mongoose=require("mongoose")
var app=express();
var cors=require("cors")
const path = require('path');
var Question=require("./models/question")

var methodOverride = require("method-override");
app.use(express.static(path.join(__dirname, 'js')));
app.use(cors())
app.use(methodOverride("_method"));
app.use(bodyParse.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://sanyika:Nem99@cluster0.hg5xp.mongodb.net/orders?retryWrites=true&w=majority");
app.get("/",(req,res)=>{Question.find({},(err,foundQuestions)=>{if(err){console.log("werrerrer")}else{
	
if(foundQuestions.length<=20){
	
for(let i=0;i<foundQuestions.length;i++){
	

shuffle(foundQuestions[i].answers)


	
	
}	
	
res.render("home.ejs",{questions:foundQuestions})}
	else{
	var selected=[]
	
for(let i=0;i<20;i++){
	var rand =Math.floor(Math.random() * foundQuestions.length);

shuffle(foundQuestions[rand].answers)
selected.push(foundQuestions[rand])
foundQuestions.splice(rand,1);	
	
}	

 res.render("home.ejs",{questions:selected})
	}
	
	
	
}})})
	
	
	
app.get("/show",(req,res)=>{Question.find({},(err,foundQuestions)=>{if(err){console.log("werrerrer")}else{
 res.render("show.ejs",{questions:foundQuestions})
	
	
	
	
}})})

app.get("/new",(req,res)=>{
 res.render("new.ejs");
	
	
	
	
})
app.post("/answers",(req,res)=>{
var correct=[];
for(let i in req.body){
var body=i.split(",")}
	for(let j =0;j<body.length;j++){
	body[j]=JSON.parse(body[j])
}


	
	Question.find().where('_id').in(body).exec((err,found)=>{
		if(err){console.log("errrrroooor")}
		else{console.log(found)
		for(let k=0;k<found.length;k++){
			correct.push(found[k].answers[0])}
		}
	
		res.send(correct)
		
	
	
		
	}
	
	
	)





		
	
	
	
})
app.post("/",(req,res)=>{Question.create(req.body.quiz,(err,newQuestion)=>{if(err){console.log("werrerrer")}else{
	
	res.redirect("/new")
	
	
	
	
}})})
app.put("/:id",(req,res)=>
{
	Question.findByIdAndUpdate(req.params.id,req.body.quiz,(err,updated)=>{
	if(err){console.log("erre")}
	else{res.redirect("/show")}
	}
	)
	
	
}

)

app.get("/:id/edit",(req,res)=>
{
	Question.findById(req.params.id,(err,found)=>{
	if(err){console.log("erre")}
	else{res.render("edit.ejs",{question:found})}
	}
	)
	
	
}

)

app.delete("/:id",(req,res)=>
{
	Question.findByIdAndRemove(req.params.id,(err,deleted)=>{
	if(err){console.log("erre")}
	else{res.redirect("/show")}
	}
	)
	
	
}

)

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


app.listen(process.env.PORT)