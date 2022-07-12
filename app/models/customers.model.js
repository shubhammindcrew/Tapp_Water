const mongoose = require('mongoose');

const water_safetys = mongoose.Schema({
 email:String,
 postcode:String,
country:String,
    
}, {
    timestamps: true
});


// module.exports = mongoose.model('Note', NoteSchema);
module.exports = mongoose.model('customer', water_safetys);





