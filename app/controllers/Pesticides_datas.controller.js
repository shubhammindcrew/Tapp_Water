

const Note = require('../models/Pesticides_datas.model.js');
var mongoose = require('mongoose');
var response=[];
// Create and Save a new Note
exports.create = (req, res) => {



    for(let i=0;i<req.body.length;i++){
    
         /*   // Create a Note
            const note = new Note(
                req.body[i]
            );
    
            // Save Note in the database
            note.save()
            .then(data => { 
               data1="successfully insert" ;

               if(i==req.body.length-1) {  
    
                    res.send(data);
            }
            }).catch(err => {
                data="Some error occurred while creating the Note.";
    
                if(req.body.length-1==i) {  
    
                    res.send(data);
            }
            });*/
            let condition= {$and:[{basic_details_id:req.body[i].basic_details_id},{Substance:req.body[i].Substance}]}
            let values={
                     $setOnInsert:{
                         Unit:req.body[i].Unit,
                         Max:req.body[i].Max,
                         Recommended:req.body[i].Recommended,
                         Priority:req.body[i].Priority,
                         Filtering:req.body[i].Filtering,
                         update_id:req.body[i].update_id,
                         id:req.body[i].id,
                         Zone:req.body[i].Zone,
minimum:req.body[i].minimum,
maximum:req.body[i].maximum,
                     }
                 }
                 Note.update(condition,values,{ upsert: true })
                 .then(data=>{
 
                     if(i==(req.body.length-1)){
                     res.send(data)}
                 }).catch(err=>{
 
                     if(i==(req.body.length-1)){
                         res.send(err)}
                 })
            };
    
    }

 
function callback(res,data){
    res.send(data);
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


exports.findOne_priority = (req, res) => {
    //console.log(("basic_details_id",req.body);
      Note.find({"basic_details_id":req.body.basic_details_id,"Priority" :{ $gte: "1"},})
    .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
    };
// Find a single note with a noteId
exports.findOne = (req, res) => {
//console.log(("basic_details_id",req.body);
  Note.find({"basic_details_id":req.body.basic_details_id})
.then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove({"_id":mongoose.Types.ObjectId(req.body.id)})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " +req.body.id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.body.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.body.id
        });
    });
};

exports.update_many = (req, res) => {
    
    var temp=[]
	for(let i=0;i<req.body.length;i++){

    // Find note and update it with the request body
    Note.findOneAndUpdate({"_id":mongoose.Types.ObjectId(req.body[i]._id)}, {

        	$set:{	Unit:req.body[i].Unit,
                    Max:req.body[i].Max,
                    Recommended:req.body[i].Recommended,
                    Priority:req.body[i].Priority,
                    Filtering:req.body[i].Filtering,
                    Zone:req.body[i].Zone,
                    update_id:req.body[i].update_id,
                    Substance:req.body[i].Substance


}
    }, { upsert: true})   
    .then((updatedDoc) => {
        //console.log((updatedDoc)
       if(updatedDoc) {


            var msg="sccessfully"
            temp.push(msg)           
            resolve(res,temp,req.body.length,i);
         } else if(updatedDoc==null) {

        //console.log(("null");           
        const note = new Note(
            req.body[i]
        );

        // Save Note in the database
        note.save()
        .then(data => { 
           
             msg="data insert succesfully";
            temp.push(msg) 
           
            resolve(res,temp,req.body.length,i);
        }).catch(err => {
            data="Some error occurred while creating the Note.".err.message;
          

             msg="Failed";
            temp.push(msg) 
           
            resolve(res,temp,req.body.length,i);
        });

         
         } 
    }).catch((err)=>{
        reject(err);
     })
}

};
function resolve(res,data,size,i){
    // res.send({message: "successfully!".r});
    //console.log(("resolve",data);
  
    if(i==size-1){
        res.send({data:data});
    }

}

function reject(r){
    //console.log(("reject",r)
}


