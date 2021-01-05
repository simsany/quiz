var express = require("express");
var router = new express.Router();
var mongoose = require("mongoose");
var Question = require("../models/question")




	

router.get("/", (req, res) => {
    Question.find({}, (err, foundQuestions) => {
        if (err) { console.log("werrerrer") } else {

            if (foundQuestions.length <= 40) {

                for (let i = 0; i < foundQuestions.length; i++) {


                    shuffle(foundQuestions[i].answers)




                }

                res.render("home.ejs", { questions: foundQuestions })
            }
            else {
                var selected = []

                for (let i = 0; i < 40; i++) {
                    var rand = Math.floor(Math.random() * foundQuestions.length);

                    shuffle(foundQuestions[rand].answers)
                    selected.push(foundQuestions[rand])
                    foundQuestions.splice(rand, 1);

                }

                res.render("home.ejs", { questions: selected })
            }



        }
    })
})



router.get("/show", (req, res) => {
    Question.find({}, (err, foundQuestions) => {
        if (err) { console.log("werrerrer") } else {
            res.render("show.ejs", { questions: foundQuestions })




        }
    })
})

router.get("/new", (req, res) => {
    res.render("new.ejs");




})
router.post("/answers", (req, res) => {
    var correct = [];
    for (let i in req.body) {
        var body = i.split(",")
    }
    for (let j = 0; j < body.length; j++) {
        body[j] = JSON.parse(body[j])
    }



    Question.find().where('_id').in(body).exec((err, found) => {
        if (err) { console.log("errrrroooor") }
        else {

            for (let k = 0; k < found.length; k++) {

                correct.push(found[k])
            }
            var temp = [];

            for (let i = 0; i < correct.length; i++) {
                for (let j = 0; j < body.length; j++) {
                    if (body[j] == correct[i].id) {


                        temp[j] = correct[i].answers[0]

                    }


                }


            }
        }

        correct = temp
        res.send(correct)




    }


    )









})
router.post("/", (req, res) => {
    Question.create(req.body.quiz, (err, newQuestion) => {
        if (err) { console.log("werrerrer") } else {

            res.redirect("/new")




        }
    })
})
router.put("/:id", (req, res) => {
    Question.findByIdAndUpdate(req.params.id, req.body.quiz, (err, updated) => {
        if (err) { console.log("erre") }
        else { res.redirect("/show") }
    }
    )


}

)

router.get("/:id/edit", (req, res) => {
    Question.findById(req.params.id, (err, found) => {
        if (err) { console.log("erre") }
        else { res.render("edit.ejs", { question: found }) }
    }
    )


}

)

router.delete("/:id", (req, res) => {
    Question.findByIdAndRemove(req.params.id, (err, deleted) => {
        if (err) { console.log("erre") }
        else { res.redirect("/show") }
    }
    )


}

)

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}



module.exports = router;
