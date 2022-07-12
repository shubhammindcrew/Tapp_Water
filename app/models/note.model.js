const mongoose = require('mongoose');

// var random =  mongoose.Schema({


// });


var data =  mongoose.Schema({
    city     : String,
    post_from:String,
    post_to:String,
    random_post_code:[{
        Post_code_random     : String,
    }]
});



const basic_details = mongoose.Schema({
    city: [data],
    province: String,
    area: String,
    country: String,
    post_from: String,
    post_to: String,   
    drinkable: String,
    utlity_enter: String,  
    description:  String, 
    description_local:String, 
    blog_local_country:String,
    blog_english__country:String,
    same_id:  String, 
    averageDataRange : Boolean,
    start_date : String,
    end_date : String,
    basic_details_id:String,
    reported_date:String,
    submitted_date:String,
    blog_english:String,
    blog_local:String
    }, {
    	timestamps: true
    });

    
// module.exports = mongoose.model('Note', NoteSchema);
module.exports = mongoose.model('basic_detail', basic_details);