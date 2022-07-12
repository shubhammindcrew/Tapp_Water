const mongoose = require('mongoose');

const common= mongoose.Schema({  
	filter_id:String,   
	value:String,  
	id:string,
	user_id:string,
}, {
    timestamps: true
});


// module.exports = mongoose.model('Note', NoteSchema);
module.exports = mongoose.model('descriptions', tappstate);





