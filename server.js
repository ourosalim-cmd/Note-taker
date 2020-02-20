var express = require("express");
var fs = require("fs");
var path = require("path");
var db = require("./db/db");
var app = express();
var PORT = process.env.PORT || 8080;
var notes = [];

app.post("/w", function(req, res) {
    var newNotes = req.body;
    fs.readFile("./db/db.json", "utf8", function(error, data) {
        
        if (error) {
            return console.log(error);
        }
        else {
            notes.push(data);
            notes.push(newNotes);
            console.log(notes);
        } 
        //console.log("Success");
    });
});


app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        } 
        //console.log("Notes object:" + myNotes);
        res.send(JSON.parse(data));
    });
    
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  

//   fs.writeFile("log.txt", process.argv[2], function(err) {

//     if (err) {
//       return console.log(err);
//     }
  
//     console.log("Success!");
  
//   });
  

  
//   app.delete("/api/notes/:id", function(req, res) {
//     var chosen = req.params.id;
  
//     console.log(chosen);
  
//     for (var i = 0; i < notes.length; i++) {
//       if (chosen === notes[i].id) {
//           notes.pop(notes[i]);
//         return res.json(notes[i]);
//       }
//     }
  
//     return res.json(false);
//   });

  app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
  })