var express = require("express");
var path = require("path");
var fs = require("fs");
var notesData = require("./db/db.json")

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //do we even need this? usually with integers 

//html routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));

});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(notesData)
});





//
app.post("/api/notes", function(req, res) {

     var userNote = req.body;

    notesData.push(userNote);

//add note to database file    
fs.writeFile("./db/db.json", JSON.stringify(notesData), "utf8", function errorCatch(err, data) {
if (err) {
    console.log (err);
}

})
      res.json(userNote);
  })

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post("/api/clear", function(req, res) { //DELETE NOTES?
//     // Empty out the arrays of data
//     notes.length = 0;
//     res.json({ ok: true });
//   });

//feedback to user that server is active
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });