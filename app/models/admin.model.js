const mongoose = require('mongoose');

const basic_details = mongoose.Schema({
  
    user: String,
    password: String,    
}, {
    timestamps: true
});


// module.exports = mongoose.model('Note', NoteSchema);
module.exports = mongoose.model('admin', basic_details);