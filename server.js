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

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));

});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// api routes
app.get("/api/notes", function(req, res) {
    return res.json(notesData)
});


//add new note from user input to be stored
app.post("/api/notes", function(req, res) {

     var userNote = req.body;

     userNote.id = Date.now()

    notesData.push(userNote);

//add new data to database in existing database file    
fs.writeFile("./db/db.json", JSON.stringify(notesData), "utf8", function errorCatch(err, data) {
if (err) {
    console.log (err);
}

})
      res.json(userNote);
  })
//delete notes based on id in the database 
app.delete(`/api/notes/:id`, function (req, res) {
    
    var chosen = req.params.id;
    console.log(req.params.id, "I was clicked"); //this works
    fs.readFile(__dirname + "/db/db.json", "utf8", function errorCatch (err, data) {
        if (err) {
            console.log (err); // no error 
        }

        var obj = JSON.parse(data)
       console.log(obj);
       console.log(obj.id) //this is undefined
        for (var i =0; i<obj.length; i++) {
            console.log ("im here fatty")
            if (obj[i].id = chosen) {
                obj.splice(i,1)
                console.log(chosen, "I was chosen!") //not working
                console.log(obj, "I am the obj!"); //not working
            }
        }
    })
})

//feedback to user that server is active
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });