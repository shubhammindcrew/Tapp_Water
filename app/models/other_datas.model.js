
const mongoose = require('mongoose');

const pathogens = mongoose.Schema({
    Particulars: String,
    Recommended: String,
    Max: String,
    Unit: String,
    Priority: String,
    Filtering: String,
    Zone: String,
    id: String,
    utlity_enter: String,   
    basic_details_id:String,
     Substance:String,
update_id:String,
   minimum:String,
   maximum:String,

}, {
    timestamps: true
});

// module.exports = mongoose.model('Note', NoteSchema);
module.exports = mongoose.model('other_datas', pathogens);