
const Note = require('../models/common.model.js');
const basic = require('../models/note.model.js');

var mongoose = require('mongoose');
var response=[];
// Create and Save a new Note
exports.create = (req, res) => {
    // //console.log(("res",req.body)
    // Validate request
      const note = new Note(
            req.body
        );
        // Save Note in the database

console.log("country:req.body.country",req.body.country)
        Note.findOne({country:req.body.country})
        .then(data_result => {
            console.log("description_______________________________",data_result)
            if(data_result==null) 
            {            
                note.save()
                .then(data => { 
                    res.send({data:data});                    
                }).catch(err => {
                    data="Some error occurred while creating the Note.".err.message;
                    res.send(data);
                  });

            }
            if(data_result!=null){
                data='Country already exists';
                res.send({data:data});
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id "
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id "
            });
        });


        
    };


 
function callback(res,data){
    res.send(data);
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    let condition={country:req.body.country};
    // //console.log(("condition",req.body.country)
    Note.findOne(condition)
    .then(notes => {
    // //console.log(("notes",notes)
        if(notes!=null){

        res.send({data:notes});
    }
    else{
        res.send({data:'Country not found'});

    }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.country=(req,res)=>{

    Note.find()

    .then(notes => {
        
        if(notes!=null){

        res.send({data:notes});
    }
    else{
        res.send({data:'Country not found'});

    }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

}

exports.country_custom=(req,res)=>{
    Note.find({selection:'custom'})
    .then(notes => {
    // //console.log(("notes",notes)
        if(notes!=null){

        res.send({data:notes});
    }
    else{
        res.send({data:'Country not found'});

    }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}
// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById({"_id":mongoose.Types.ObjectId(req.body.id)})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.body.id
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.body.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.body.id
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    //console.log(("req.body.length",req.body.length)
    // return false;
	for(let i=0;i<req.body.length;i++){

    // Find note and update it with the request body
    Note.findByIdAndUpdate({"_id":mongoose.Types.ObjectId(req.body[i].id)}, {

        			Unit:req.body[i].Unit,
                    Max:req.body[i].Max,
                    Recommended:req.body[i].Recommended,
                    Priority:req.body[i].Priority,
                    Filtering:req.body[i].Filtering


    }, {new: true})   
    .then(note => {     
            var  message="successfully"        
            callback1(res,message);
    }).catch(err => {
       
        var message ="Error updating note with id " + req.body[i].id
       
    
            callback1(res,message);
    });

}

};


exports.update_many = (req, res) => {

    //console.log(("des............................",req.body.description)
    req.body._id="5e329b08bdbcfd1a44c4fc1e"
    Note.update({country:req.body.country}, {

        description:req.body.description,
        // description:String,   
        description_local:req.body.description_local,   
        reference_english:req.body.reference_english,   
        reference_local:req.body.reference_local,   
        blog_english:req.body.blog_english, 
        blog_local:req.body.blog_local,  
        country:req.body.country, 



}, {new: true}).then((note)=>{

    //console.log(("note",note);

    basic.update({country:req.body.country}, {"$set":{description:req.body.description,description_local:req.body.description_local,blog_local_country:req.body.blog_local,blog_english__country:req.body.blog_english  
    
    }}, {"multi": true}, (err, writeResult) => {
    //console.log(("error",err)
    //console.log(("writeResult",writeResult)
    if(writeResult){
        res.send({status:"true",data:writeResult})
    }

    });


}).catch(err => {
    res.send({status:"false",data:err})
});   
};



