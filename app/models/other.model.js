
const mongoose = require('mongoose');

const pathogens = mongoose.Schema({
    Particulars: String,
    Recommended: { type: String, default: '' },
    Max: { type: String, default: '' },
    Unit: { type: String, default: '' },
    Priority: { type: String, default: '' },
    Filtering: { type: String, default: '' },
    Zone: { type: String, default: '' },
    id: String,
    utlity_enter: String,   
    Substance:String,  
    Default_id:String,
    Country:String,

}, {
    timestamps: true
});


// module.exports = mongoose.model('Note', NoteSchema);
module.exports = mongoose.model('other', pathogens);