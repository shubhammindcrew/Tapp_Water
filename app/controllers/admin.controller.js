const Note = require('../models/admin.model.js');
const customers = require('../models/customers.model.js');
// customers.model.js
var mongoose = require('mongoose');

// Create and Save a new Note
exports.insert = (req, res) => {
    
    // Create a Note
    const customer = new customers(req.body);

    // Save Note in the database
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.fetch_data = (req, res) => {

    customers.find().sort({_id:-1})
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
   // Note.findById({"_id":mongoose.Types.ObjectId(req.body.id)})
 console.log(req.body);
	var query={$and :[{"password":req.body.password}, {"user":req.body.user}]}
     Note.find(query)
    .then(note => {
        
        if(!note) {
            let data=[];
            //console.log("data not found")         
            data.push("Email and password does not match");         
        }
       if(note.length !=0) {         
          
           res.send({statue:"true",data:note})  
        }
	 else{
        let data=[];
         //console.log("data not found")         
         data.push("Email and password does not match");
	        res.send({statue:"false",data:data})
	}
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            let data=[];
            //console.log("data not found")         
            data.push("Email and password does not match");
            res.send({statue:"false",data:data})               
        }
        let data=[];
         //console.log("data not found")         
         data.push("Email and password does not match");
        res.send({statue:"false",data:data})  
    });
};




// Update a note identified by the noteId in the request
exports.update = (req, res) => {
 
 
    // Find note and update it with the request body

    Note.findByIdAndUpdate({"_id":mongoose.Types.ObjectId(req.body._id)}, {

    city: req.body.city,
    province: req.body.province,
    area: req.body.area,
    country: req.body.country,
    post_from: req.body.post_from,
    post_to: req.body.post_to,
    date: req.body.date,
    drinkable: req.body.drinkable,
    utlity_enter: req.body.utlity_enter, 

        title: req.body.title || "Untitled Note",
        content: req.body.content

    }, {new: true})
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
            message: "Error updating note with id " + req.body.id
        });
    });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    customers.findByIdAndRemove({"_id":mongoose.Types.ObjectId(req.body._id)})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " +req.body._id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.body._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.body._id
        });
    });
};


exports.update_many = (req, res) => {
    // //console.log("req.body.length",req.body)
    // return false;
    var temp=[]
	for(let i=0;i<req.body.length;i++){

    // Find note and update it with the request body
    Note.findOneAndUpdate({"_id":mongoose.Types.ObjectId(req.body[i]._id)}, {

        		$set:{	Unit:req.body[i].Unit,
                    Max:req.body[i].Max,
                    Recommended:req.body[i].Recommended,
                    Priority:req.body[i].Priority,
                    Filtering:req.body[i].Filtering

}
    }, {returnNewDocument : true})   
    .then((updatedDoc) => {
        // //console.log(updatedDoc)
        if(updatedDoc) {
            var msg="sccessfully"
            temp.push(msg)           
            resolve(res,temp,req.body.length,i);
         } else {
            msg="Failed";
            temp.push(msg) 
           
            resolve(res,temp,req.body.length,i);
         } 
    }).catch((err)=>{
        reject(err);
     })
}

};

function resolve(res,data,size,i){
    // res.send({message: "successfully!".r});
    //console.log("resolve",data);
  
    if(i==size-1){
        res.send({data:data});
    }

}

function reject(r){
    //console.log("reject",r)
}





exports.get_data_using_findone= (req, res) => {


 var query = {}
if(req.body.postcode) {
  query = {$or:[{post_from:{$regex: req.body.postcode, $options: 'i'}},{post_to:{$regex: req.body.postcode, $options: 'i'}}]}
}

Note.find(query , function (err, data) {
   if(err) {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
    });
   }

   if(data.length==0){
    //    //console.log("empty")

    Note.find()
    .then(notes => {
        //console.log("all response",notes[0].post_to);
        let i=0;
        for(i=0;i<notes.length;i++){
            var temp =(notes[i].post_from < req.body.postcode) && (notes[i].post_to > req.body.postcode);
            if(temp==true){
                temp =notes[i].post_from;
                //console.log("in if",temp)
                res.send({
                    status:"true",data:{0:notes[i]}
                });
            }
            if(i=(notes.length-1)){
                res.send({
                    status:"false",data:"not found"
                });
            }
          
        }
        // res.send(notes);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

   }
   if(data.length != 0){
    res.send({
        status:"true",data:data
    });
   }
  
});





    /*
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
    });*/

};

