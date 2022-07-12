const mongoose = require('mongoose');

const water_safetys = mongoose.Schema({
    Particulars: String,
    Recommended: { type: String, default: '' },
    Max: String,
    Unit: String,
    Priority: String,
    Filtering: String,
    Zone: String,
    id: String,
    utlity_enter: String,   
    Substance:String,  
    Default_id:String,
    Country:String,

    
}, {
    timestamps: true
});


// module.exports = mongoose.model('Note', NoteSchema);
module.exports = mongoose.model('water_safetys', water_safetys);





