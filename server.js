var express = require("express");
var path = require("path");
var fs = require("fs");
var notesData = require("./db/db.json")

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// express app to handle data parsing of user inputs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//html routes

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));

});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// api routes
app.get("/api/notes", function (req, res) {
    return res.json(notesData)
});


//add new note from user input to be stored
app.post("/api/notes", function (req, res) {

    var userNote = req.body;

    userNote.id = Date.now()

    notesData.push(userNote);

    //add new data to database in existing database file    
    fs.writeFile("./db/db.json", JSON.stringify(notesData), "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }

    })
    res.json(userNote);
})
//delete notes based on id in the database 
app.delete(`/api/notes/:id`, function (req, res) {

    var chosen = req.params.id;
    fs.readFile(path.join(__dirname,"db/db.json"), function (err,data) {
        if (err) {
            console.log(err);
        }
        var newData = JSON.parse (data);
    var newVar = newData.filter(note => note.id !==chosen)
 console.log (newVar)
    fs.writeFile("./db/db.json", JSON.stringify(newVar), "utf8", function (err) {
        if (err) {
            console.log(err);
        }
        console.log(newVar);
        console.log(chosen);
console.log("SUCCESS")
    })

})


})


//feedback to user that server is active
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});