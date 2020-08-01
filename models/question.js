var mongoose=require("mongoose");

var QuestionSchema= new mongoose.Schema({
	
	text:{type:String, default: ""},
	answers: [],
	
	});
	
	module.exports=mongoose.model("Question",QuestionSchema);