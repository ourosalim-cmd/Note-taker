const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
//Creat a NoteBook class and methodes
class NoteBook {
  constructor() {
    this.noteID = 0;
  }
//Reading from db.json file
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
//Write into db.json file
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
//methoide for query noteBook 
  get() {
    return this.read().then(notes => {
      var parsedNotes;
      parsedNotes = [].concat(JSON.parse(notes));
      return parsedNotes;
    });
  }
//method fro creating new notes
  set(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' are required");
    }

    // Increment `this.noteID` and assign it to `newNote.id`
    const newNote = { title, text, id: ++this.noteID };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.get()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.get()
      .then(notes => notes.filter(found => found.id !== parseInt(id)))
      .then(filteredNotes => this.write(filteredNotes));
  }
}

module.exports = new NoteBook();