
const Herbicides_datas = require('../models/Herbicides_datas.model.js');
const Note = require('../models/Herbicides.model.js');
var mongoose = require('mongoose');

var response=[];
// Create and Save a new Note
exports.create = (req, res) => {
    // //console.log(("res",req.body)

    //console.log(('req.body',req.body)
    // return false;
      for(let i=0;i<req.body.length;i++){
                
                    if(!req.body[i]) {
                        return res.status(400).send({
                            message: "Note content can not be empty"
                        });
                    }
                
                    // Create a Note
                    const note = new Note({
                        Country:req.body[i].Country,
                        Filtering:req.body[i].Filtering,
                        Max:req.body[i].Max,
                        Priority:req.body[i].Priority,
                        Recommended:req.body[i].Recommended,
                        Substance:req.body[i].Substance,
                        Unit:req.body[i].Unit,
                        // id:req.body[i].id,

                    });
                    // Save Note in the database
                    note.save()
                    .then(data => {
                    if(data){
                        //console.log(("data................",data,"i---------------",i);

                        let condition= {_id:mongoose.Types.ObjectId(data._id)}
                     let values={
                    $set:{
                        Default_id:data._id,
                        
                    }
                }
                Note.updateMany(condition,values,{ upsert: true })
                .then(data=>{
                    //console.log(("data......................",data,'i,,,,,,,,,,,,,',i)

                    if(i==(req.body.length-1)){
                    res.send(data)}
                }).catch(err=>{
                    if(i==(req.body.length-1)){
                        res.send(err)}
                })
                    }
                    })                   

        }

}


 
function callback(res,data){
    res.send(data);
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    let condition= {Country:req.body.country}

    Note.find(condition)
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
    var Condition ={
        "_id":mongoose.Types.ObjectId(req.body[i]._id),
        "Country":req.body[i].country
    }

    Note.findOneAndUpdate(Condition, {

        	$set:{                    
                    Unit:req.body[i].Unit,
                    Max:req.body[i].Max,
                    Recommended:req.body[i].Recommended,
                    Priority:req.body[i].Priority,
                    Filtering:req.body[i].Filtering,
		            Substance:req.body[i].Substance,

},
    }, {upsert : true})   
    .then((updatedDoc) => { 

 
    Note.findOneAndUpdate({"_id":mongoose.Types.ObjectId(updatedDoc._id)}, {

        	$set:{                    
                    Default_id:updatedDoc._id,

},
    }, {upsert : true})   
    .then((default_data) => {
 
	})
    	




        if(updatedDoc) {
            var msg=updatedDoc
            // temp.push(msg)      
          
            // return false;
           
            finding(res,req.body[i],req.body.length,updatedDoc,i);
         
         } else {
            msg="Failed";
            //console.log(("success",i)
            if(i==req.body.length-1){
                      
                res.send({data:"success"});
             
            }
         
         } 
    }).catch((err)=>{
        reject(err);
     })
}

};



function reject(r){
    //console.log(("reject",r)
}


const common = require('../models/common.model.js');

exports.update_many_all = (req, res) => {    
    var temp=[]  
    // common
    common.find(
       { $or:[{country:req.body[0].country},{"custom_country" : req.body[0].country}]}
        ).then(common_data => {
        if(!common_data) {
            return res.status(404).send({
                message: "Note not found with id " + req.body.id
            });            
        }

        let length_common=common_data.length;
        for(let r=0;r<common_data.length;r++){

                /////////////////////////////////////////////////////////////
                
                for(let i=0;i<req.body.length;i++){

                    // Find note and update it with the request body
                    var Condition ={
                        "Substance":req.body[i].Substance,
                        "Country":common_data[r].country
                    }
                    console.log('-----------------------------------------------------')
                    console.log("Condition,,,,,,,,,,,,,,,,,,,,,,,,,,",Condition)
                    console.log('-----------------------------------------------------')

                    Note.findOneAndUpdate(Condition, {
                            $set:{                    
                                    Unit:req.body[i].Unit,
                                    Max:req.body[i].Max,
                                    Recommended:req.body[i].Recommended,
                                    Priority:req.body[i].Priority,
                                    Filtering:req.body[i].Filtering,
                                    Substance:req.body[i].Substance,

                },
                    }, {upsert : true})   
                    .then((updatedDoc) => { 

                        // //console.log(("updatedDoc",updatedDoc)
                        Note.findOneAndUpdate({"_id":mongoose.Types.ObjectId(updatedDoc._id)}, {
                            $set:{                    
                                    Default_id:updatedDoc._id,

                },
                    }, {upsert : true})   
                    .then((default_data) => {
                    // //console.log(("default_data",default_data) 
                    })
                        if(updatedDoc) {
                            var msg=updatedDoc           
                            finding_all(res,req.body[i],req.body.length,updatedDoc,i,r,length_common);
                        
                        } else {
                            msg="Failed";
                            //console.log(("success",i)
                            if(i==req.body.length-1){
                                    
                                res.send({data:"success"});
                            
                            }
                        
                        } 
                    }).catch((err)=>{
                        reject(err);
                    })
                }
                ////////////////////////////////////////////////

        }
        res.send(common_data);
    }).catch(err => {
        console.log("common_data failed")
    });
	
};

function finding_all(res,data,size,temp,i,r,length_common){
    var update_data=[];
    // //console.log(("")
    query={update_id:temp._id}
    Herbicides_datas.find(query)
    .then(notes => {      
    
        // //console.log(("vvbnbvv in finding  notes",notes,"i,,,,,,",i)
            for(let j=0;j<notes.length;j++){    
              
            var str= data.Filtering
            var _id=notes[j]._id            
            var Filtering = str.replace("%", "");
            if(notes[j].Zone!=null){
            var before_filtering=((1-(parseFloat(Filtering)/100))*notes[j].Zone).toFixed(2)
                Herbicides_datas.updateOne({
                    "_id" :mongoose.Types.ObjectId(notes[j]._id),
                },{
                    $set:{
                        Unit:data.Unit,
                        Max:data.Max,
                        Recommended:data.Recommended,
                        Priority:data.Priority,
                        Filtering:before_filtering,
                        Substance:data.Substance,
                    }
                }).then((updatedDoc) => {                
                 
                    if(updatedDoc) {
                    var msg=updatedDoc
                    update_data.push(msg)
                    // //console.log((updatedDoc)
                    // return false;                
                    if((i==size-1) && (j==notes.length-1) && (r==(length_common-1)) ){                      
                        res.send({data:"success"});                     
                    }

                    } else {
                    msg="Failed";
                    update_data.push(msg) 
                    if((i==size-1) && (j==notes.length-1)  && (r==(length_common-1))){
                      
                        res.send({data:"success"});
                     
                    }
                   

                    } 
                }).catch((err)=>{
                reject(err);
                })
            }
            else if(notes[j].Zone==null){
                var str= data.Filtering
                var _id=notes[j]._id            
                var Filtering = str.replace("%", "");

                if(notes[j].maximum!=null || notes[j].minimum!=null ){
                     let a = ((notes[j].maximum!=null?notes[j].maximum:0)*(100-parseFloat(Filtering)))/100
                     let b= ((notes[j].minimum!=null?notes[j].minimum:0)*(100-parseFloat(Filtering)))/100
                     var before_filtering=b+'-'+a;
                    Herbicides_datas.updateOne({
                        "_id" :mongoose.Types.ObjectId(notes[j]._id),
                    },{
                        $set:{
                            Unit:data.Unit,
                            Max:data.Max,
                            Recommended:data.Recommended,
                            Priority:data.Priority,
                            Filtering:before_filtering,
                            Substance:data.Substance,
                        }
                    }).then((updatedDoc) => {                
                     
                        if(updatedDoc) {
                        var msg=updatedDoc
                        update_data.push(msg)
                        // //console.log((updatedDoc)
                        // return false;                
                        if((i==size-1) && (j==notes.length-1) && (r==(length_common-1)) ){                      
                            res.send({data:"success"});                     
                        }
    
                        } else {
                        msg="Failed";
                        update_data.push(msg) 
                        if((i==size-1) && (j==notes.length-1)  && (r==(length_common-1))){
                          
                            res.send({data:"success"});
                         
                        }
                       
    
                        } 
                    }).catch((err)=>{
                    reject(err);
                    })

                }
                else{
                var before_filtering=''
                Herbicides_datas.updateOne({
                  "_id" :mongoose.Types.ObjectId(notes[j]._id),
                },{
                    $set:{
                    Unit:data.Unit,
                    Max:data.Max,
                    Recommended:data.Recommended,
                    Priority:data.Priority,
                    Filtering:before_filtering,
                    Substance:data.Substance,
                    }
                }).then((updatedDoc) => {                

                if(updatedDoc) {
                var msg=updatedDoc
                update_data.push(msg)
               
                if((i==size-1) && (j==notes.length-1)  && (r==(length_common-1)) ){                      
                res.send({data:"success"});                     
                }

                } else {
                msg="Failed";
                update_data.push(msg) 
                if((i==size-1) && (j==notes.length-1) && (r==(length_common-1)) ){

                res.send({data:"success"});

                }


                } 
                }).catch((err)=>{
                reject(err);
                })
                }             
            } 
                
                
              
        }
        if(notes.length==0 && i==(size-1) && (r==(length_common-1))){
            //console.log(("notes..............",notes,'i',i,'r',r)
            res.send({data:"failed"});
            
        }
        

    }).catch(err => {
          //console.log(("error........................................")
    });
}


function finding(res,data,size,temp,i){
    // //console.log(("water safety finding function...........,temp._id",temp._id,"i.........",i)

    var update_data=[];
    // //console.log(("")
    query={update_id:temp._id}
    Herbicides_datas.find(query)
    .then(notes => {      
    
        // //console.log(("vvbnbvv in finding  notes",notes,"i,,,,,,",i)
            for(let j=0;j<notes.length;j++){    
              
            var str= data.Filtering
            var _id=notes[j]._id            
            var Filtering = str.replace("%", "");
            if(notes[j].Zone!=null){
            var before_filtering=((1-(parseFloat(Filtering)/100))*notes[j].Zone).toFixed(2)
            Herbicides_datas.updateOne({
                    "_id" :mongoose.Types.ObjectId(notes[j]._id),
                },{
                    $set:{
                        Unit:data.Unit,
                        Max:data.Max,
                        Recommended:data.Recommended,
                        Priority:data.Priority,
                        Filtering:before_filtering,
                        Substance:data.Substance,
                    }
                }).then((updatedDoc) => {                
                 
                    if(updatedDoc) {
                    var msg=updatedDoc
                    update_data.push(msg)
                    // //console.log((updatedDoc)
                    // return false;                
                    if((i==size-1) && (j==notes.length-1) ){                      
                        res.send({data:"success"});                     
                    }

                    } else {
                    msg="Failed";
                    update_data.push(msg) 
                    if((i==size-1) && (j==notes.length-1) ){
                      
                        res.send({data:"success"});
                     
                    }
                   

                    } 
                }).catch((err)=>{
                reject(err);
                })
            }
            else if(notes[j].Zone==null){
                var str= data.Filtering
                var _id=notes[j]._id            
                var Filtering = str.replace("%", "");

                if(notes[j].maximum!=null || notes[j].minimum!=null ){
                     let a = ((notes[j].maximum!=null?notes[j].maximum:0)*(100-parseFloat(Filtering)))/100
                     let b= ((notes[j].minimum!=null?notes[j].minimum:0)*(100-parseFloat(Filtering)))/100
                     var before_filtering=b+'-'+a;
                     Herbicides_datas.updateOne({
                        "_id" :mongoose.Types.ObjectId(notes[j]._id),
                    },{
                        $set:{
                            Unit:data.Unit,
                            Max:data.Max,
                            Recommended:data.Recommended,
                            Priority:data.Priority,
                            Filtering:before_filtering,
                            Substance:data.Substance,
                        }
                    }).then((updatedDoc) => {                
                     
                        if(updatedDoc) {
                        var msg=updatedDoc
                        update_data.push(msg)
                        // //console.log((updatedDoc)
                        // return false;                
                        if((i==size-1) && (j==notes.length-1) ){                      
                            res.send({data:"success"});                     
                        }
    
                        } else {
                        msg="Failed";
                        update_data.push(msg) 
                        if((i==size-1) && (j==notes.length-1) ){
                          
                            res.send({data:"success"});
                         
                        }
                       
    
                        } 
                    }).catch((err)=>{
                    reject(err);
                    })

                }
                else{
                var before_filtering=''
                Herbicides_datas.updateOne({
                  "_id" :mongoose.Types.ObjectId(notes[j]._id),
                },{
                    $set:{
                    Unit:data.Unit,
                    Max:data.Max,
                    Recommended:data.Recommended,
                    Priority:data.Priority,
                    Filtering:before_filtering,
                    Substance:data.Substance,
                    }
                }).then((updatedDoc) => {                

                if(updatedDoc) {
                var msg=updatedDoc
                update_data.push(msg)
               
                if((i==size-1) && (j==notes.length-1) ){                      
                res.send({data:"success"});                     
                }

                } else {
                msg="Failed";
                update_data.push(msg) 
                if((i==size-1) && (j==notes.length-1) ){

                res.send({data:"success"});

                }


                } 
                }).catch((err)=>{
                reject(err);
                })
                }
           
            } 
                
                
              
        }
        if(notes.length==0 && i==(size-1)){
            //console.log(("notes..............",notes,'i',i)
            res.send({data:"failed"});
            
        }
        

    }).catch(err => {
          //console.log(("error........................................")
    });
}
