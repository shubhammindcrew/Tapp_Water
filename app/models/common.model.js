const mongoose = require('mongoose');

const common= mongoose.Schema({  
	description:String,   
	description_local:String,   
	reference_english:String,   
	reference_local:String,   
    blog_english:String, 
    blog_local:String,  
	country:String,   
	selection:String,
	custom_country:String,
}, {
    timestamps: true
});


// module.exports = mongoose.model('Note', NoteSchema);
module.exports = mongoose.model('descriptions', common);





