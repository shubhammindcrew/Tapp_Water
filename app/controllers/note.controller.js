const Note = require('../models/note.model.js');
const water_safety_datas = require('../models/water_safety_datas.model.js');
const general_datas = require('../models/general_datas.model.js');
const pathogen_datas = require('../models/pathogens_datas.model.js');
const chemical_parameter_datas = require('../models/chemical_parameter_datas.model.js');
const mineral_datas = require('../models/minerals_datas.model.js');
const metal_datas = require('../models/metals_datas.model.js');
const chlorine_bi_product_datas = require('../models/Chlorine_bi_products_datas.model.js');
const haa_datas = require('../models/HAAs_datas.model.js');
const pesticide_datas = require('../models/Pesticides_datas.model.js');
const herbicide_datas = require('../models/Herbicides_datas.model.js');
const perfluorinated_chemical_datas = require('../models/Perfluorinated_chemicals_datas.model.js');
const other_datas = require('../models/other_datas.model.js');
const pharmaceutical_datas = require('../models/Pharmaceuticals_datas.model.js');
const { TrackClient, RegionUS, RegionEU } = require("customerio-node");
let cio = new TrackClient("5c4ad62205f288c11827", "684702c37c33f66849d1", { region: RegionUS });
console.log("This is Notes");
const nodemailer = require("nodemailer");
var mongoose = require('mongoose');

const sendMail = (email, res) => {
  try {
    //  var smtpTransport = require('nodemailer-smtp-transport');

    // return  res.json({ "fgfbgf":"fgfefvfd"})

    var transporter = nodemailer.createTransport(({
      service: 'gmail',
      auth: {
        user: 'imshubham262@gmail.com',
        pass: '119977161549'
      }
    }));

    // const verificationlink = "http://" + req.get('host') + "/api/verify?id=" + rand;
    var mailOptions = {
      from: 'imshubham262@gmail.com',
      to: email,
      subject: "Please confirm your email account",
      text: "got the  new email"
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("inside if block")
          return res.json({
              status: false,
              message: "Email is not send, please send again.",
              orignalError: error
          })
      }
      else{
        console.log("inside else block")
        res.send({
          status: true,
          message: "Email sent successfully."
      })
      }
     
  });
    // return transporter.sendMail(mailOptions, function (error, info, res) {
    //   if (error) {
    //     return res.json({
    //       status: false,
    //       message: 'mail not send.',
    //       orignalError: error
    //     })

    //   }
    //   return res.json({ status: 200, msg: 'Email sent successfuly. Plz verify you email using provided link.' })
    // });


  }
  catch (err) {
    res.json({
      status: false,
      message: 'Soemthing went wrong.',
      orignalError: err})}
}

exports.Send_emails = (req, res) => {
  const email = req.body.email;
  const data = sendMail(email, res);
  console.log("send data", data);
  res.send({
    status: true,
    message: "Email sent successfully.",
    data : data
})
}


// Create and Save a new Note
exports.create = (req, res) => {
  console.log("res,,,,,,,", req.body)
  // Validate request
  req.body.same_id = "ADMIN";

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  // Create a Note
  const note = new Note(req.body);

  // Save Note in the database
  note.save()
    .then(data => {
      if (data) {


        // Find note and update it with the request body
        Note.findByIdAndUpdate({ "_id": mongoose.Types.ObjectId(data._id) }, {
          basic_details_id: data._id,
        }, { new: true })
          .then(note => {
            //basic_details_id:String,
            // //console.log(("here note.........",data._id,"note",note )
            res.send(data);
          })

      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find().sort({ updatedAt: -1 }).limit(10)
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
  Note.findById({ "_id": mongoose.Types.ObjectId(req.body.id) })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.body.id
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Note not found with id " + req.body.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.body.id
      });
    });
};

exports.findOne_city_front_end = (req, res) => {
  Note.findById({ "_id": mongoose.Types.ObjectId(req.body.id) })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.body.id
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Note not found with id " + req.body.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.body.id
      });
    });
};



/*exports.update = (req, res) => {
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
    description: req.body.description, 
    blog_link:req.body.blog_link,
    start_date:req.body.start_date,
    end_date:req.body.end_date,
    averageDataRange : req.body.averageDataRange

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
*/

exports.update = (req, res) => {
  // condition
  Note.findByIdAndUpdate({ "_id": mongoose.Types.ObjectId(req.body._id) }, {

    city: req.body.city,
    province: req.body.province,
    area: req.body.area,
    country: req.body.country,
    post_from: req.body.post_from,
    post_to: req.body.post_to,
    date: req.body.date,
    drinkable: req.body.drinkable,
    utlity_enter: req.body.utlity_enter,
    description: req.body.description,
    blog_link: req.body.blog_link,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    averageDataRange: req.body.averageDataRange,
    reported_date: req.body.reported_date,
    submitted_date: req.body.submitted_date,
    blog_english: req.body.blog_english,
    blog_local: req.body.blog_local

  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.body.id
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
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
  Note.findByIdAndRemove({ "_id": mongoose.Types.ObjectId(req.body.id) })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.body.id
        });
      }
      res.send({ message: "Note deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
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
  // //console.log(("req.body.length",req.body)
  // return false;
  var temp = []
  for (let i = 0; i < req.body.length; i++) {

    // Find note and update it with the request body
    Note.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(req.body[i]._id) }, {

      $set: {
        Unit: req.body[i].Unit,
        Max: req.body[i].Max,
        Recommended: req.body[i].Recommended,
        Priority: req.body[i].Priority,
        Filtering: req.body[i].Filtering

      }
    }, { returnNewDocument: true })
      .then((updatedDoc) => {
        // //console.log((updatedDoc)
        if (updatedDoc) {
          var msg = "sccessfully"
          temp.push(msg)
          resolve(res, temp, req.body.length, i);
        } else {
          msg = "Failed";
          temp.push(msg)

          resolve(res, temp, req.body.length, i);
        }
      }).catch((err) => {
        reject(err);
      })
  }

};

function resolve(res, data, size, i) {
  // res.send({message: "successfully!".r});
  // //console.log(("resolve",data);

  if (i == size - 1) {
    res.send({ data: data });
  }

}

function reject(r) {
  // //console.log(("reject",r)
}







exports.get_all_chemicals_details = async (req, res) => {
 // console.log("basic_details_id", req.body)
  // post_codedsdsds
  var averageDataRangedata = '';
  await Note.findOne({ "basic_details_id": req.body.basic_details_id }).select('averageDataRange -_id')
    .then(notes => {
  //    console.log("notes", notes.averageDataRange);

      averageDataRangedata = notes.averageDataRange;
      // arr.push(notes);
    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
  //  water safety data 
  var data_all = [];
  var Chlorine_value_before_filtering = '';
  var Chlorine = '';
  var TDS_min = '';
  var TDS_max = '';
  var tds_value = '';
  var dataSource = '';
  var Hardness = '';
  var hardness_f = '';
  await water_safety_datas.find({ "basic_details_id": req.body.basic_details_id })
    .then(notes => {
      //    console.log("notes === Array && Object.keys(notes).length === 0)",(notes === Array) , Object.keys(notes).length === 0)
      if (!(notes === Array && Object.keys(notes).length === 0)) {

        for (let i = 0; i < Object.keys(notes).length; i++) {
          console.log("notes[i]", notes[i].Substance);
          console.log("notes).length", Object.keys(notes).length)
          if (notes[i].Substance == 'Free Chlorine') {
            if (averageDataRangedata != true) {
              notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)
            }

            if (averageDataRangedata == true) {

              Chlorine_value_before_filtering = (notes[i].minimum + notes[i].maximum) / 2;
              if ((notes[i].minimum == 0 && notes[i].maximum == 0) || (isNaN(notes[i].minimum)) && (isNaN(notes[i].maximum))) {
                notes[i].Zone = 0
              }
              else {
                notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;

              }

            }
            else if (averageDataRangedata != true) {

              if (notes[i].Zone == null || isNaN(notes[i].Zone)) {
                notes[i].Zone = 0
                Chlorine_value_before_filtering = notes[i].Zone

              }
              else {
                Chlorine_value_before_filtering = notes[i].Zone;
              }
              //console.log("notes[i].Filtering",notes[i].Filtering)

              if (isNaN(notes[i].Filtering) || notes[i].Filtering == null) {
                notes[i].Filtering = 0
              }
            }
            let note;

            if ((notes[i].Max >= (notes[i].Zone != null)) && ((notes[i].Zone != null) >= notes[i].Recommended)) {
              note = "Normal"
              //console.log("Chlorine 1",note)

            }
            else if ((notes[i].Zone != null) < notes[i].Recommended) {

              note = "Below legal limit"
            }
            else if ((notes[i].Zone != null) > notes[i].Max) {
              note = "Above legal limit"
            }
            if (notes[i].Zone == null) {
              note = 'Normal'
              //console.log("Chlorine 2",note)

            }
            //console.log("note",note)

            Chlorine = Chlorine_value_before_filtering;

            data_all.push({ Substance: 'Chlorine', Before: notes[i].Zone, After: notes[i].Filtering, Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: notes[i].minimum, arange_max: notes[i].maximum, updatedAt: notes[i].updatedAt })
          }
        }
      }
    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    })
  //     general_datas


  await general_datas.find({ "basic_details_id": req.body.basic_details_id })
    .then(notes => {
      // console.log("notes[i].Zonenotes[i].Zonenotes[i].Zone",notes);
      if (!(notes === Array && Object.keys(notes).length === 0)) {
        //      console.log("ok")
        for (let i = 0; i < Object.keys(notes).length; i++) {
          //  console.log("0k1",i);
          //     console.log("notes[i]",notes[i])
          if (notes[i].Substance == 'pH') {
            if (!averageDataRangedata == true) {
              notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)
            }

            if (averageDataRangedata == true) {
              if (notes[i].minimum == 0 && notes[i].maximum == 0) {
                notes[i].Zone = 0;
              } else {
                notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;
                // //console.log()
              }
            }

            let note;
            if ((notes[i].Max >= (notes[i].Zone != null)) && ((notes[i].Zone != null) > notes[i].Recommended)) {
              //   console.log("true condition",notes[i].Max >= notes[i].Filtering >= notes[i].Recommended);
              note = "Normal"
            }
            else if ((notes[i].Zone != null) < notes[i].Recommended) {
              note = "Below legal limit"
            }
            else if ((notes[i].Zone != null) > notes[i].Max) {
              note = "Above legal limit"
            }
            if (notes[i].Zone == null) {
              note = 'Normal'
            }
            //  console.log("Before:notes[i].Zone",note)
            dataSource = data_all.push({ Substance: 'pH', Before: notes[i].Zone, After: notes[i].Filtering, Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: notes[i].minimum, arange_max: notes[i].maximum, updatedAt: notes[i].updatedAt })
          }

          if (notes[i].Substance == 'Microplastics') {

            if (!averageDataRangedata == true) {
              notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)
            }

            if (averageDataRangedata == true) {
            }
            //     console.log("notes[i].Filtering",notes[i].Filtering)
            data_all.push({ Substance: 'Microplastics', Before: notes[i].Zone, After: 'Z', Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: "Unregulated", arange_min: '', arange_max: '', updatedAt: notes[i].updatedAt })
          }

          if (notes[i].Substance == 'TDS') {
            TDS_min = notes[i].Recommended
            TDS_max = notes[i].Max
          }

          if (notes[i].Substance == 'Conductivity') {

            if (!(averageDataRangedata == true)) {
              console.log("notes[i]", notes[i].Filtering)
              notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2);

              tds_value = parseInt(notes[i].Filtering) * 0.55
              //  console.log("notes[i].Filtering TDS",parseInt(tds_value).toFixed(1))
              console.log("tdess", (tds_value).toFixed(1))
              // return false  
              notes[i].Filtering = (tds_value).toFixed(1)
              notes[i].Zone = (tds_value).toFixed(1)
            }

            if (averageDataRangedata == true) {
              if (notes[i].minimum == 0 && notes[i].maximum == 0) {
                notes[i].Zone = 0;
              } else {
                notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;
              }

            }

            let note;
            if (tds_value < 600) {
              note = "Good"
            }
            else if ((tds_value >= 600) && (tds_value <= 899)) {
              note = "Regular"
            }
            else if ((tds_value >= 900) && (tds_value <= 1199)) {
              note = "Poor"
            }
            if ((tds_value >= 1200)) {
              note = 'Above limit'
            }
            console.log("note", notes[i].Zone)
            dataSource = data_all.push({ Substance: 'TDS Minerals', Before: isNaN(notes[i].Zone) ? ' - ' : notes[i].Zone, After: isNaN(notes[i].Filtering) ? '-' : notes[i].Filtering, Unit: '', max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: notes[i].minimum, arange_max: notes[i].maximum, updatedAt: notes[i].updatedAt })
          }

          if (notes[i].Substance == 'Hardness') {
            if (averageDataRangedata == true) {
              notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;
              if (!(notes[i].minimum == null || isNaN(notes[i].minimum) || notes[i].maximum == null || isNaN(notes[i].maximum))) {
                Hardness = (notes[i].minimum + notes[i].maximum) / 22;
              }
            }

            if (averageDataRangedata != true) {
              //console.log("in1")                    
              if (!(notes[i].Zone == null || isNaN(notes[i].Zone))) {
                Hardness = notes[i].Zone;
                //console.log("true 1!!........................")

              }

            }

          }
          if (notes[i].Substance == "Hardness f") {
            hardness_f = notes[i].Zone
            if (averageDataRangedata != true) {
              if (Hardness == null || isNaN(Hardness) || Hardness == undefined) {
                //console.log("true 2!!!!!!!!!!!!!")
                Hardness = hardness_f * 10;
              }
            }
            if (averageDataRangedata == true) {
              if ((Hardness == null || isNaN(Hardness) || Hardness == undefined)) {
                Hardness = (notes[i].minimum + notes[i].maximum) / 22; //hardness f*10 =hardness
                //console.log(Hardness,"Hardness")

              }
            }

            if (((Chlorine >= 0.5 && Hardness > 200)) || ((Chlorine >= 0.5 && Hardness < 200)) || ((Chlorine <= 0.5 && Hardness > 200)) || (Chlorine >= 0.5 && Hardness == 0) || ((Chlorine == 0 && Hardness >= 200))) {
              before = 'Bad'

            }
            if (((0.4 <= Chlorine) && (Chlorine <= 0.5)) && ((100 <= Hardness) && (Hardness <= 200)) || ((0.4 <= Chlorine) && (Chlorine <= 0.5)) && ((0 == Hardness))) {
              before = 'Ok'
              //console.log(before)

            }
            if ((0.4 > Chlorine && Hardness <= 100) || (0.4 > Chlorine && (Hardness < 200 && Hardness > 100)) || (0.4 > Chlorine && Hardness == 0)) {
              before = 'Good'
              //console.log(before)

            }
            data_all.push({ Substance: 'Taste', Before: before, After: 'Good', Unit: '', max: notes[i].Max, min: notes[i].Recommended, note: "Unregulated", arange_min: '', arange_max: '', updatedAt: notes[i].updatedAt })

          }
          // Hardness                

        }

      }
      //    arr.push(notes);
    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    })

  //   mineral_datas
  await mineral_datas.find({ "basic_details_id": req.body.basic_details_id })
    .then(notes => {
      if (!(notes === Array && Object.keys(notes).length === 0)) {

        for (let i = 0; i < Object.keys(notes).length; i++) {
          console.log("ok1212", Object.keys(notes).length)
          if (notes[i].Substance == "Calcium") {
            console.log("notes[i].Substance",)
            notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)

            if (averageDataRangedata == true) {
              if (notes[i].minimum == null || isNaN(notes[i].minimum)) {
                notes[i].minimum = 0;
              }
              if (notes[i].maximum == null || isNaN(notes[i].maximum)) {
                notes[i].maximum = 0;
              }
              notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;

            }

            if (isNaN(notes[i].Zone) || notes[i].Zone == null) {
              notes[i].Zone = 'Low';
            }


            if (isNaN(notes[i].Filtering) || notes[i].Filtering == null) {

              notes[i].Filtering = 'Low';
              //console.log("notes[i].Filtering.........",notes[i].Filtering)

            }
            if (!(isNaN(notes[i].Filtering) || notes[i].Filtering == null)) {

              if (notes[i].Filtering > 180) {
                notes[i].Filtering = "Very high";
              }
              if (notes[i].Filtering <= 180 && notes[i].Filtering >= 121) {
                notes[i].Filtering = "High";
              }
              if (notes[i].Filtering <= 120 && notes[i].Filtering >= 61) {
                data_all[i].Filtering = "Medium";
              }
              if (notes[i].Filtering <= 60) {
                notes[i].Filtering = "Low";
              }
            }

            // let note;
            // if((results[3][i].Max >= results[3][i].Filtering)&&(results[3][i].Filtering > results[3][i].Recommended)) 
            // {
            //   note="Unregulated"
            // }      
            // else if(results[3][i].Filtering < results[3][i].Recommended){
            //   note="Unregulated"
            // }
            // else if(results[3][i].Filtering >results[3][i].Max){
            //   note="Unregulated"
            // }
            // if(results[3][i].Zone==null){
            //   note='Unregulated'
            // }
            //console.log("notesnotes[i].Zone",notes[i].Zone)
            data_all.push({ Substance: 'Limescale', Before: notes[i].Zone, After: notes[i].Filtering, Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: 'Unregulated', arange_min: notes[i].minimum, arange_max: notes[i].maximum, updatedAt: notes[i].updatedAt })
          }

        }

      }
      //    arr.push(notes);
    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    })
  // chemical_parameter_datas
  await chemical_parameter_datas.find({ "basic_details_id": req.body.basic_details_id })
    .then(notes => {

      if (!(notes === Array && Object.keys(notes).length === 0)) {
        // //console.log("notes",notes)
        for (let i = 0; i < Object.keys(notes).length; i++) {
          if (notes[i].Substance == 'Nitrates') {
            if (!averageDataRangedata == true) {
              notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)

            }

            if (averageDataRangedata == true) {
              notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;

            }
            else if (isNaN(notes[i].Filtering) || notes[i].Filtering == null) {
              notes[i].Filtering = 0
            }
            let note;
            if ((notes[i].Max >= (notes[i].Zone != null)) && ((notes[i].Zone != null) > notes[i].Recommended)) {
              note = "Below legal limit"
            }
            else if ((notes[i].Zone != null) < notes[i].Recommended) {
              note = "Below legal limit"
            }
            else if ((notes[i].Zone != null) > notes[i].Max) {
              note = "Above legal limit"
            }
            if (notes[i].Zone == null) {
              note = 'Below legal limit'
            }

            data_all.push({ Substance: 'Nitrates', Before: notes[i].Zone, After: notes[i].Filtering, Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: notes[i].minimum, arange_max: notes[i].maximum, updatedAt: notes[i].updatedAt })
          }

        }
      }
      //          arr.push(notes);

    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    })

  //   pathogen_datas
  await pathogen_datas.find({ "basic_details_id": req.body.basic_details_id })
    .then(notes => {

      if (!(notes === Array && Object.keys(notes).length === 0)) {

        var largest = 0;
        var smallest = 0;
        data_all.push({ Substance: 'Bacterias/virus', Before: "None reported", After: "None reported", Unit: "", max: largest, min: smallest, note: 'Below legal limit', arange_min: '', arange_max: 'None reported', updatedAt: notes[0].updatedAt })

      }
      //          arr.push(notes);

    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    })
  // metal_datas
  await metal_datas.find({ "basic_details_id": req.body.basic_details_id, "Priority": { $gte: "1" }, })
    .then(notes => {
      if (!(notes === Array && Object.keys(notes).length === 0)) {
        //  heavy metal   

        let subarray = [];
        let before = [];
        let before_value;
        let after;
        let min = []
        for (let i = 0; i < Object.keys(notes).length; i++) {

          if (notes[i].Substance == 'Lead' || notes[i].Substance == 'Manganese' || notes[i].Substance == 'Iron' || notes[i].Substance == 'Copper' || notes[i].Substance == 'Barium' || notes[i].Substance == 'Arsenic') {


            before_value = "Below limit";
            after = "Safe level";
          }

        }
        //    console.log("ddddddddddddddddddddddddddddddddd")
        var largest = 0;
        var smallest = 0;
        data_all.push({ Substance: 'Heavy Metals', Before: 'Detected', After: after, Unit: "", max: largest, min: smallest, note: 'Below legal limit', arange_min: '', arange_max: 'Safe level', updatedAt: notes[0].updatedAt })
      }


      // arr.push(notes);
    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
  //  console.log("all_data",data_all)

  let hold_array = [];
  //let   average;
  // res.send(arr)
  if (!(data_all[0] === Array && Object.keys(data_all[0]).length === 0) || !(data_all[1] === Array && Object.keys(data_all[1]).length === 0) || !(data_all[2] === Array && Object.keys(data_all[2]).length === 0) || !(data_all[3] === Array && Object.keys(data_all[3]).length === 0) || !(data_all[4] === Array && Object.keys(data_all[4]).length === 0) || !(data_all[5] === Array && Object.keys(data_all[5]).length === 0)) {
    // start its for limscale and Microplastics
    let temp = data_all[1];
    data_all[1] = data_all[3];
    data_all[3] = temp;

    //end 
    //start tast
    let repeat_value = data_all[0];
    data_all[0] = data_all[3]
    data_all[3] = data_all[2]
    data_all[2] = data_all[1]
    data_all[1] = repeat_value
    //end taste

    hold_array.data = data_all;
    //      console.log("jksdhsfffffffffffff",hold_array.data)
    // return false;
    for (let i = 0; i < data_all.length; i++) {
      if (data_all[i].Substance == 'Microplastics') {
        if (data_all[i].Before == null || data_all[i].Before == undefined || data_all[i].Before == '' || data_all[i].After == null || isNaN(data_all[i].After) || isNaN(data_all[i].Before)) {
          data_all[i].Before = "Unknown";
          data_all[i].After = '0';
          data_all[i].note = 'Unregulated';
          data_all[i].arange_max = "z";
          //console.log("this.data_all[i].After",this.data_all[i].After)
        }
      }

      if (data_all[i].Substance == 'Chlorine') {

        if (data_all[i].Before != undefined) {
          if (data_all[i].Before == '0') {
            Chlorine = parseFloat(data_all[i].Before);
          }


        }
        else if (data_all[i].Before == undefined || isNaN(data_all[i].Before)) {
          console.log('Chlorine 2', Chlorine)
          Chlorine = 0

        }

      }

      // start rule for limescale
      if (data_all[i].Substance == 'Limescale') {
        console.log("average", averageDataRangedata, data_all[i].arange_max)
        if (averageDataRangedata) {
          if (data_all[i].arange_max != null || data_all[i].arange_max != 0) {

            data_all[i].arange_max = parseFloat(data_all[i].arange_max) / 2;

            if (data_all[i].arange_max > 180) {

              data_all[i].arange_max = "Very high";
            }
            if (data_all[i].arange_max <= 180 && data_all[i].arange_max >= 121) {
              data_all[i].arange_max = "High";
            }
            if (data_all[i].arange_max <= 120 && data_all[i].arange_max >= 61) {
              data_all[i].arange_max = "Medium";
            }
            if (data_all[i].arange_max <= 60) {
              data_all[i].arange_max = "Low";
            }

            //console.log("here",data_all[i].arange_max)

          }

        }
        if (data_all[i].Before != null || data_all[i].After == null) {
          if (data_all[i].Before != null || !isNaN(data_all[i].Before)) {
            data_all[i].Before = parseFloat(data_all[i].Before);
            if (Hardness >= 330) {
              data_all[i].Before = "Very high";
            }
            if (Hardness <= 329 && Hardness >= 150) {
              data_all[i].Before = "High";
            }
            if (Hardness <= 149 && Hardness >= 80) {
              data_all[i].Before = "Medium";
            }
            if (Hardness <= 79) {
              data_all[i].Before = "Low";
            }
          }

          if (data_all[i].After != null || !isNaN(data_all[i].Before)) {

            data_all[i].After = "Low";
          }
        }

      }
    }
    return res.send({
      status: "true", data: data_all
    });
    console.log("all_data", data_all)
  } else {
    return res.send({
      status: "false", data: "not found"
    });
    console.log("no");
  }
  // console

}






// exports.get_all_chemicals_details = async (req, res) => {
//   console.log("basic_details_id", req.body)
//   // post_codedsdsds
//   var averageDataRangedata = '';
//   await Note.findOne({ "basic_details_id": req.body.basic_details_id }).select('averageDataRange -_id')
//     .then(notes => {
//       console.log("notes", notes.averageDataRange);

//       averageDataRangedata = notes.averageDataRange;
//       // arr.push(notes);
//     }).catch(err => {
//       return res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//       });
//     });
//   //  water safety data 
//   var data_all = [];
//   var Chlorine_value_before_filtering = '';
//   var Chlorine = '';
//   var TDS_min = '';
//   var TDS_max = '';
//   var tds_value = '';
//   var dataSource = '';
//   var Hardness = '';
//   var hardness_f = '';
//   await water_safety_datas.find({ "basic_details_id": req.body.basic_details_id })
//     .then(notes => {
//       //    console.log("notes === Array && Object.keys(notes).length === 0)",(notes === Array) , Object.keys(notes).length === 0)
//       if (!(notes === Array && Object.keys(notes).length === 0)) {

//         for (let i = 0; i < Object.keys(notes).length; i++) {
//           console.log("notes[i]", notes[i].Substance);
//           console.log("notes).length", Object.keys(notes).length)
//           if (notes[i].Substance == 'Free Chlorine') {
//             if (averageDataRangedata != true) {
//               notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)
//             }

//             if (averageDataRangedata == true) {

//               Chlorine_value_before_filtering = (notes[i].minimum + notes[i].maximum) / 2;
//               if ((notes[i].minimum == 0 && notes[i].maximum == 0) || (isNaN(notes[i].minimum)) && (isNaN(notes[i].maximum))) {
//                 notes[i].Zone = 0
//               }
//               else {
//                 notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;

//               }

//             }
//             else if (averageDataRangedata != true) {

//               if (notes[i].Zone == null || isNaN(notes[i].Zone)) {
//                 notes[i].Zone = 0
//                 Chlorine_value_before_filtering = notes[i].Zone

//               }
//               else {
//                 Chlorine_value_before_filtering = notes[i].Zone;
//               }
//               //console.log("notes[i].Filtering",notes[i].Filtering)

//               if (isNaN(notes[i].Filtering) || notes[i].Filtering == null) {
//                 notes[i].Filtering = 0
//               }
//             }
//             let note;

//             if ((notes[i].Max >= (notes[i].Zone != null)) && ((notes[i].Zone != null) >= notes[i].Recommended)) {
//               note = "Normal"
//               //console.log("Chlorine 1",note)

//             }
//             else if ((notes[i].Zone != null) < notes[i].Recommended) {

//               note = "Excellent"
//             }
//             else if ((notes[i].Zone != null) > notes[i].Max) {
//               note = "High"
//             }
//             if (notes[i].Zone == null) {
//               note = 'Normal'
//               //console.log("Chlorine 2",note)

//             }
//             //console.log("note",note)

//             Chlorine = Chlorine_value_before_filtering;

//             data_all.push({ Substance: 'Chlorine', Before: notes[i].Zone, After: notes[i].Filtering, Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: notes[i].minimum, arange_max: notes[i].maximum ,updatedAt: notes[i].updatedAt})
//           }
//         }
//       }
//     }).catch(err => {
//       return res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//       });
//     })
//   //     general_datas


//   await general_datas.find({ "basic_details_id": req.body.basic_details_id })
//     .then(notes => {
//       // console.log("notes[i].Zonenotes[i].Zonenotes[i].Zone",notes);
//       if (!(notes === Array && Object.keys(notes).length === 0)) {
//         //      console.log("ok")
//         for (let i = 0; i < Object.keys(notes).length; i++) {
//           //  console.log("0k1",i);
//           //     console.log("notes[i]",notes[i])
//           if (notes[i].Substance == 'pH') {
//             if (!averageDataRangedata == true) {
//               notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)
//             }

//             if (averageDataRangedata == true) {
//               if (notes[i].minimum == 0 && notes[i].maximum == 0) {
//                 notes[i].Zone = 0;
//               } else {
//                 notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;
//                 // //console.log()
//               }
//             }

//             let note;
//             if ((notes[i].Max >= (notes[i].Zone != null)) && ((notes[i].Zone != null) > notes[i].Recommended)) {
//               //   console.log("true condition",notes[i].Max >= notes[i].Filtering >= notes[i].Recommended);
//               note = "Normal"
//             }
//             else if ((notes[i].Zone != null) < notes[i].Recommended) {
//               note = "Below legal limit"
//             }
//             else if ((notes[i].Zone != null) > notes[i].Max) {
//               note = "Above legal limit"
//             }
//             if (notes[i].Zone == null) {
//               note = 'Normal'
//             }
//             //  console.log("Before:notes[i].Zone",note)
//             dataSource = data_all.push({ Substance: 'pH', Before: notes[i].Zone, After: notes[i].Filtering, Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: notes[i].minimum, arange_max: notes[i].maximum,updatedAt: notes[i].updatedAt})
//           }

//           if (notes[i].Substance == 'Microplastics') {

//             if (!averageDataRangedata == true) {
//               notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)
//             }

//             if (averageDataRangedata == true) {
//             }

//             let note;
//             if (notes[i].Zone == null || notes[i].Zone == '') {
//               note = "Not reported"
//             }
//             else if(notes[i].Zone > 0) {
//               note = "Dected"
//             }
//             else if (notes[i].Zone < 0) {
//               note = "Not detected - Excellent"
//             }
//            else {
//              note = "Not reported"
//            }

//             //     console.log("notes[i].Filtering",notes[i].Filtering)
//             data_all.push({ Substance: 'Microplastics', Before: notes[i].Zone, After: 'Z', Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: '', arange_max: '' ,updatedAt: notes[i].updatedAt })
//           }

//           if (notes[i].Substance == 'TDS') {
//             TDS_min = notes[i].Recommended
//             TDS_max = notes[i].Max
//           }

//           if (notes[i].Substance == 'Conductivity') {

//             if (!(averageDataRangedata == true)) {
//               console.log("notes[i]", notes[i].Filtering)
//               notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2);

//               tds_value = parseInt(notes[i].Filtering) * 0.55
//               //  console.log("notes[i].Filtering TDS",parseInt(tds_value).toFixed(1))
//               console.log("tdess", (tds_value).toFixed(1))
//               // return false  
//               notes[i].Filtering = (tds_value).toFixed(1)
//               notes[i].Zone = (tds_value).toFixed(1)
//             }

//             if (averageDataRangedata == true) {
//               if (notes[i].minimum == 0 && notes[i].maximum == 0) {
//                 notes[i].Zone = 0;
//               } else {
//                 notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;
//               }

//             }

//             let note;
//             if (tds_value < 600) {
//               note = "Excellent"
//             }
//             else if ((tds_value >= 600) && (tds_value <= 899)) {
//               note = "Normal"
//             }
//             else if ((tds_value >= 900) && (tds_value <= 1199)) {
//               note = "Low"
//             }
//             if ((tds_value >= 1200)) {
//               note = 'Low'
//             }
//             console.log("note", notes[i].Zone)
//             dataSource = data_all.push({ Substance: 'TDS Minerals', Before: isNaN(notes[i].Zone) ? ' - ' : notes[i].Zone, After: isNaN(notes[i].Filtering) ? '-' : notes[i].Filtering, Unit: '', max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: notes[i].minimum, arange_max: notes[i].maximum,updatedAt: notes[i].updatedAt })
//           }

//           if (notes[i].Substance == 'Hardness') {
//             if (averageDataRangedata == true) {
//               notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;
//               if (!(notes[i].minimum == null || isNaN(notes[i].minimum) || notes[i].maximum == null || isNaN(notes[i].maximum))) {
//                 Hardness = (notes[i].minimum + notes[i].maximum) / 22;
//               }
//             }

//             if (averageDataRangedata != true) {
//               //console.log("in1")                    
//               if (!(notes[i].Zone == null || isNaN(notes[i].Zone))) {
//                 Hardness = notes[i].Zone;
//                 //console.log("true 1!!........................")

//               }

//             }

//           }
//           if (notes[i].Substance == "Hardness f") {
//             hardness_f = notes[i].Zone
//             if (averageDataRangedata != true) {
//               if (Hardness == null || isNaN(Hardness) || Hardness == undefined) {
//                 //console.log("true 2!!!!!!!!!!!!!")
//                 Hardness = hardness_f * 10;
//               }
//             }
//             if (averageDataRangedata == true) {
//               if ((Hardness == null || isNaN(Hardness) || Hardness == undefined)) {
//                 Hardness = (notes[i].minimum + notes[i].maximum) / 22; //hardness f*10 =hardness
//                 //console.log(Hardness,"Hardness")

//               }
//             }

//             if (((Chlorine >= 0.5 && Hardness > 200)) || ((Chlorine >= 0.5 && Hardness < 200)) || ((Chlorine <= 0.5 && Hardness > 200)) || (Chlorine >= 0.5 && Hardness == 0) || ((Chlorine == 0 && Hardness >= 200))) {
//               before = 'Bad'

//             }
//             if (((0.4 <= Chlorine) && (Chlorine <= 0.5)) && ((100 <= Hardness) && (Hardness <= 200)) || ((0.4 <= Chlorine) && (Chlorine <= 0.5)) && ((0 == Hardness))) {
//               before = 'Ok'
//               //console.log(before)

//             }
//             if ((0.4 > Chlorine && Hardness <= 100) || (0.4 > Chlorine && (Hardness < 200 && Hardness > 100)) || (0.4 > Chlorine && Hardness == 0)) {
//               before = 'Good'
//               //console.log(before)

//             }
//             data_all.push({ Substance: 'Taste', Before: before, After: 'Good', Unit: '', max: notes[i].Max, min: notes[i].Recommended, note: before , arange_min: '', arange_max: '',updatedAt: notes[i].updatedAt })

//           }
//           // Hardness                

//         }

//       }
//       //    arr.push(notes);
//     }).catch(err => {
//       return res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//       });
//     })

//   //   mineral_datas
//   await mineral_datas.find({ "basic_details_id": req.body.basic_details_id })
//     .then(notes => {
//       if (!(notes === Array && Object.keys(notes).length === 0)) {

//         for (let i = 0; i < Object.keys(notes).length; i++) {
//           console.log("ok1212", Object.keys(notes).length)
//           if (notes[i].Substance == "Calcium") {
//             console.log("notes[i].Substance",)
//             notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)

//             if (averageDataRangedata == true) {
//               if (notes[i].minimum == null || isNaN(notes[i].minimum)) {
//                 notes[i].minimum = 0;
//               }
//               if (notes[i].maximum == null || isNaN(notes[i].maximum)) {
//                 notes[i].maximum = 0;
//               }
//               notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;

//             }

//             if (isNaN(notes[i].Zone) || notes[i].Zone == null) {
//               notes[i].Zone = 'Low';
//             }


//             if (isNaN(notes[i].Filtering) || notes[i].Filtering == null) {

//               notes[i].Filtering = 'Low';
//               //console.log("notes[i].Filtering.........",notes[i].Filtering)

//             }
//             if (!(isNaN(notes[i].Filtering) || notes[i].Filtering == null)) {

//               if (notes[i].Filtering > 180) {
//                 notes[i].Filtering = "Very high propensity";
//               }
//               if (notes[i].Filtering <= 180 && notes[i].Filtering >= 121) {
//                 notes[i].Filtering = "High propensity";
//               }
//               if (notes[i].Filtering <= 120 && notes[i].Filtering >= 61) {
//                 data_all[i].Filtering = "Medium propensity";
//               }
//               if (notes[i].Filtering <= 60) {
//                 notes[i].Filtering = "Low propensity";
//               }
//             }

//             // let note;
//             // if((results[3][i].Max >= results[3][i].Filtering)&&(results[3][i].Filtering > results[3][i].Recommended)) 
//             // {
//             //   note="Unregulated"
//             // }      
//             // else if(results[3][i].Filtering < results[3][i].Recommended){
//             //   note="Unregulated"
//             // }
//             // else if(results[3][i].Filtering >results[3][i].Max){
//             //   note="Unregulated"
//             // }
//             // if(results[3][i].Zone==null){
//             //   note='Unregulated'
//             // }
//             //console.log("notesnotes[i].Zone",notes[i].Zone)
//             data_all.push({ Substance: 'Limescale', Before: notes[i].Zone, After: notes[i].Filtering, Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: 'Unregulated', arange_min: notes[i].minimum, arange_max: notes[i].maximum, updatedAt: notes[i].updatedAt})
//           }

//         }

//       }
//       //    arr.push(notes);
//     }).catch(err => {
//       return res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//       });
//     })
//   // chemical_parameter_datas
//   await chemical_parameter_datas.find({ "basic_details_id": req.body.basic_details_id })
//     .then(notes => {

//       if (!(notes === Array && Object.keys(notes).length === 0)) {
//         // //console.log("notes",notes)
//         for (let i = 0; i < Object.keys(notes).length; i++) {
//           if (notes[i].Substance == 'Nitrates') {
//             if (!averageDataRangedata == true) {
//               notes[i].Filtering = parseFloat(notes[i].Filtering).toFixed(2)

//             }

//             if (averageDataRangedata == true) {
//               notes[i].Zone = notes[i].minimum + " - " + notes[i].maximum;

//             }
//             else if (isNaN(notes[i].Filtering) || notes[i].Filtering == null) {
//               notes[i].Filtering = 0
//             }
//             let note;
//             if ((notes[i].Max >= (notes[i].Zone != null)) && ((notes[i].Zone != null) > notes[i].Recommended)) {
//               note = "Below legal limit"
//             }
//             else if ((notes[i].Zone != null) < notes[i].Recommended) {
//               note = "Below legal limit"
//             }
//             else if ((notes[i].Zone != null) > notes[i].Max) {
//               note = "Above legal limit"
//             }
//             if (notes[i].Zone == null) {
//               note = 'Below legal limit'
//             }

//             data_all.push({ Substance: 'Nitrates', Before: notes[i].Zone, After: notes[i].Filtering, Unit: notes[i].Unit, max: notes[i].Max, min: notes[i].Recommended, note: note, arange_min: notes[i].minimum, arange_max: notes[i].maximum ,updatedAt: notes[i].updatedAt})
//           }

//         }
//       }
//       //          arr.push(notes);

//     }).catch(err => {
//       return res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//       });
//     })

//   //   pathogen_datas
//   await pathogen_datas.find({ "basic_details_id": req.body.basic_details_id })
//     .then(notes => {

//       if (!(notes === Array && Object.keys(notes).length === 0)) {

//         var largest = 0;
//         var smallest = 0;
//         data_all.push({ Substance: 'Pathogens', Before: "Not reported", After: "Reduced by 90% - Excellent", Unit: "", max: largest, min: smallest, note: 'Not reported', arange_min: '', arange_max: 'None reported',updatedAt: notes[0].updatedAt })

//       }
//       //          arr.push(notes);

//     }).catch(err => {
//       return res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//       });
//     })
//   // metal_datas
//   await metal_datas.find({ "basic_details_id": req.body.basic_details_id, "Priority": { $gte: "1" }, })
//     .then(notes => {
//       if (!(notes === Array && Object.keys(notes).length === 0)) {
//         //  heavy metal   

//         let subarray = [];
//         let before = [];
//         let before_value;
//         let after;
//         let min = []
//         for (let i = 0; i < Object.keys(notes).length; i++) {

//           if (notes[i].Substance == 'Lead' || notes[i].Substance == 'Manganese' || notes[i].Substance == 'Iron' || notes[i].Substance == 'Copper' || notes[i].Substance == 'Barium' || notes[i].Substance == 'Arsenic') {


//             before_value = "Below limit";
//             after = "Reduced by 90% - Excellent";
//           }

//         }
//     //    console.log("ddddddddddddddddddddddddddddddddd")
//         var largest = 0;
//         var smallest = 0;
//         data_all.push({ Substance: 'Heavy Metals', Before: 'Detected', After: after, Unit: "", max: largest, min: smallest, note: 'Detected', arange_min: '', arange_max: 'Safe level' ,updatedAt: notes[0].updatedAt})
//       }


//       // arr.push(notes);
//     }).catch(err => {
//       return res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//       });
//     });
//   //  console.log("all_data",data_all)

//   let hold_array = [];
//   //let   average;
//   // res.send(arr)
//   if (!(data_all[0] === Array && Object.keys(data_all[0]).length === 0) || !(data_all[1] === Array && Object.keys(data_all[1]).length === 0) || !(data_all[2] === Array && Object.keys(data_all[2]).length === 0) || !(data_all[3] === Array && Object.keys(data_all[3]).length === 0) || !(data_all[4] === Array && Object.keys(data_all[4]).length === 0) || !(data_all[5] === Array && Object.keys(data_all[5]).length === 0)) {
//     // start its for limscale and Microplastics
//     let temp = data_all[1];
//     data_all[1] = data_all[3];
//     data_all[3] = temp;

//     //end 
//     //start tast
//     let repeat_value = data_all[0];
//     data_all[0] = data_all[3]
//     data_all[3] = data_all[2]
//     data_all[2] = data_all[1]
//     data_all[1] = repeat_value
//     //end taste

//     hold_array.data = data_all;
//     //      console.log("jksdhsfffffffffffff",hold_array.data)
//     // return false;
//     for (let i = 0; i < data_all.length; i++) {
//       if (data_all[i].Substance == 'Microplastics') {
//         if (data_all[i].Before == null || data_all[i].Before == undefined || data_all[i].Before == '' || data_all[i].After == null || isNaN(data_all[i].After) || isNaN(data_all[i].Before)) {
//           data_all[i].Before = "Not reported";
//           data_all[i].After = '0';
//           data_all[i].note = 'Unregulated';
//           data_all[i].arange_max = "z";
//           //console.log("this.data_all[i].After",this.data_all[i].After)
//         }
//       }

//       if (data_all[i].Substance == 'Chlorine') {

//         if (data_all[i].Before != undefined) {
//           if (data_all[i].Before == '0') {
//             Chlorine = parseFloat(data_all[i].Before);
//           }


//         }
//         else if (data_all[i].Before == undefined || isNaN(data_all[i].Before)) {
//           console.log('Chlorine 2', Chlorine)
//           Chlorine = 0

//         }

//       }

//       // start rule for limescale
//       if (data_all[i].Substance == 'Limescale') {
//         console.log("average", averageDataRangedata, data_all[i].arange_max)
//         if (averageDataRangedata) {
//           if (data_all[i].arange_max != null || data_all[i].arange_max != 0) {

//             data_all[i].arange_max = parseFloat(data_all[i].arange_max) / 2;

//             if (data_all[i].arange_max > 180) {

//               data_all[i].arange_max = "Very high propensity";
//             }
//             if (data_all[i].arange_max <= 180 && data_all[i].arange_max >= 121) {
//               data_all[i].arange_max = "High propensity";
//             }
//             if (data_all[i].arange_max <= 120 && data_all[i].arange_max >= 61) {
//               data_all[i].arange_max = "Medium propensity";
//             }
//             if (data_all[i].arange_max <= 60) {
//               data_all[i].arange_max = "Low propensity";
//             }

//             //console.log("here",data_all[i].arange_max)

//           }

//         }
//         if (data_all[i].Before != null || data_all[i].After == null) {
//           if (data_all[i].Before != null || !isNaN(data_all[i].Before)) {
//             data_all[i].Before = parseFloat(data_all[i].Before);
//             if (Hardness >= 330) {
//               data_all[i].Before = "Very high propensity";
//             }
//             if (Hardness <= 329 && Hardness >= 150) {
//               data_all[i].Before = "High propensity";
//             }
//             if (Hardness <= 149 && Hardness >= 80) {
//               data_all[i].Before = "Medium propensity";
//             }
//             if (Hardness <= 79) {
//               data_all[i].Before = "Low propensity";
//             }
//           }

//           if (data_all[i].After != null || !isNaN(data_all[i].Before)) {

//             data_all[i].After = "Low propensity";
//           }
//         }

//       }
//     }
//     return res.send({
//       status: "true", data: data_all
//     });
//     console.log("all_data", data_all)
//   } else {
//     return res.send({
//       status: "false", data: "not found"
//     });
//     console.log("no");
//   }
//   // console

// }















// exports.get_data_using_findone = async (req, res) => {
//   //  console.log("req", req.body)
//   Note.find({
//     $or: [{ "city.random_post_code.Post_code_random": req.body.postcode },
//     { "city.post_from": req.body.postcode }, { "city.post_to": req.body.postcode }]
//   }).select("country city.city  -_id").distinct('country').then((data) => {
//     if (JSON.stringify(data.length) > 1) {
//       return res.send({
//         status: "multiple city with same postal code", postal_code: req.body.postcode, data: data
//       });
//     } else {
//       var arr = [];

//       var post_from = {
//         "city.post_from": req.body.postcode    // Checking may be enter post code it's start postcode range
//       }
//       var query = Note.findOne(post_from);
//       query.select('city.city description_local blog_local_country blog_english__country country province area drinkable description utlity_enter blog_english blog_local averageDataRange updatedAt');

//       // execute the query at a later time
//       query.exec(function (err, data_post_from) {
//         console.log("data_post_from", data_post_from);
//         if (data_post_from != null) {     //It's    
//           if (data_post_from['country'] == req.body.country) {
//             arr.push(data_post_from)
//             return res.send({
//               status: "true", data: arr, postcode: req.body.postcode
//             });
//           }
//           else if (data_post_from['country'] != req.body.country) {
//             // console.log("data_post_from",data_post_from.updatedAt)
//             arr.push(data_post_from)
//             return res.send({
//               status: "data found", data: arr, postcode: req.body.postcode
//             });
//           }
//         }
//         else
//           if (data_post_from == null) {
//             console.log("data_post_from", data_post_from);

//             var post_to = {
//               "city.post_to": req.body.postcode
//             }
//             var query = Note.findOne(post_to);
//             console.log("query", query);

//             query.select('city.city country blog_local_country blog_english__country description_local province area drinkable description utlity_enter blog_english blog_local averageDataRange updatedAt');
//             query.exec(function (err, data_post_to) {

//               console.log("data_post_to", data_post_to);
//               console.log("err", err)

//               if (data_post_to != null) {
//                 if (data_post_to['country'] == req.body.country) {
//                   arr.push(data_post_to)
//                   return res.send({
//                     status: "true", data: arr, postcode: req.body.postcode
//                   });
//                 }
//                 else if (data_post_to['country'] != req.body.country) {
//                   arr.push(data_post_to)
//                   return res.send({
//                     status: "data found", data: arr, postcode: req.body.postcode
//                   });
//                 }
//               }
//               else if (data_post_to == null) {
//                 var random_post_code = {
//                   "city.random_post_code.Post_code_random": req.body.postcode
//                 }
//                 var query = Note.findOne(random_post_code);

//                 query.select('city.city blog_local_country blog_english__country description_local country province area drinkable description utlity_enter blog_english blog_local averageDataRange updatedAt');
//                 query.exec(function (err, random_post_code) {

//                   if (random_post_code != null) {
//                     if (random_post_code['country'] == req.body.country) {
//                       arr.push(random_post_code)
//                       return res.send({
//                         status: "true", data: arr, postcode: req.body.postcode
//                       });
//                     }
//                     else if (random_post_code['country'] != req.body.country) {
//                       arr.push(random_post_code)
//                       return res.send({
//                         status: "data found", data: arr, postcode: req.body.postcode
//                       });
//                     }
//                   }
//                   else if (random_post_code == null) {
//                     Note.find().then(notes => {
//                       // //console.log(("4")
//                       //    console.log("notes",notes)
//                       let i = 0;
//                       for (i = 0; i < notes.length; i++) {
//                         for (let j = 0; j < notes[i].city.length; j++) {
//                           if (((parseFloat(notes[i].city[j].post_from) < parseFloat(req.body.postcode)) && parseFloat(notes[i].city[j].post_to) > parseFloat(req.body.postcode))) {
//                             notes[i].city[j] = {
//                               _id: notes[i]['_id'], country: notes[i]['country'], province: notes[i]['province'],
//                               description: notes[i]['description'],
//                               description_local: notes[i]['description_local'],
//                               utlity_enter: notes[i]['utlity_enter'], blog_english: notes[i]['blog_english'],
//                               blog_local_country: notes[i]['blog_local_country'], blog_english__country: notes[i]['blog_english__country'],
//                               blog_local: notes[i]['blog_local'], averageDataRange: notes[i]['averageDataRange'],
//                               area: notes[i]['area'], drinkable: notes[i]['drinkable'], city: [notes[i].city[j]]
//                             };
//                             console.log("print", notes[i].city[j])
//                             if (notes[i].city[j]['country'] == req.body.country) {

//                               return res.send({
//                                 status: "data found", data: [notes[i].city[j]], postcode: req.body.postcode
//                               });
//                             }
//                             else if (notes[i].city[j]['country'] != req.body.country) {
//                               //      arr.push()

//                               return res.send({
//                                 status: "data found", data: [notes[i].city[j]], postcode: req.body.postcode
//                               });
//                             }
//                           }
//                           if (((i == (notes.length - 1)) && (j == (notes[i].city.length - 1)) && (!((parseFloat(notes[i].city[j].post_from) < parseFloat(req.body.postcode)) && parseFloat(notes[i].city[j].post_to) > parseFloat(req.body.postcode))))) {
//                             var svalue = parseInt(req.body.postcode) - 10;
//                             var evalue = parseInt(req.body.postcode);
//                             var eevalue = evalue + 10;
//                             var arr = [];
//                             console.log("svale", svalue, eevalue)
//                             for (var x = svalue; x < eevalue; x++) {
//                               var value = 0;
//                               if (req.body.postcode.charAt(0) == 0) {
//                                 console.log("ok", req.body.postcode.charAt(0))
//                                 //  var y = x.toString();
//                                 //     console.log("klcjxcx",typeof(y))
//                                 var n = 0;
//                                 arr.push(`0${x}`);
//                               } else {
//                                 arr.push(x)
//                               }
//                             }
//                             console.log("arr", arr);
//                             Note.find({
//                               $or: [{ "city.random_post_code.Post_code_random": { $in: arr } },
//                               { "city.post_from": { $in: arr } }, { "city.post_to": { $in: arr } }]
//                             }).select("city.post_to city.post_from city.random_post_code.Post_code_random -_id").then((data) => {
//                               //   console.log("11111111111111", JSON.stringify(data))
//                               let arrayr = [];
//                               data.map(({ city }) => {
//                                 console.log("city", city);
//                                 if (city[0].post_to <= svalue || eevalue >= city[0].post_to) city[0].post_to ? arrayr.push(city[0].post_to) : '';
//                                 if (city[0].post_from <= svalue || eevalue >= city[0].post_from) city[0].post_from ? arrayr.push(city[0].post_from) : '';
//                                 if (city[0].random_post_code[0].Post_code_random <= svalue || eevalue > city[0].random_post_code[0].Post_code_random) city[0].random_post_code[0].Post_code_random ? arrayr.push(city[0].random_post_code[0].Post_code_random) : '';
//                               })
//                               if (arrayr.length > 0) {
//                                 console.log("arr", arrayr.length, arrayr);
//                                 res.send({
//                                   status: "near by postal code data list", data: [...new Set(arrayr)]
//                                 });
//                               } else {
//                                 res.send({
//                                   status: "data not found", postcode: req.body.postcode, data: "not found"
//                                 });
//                               }
//                             }).catch((err) => {
//                               console.log("err", err);
//                             })
//                             //    console.log(arrayr)


//                           }

//                         }

//                       }

//                     })


//                   }
//                 })

//               }
//             })
//           }

//       });

//     }
//   }).catch((err) => {
//     console.log("err", err);
//   })


// };
exports.get_data_using_findone = async (req, res) => {
  //  console.log("req", req.body)
    Note.find({
      $or: [{ "city.random_post_code.Post_code_random": req.body.postcode },
      { "city.post_from": req.body.postcode }, { "city.post_to": req.body.postcode }]
    }).select("country city.city  -_id").distinct('country').then((data) => {
      if (JSON.stringify(data.length) > 1) {
        res.send({
          status: "multiple city with same postal code", postal_code: req.body.postcode, data: data
        });
      } else {
        var arr=[];
  
        var post_from = {
          "city.post_from": req.body.postcode    // Checking may be enter post code it's start postcode range
        }
        var query = Note.findOne(post_from);
        query.select('city.city description_local blog_local_country blog_english__country country province area drinkable description utlity_enter blog_english blog_local averageDataRange updatedAt');
  
        // execute the query at a later time
        query.exec(function (err, data_post_from) {
                console.log("data_post_from",data_post_from);

          if (data_post_from != null) {     //It's    
            if (data_post_from['country'] == req.body.country) {
              arr.push(data_post_from)
              res.send({
                status: "true", data: arr, postcode: req.body.postcode
              });
            }
            else if (data_post_from['country'] != req.body.country) {
             // console.log("data_post_from",data_post_from.updatedAt)
              arr.push(data_post_from)
              res.send({
                status: "data found", data: arr, postcode: req.body.postcode
              });
            }
          }
          else
            if (data_post_from == null) {
              console.log("data_post_from", data_post_from);
  
              var post_to = {
                "city.post_to": req.body.postcode
              }
              var query = Note.findOne(post_to);
              console.log("query", query);
  
              query.select('city.city country blog_local_country blog_english__country description_local province area drinkable description utlity_enter blog_english blog_local averageDataRange updatedAt');
              query.exec(function (err, data_post_to) {
           
                console.log("data_post_to", data_post_to);
                console.log("err", err)
  
                if (data_post_to != null) {
                  if (data_post_to['country'] == req.body.country) {
                    arr.push(data_post_to)
                    res.send({
                      status: "true", data: arr, postcode: req.body.postcode
                    });
                  }
                  else if (data_post_to['country'] != req.body.country) {
                    arr.push(data_post_to)
                    res.send({
                      status: "data found", data: arr, postcode: req.body.postcode
                    });
                  }
                }
                else if (data_post_to == null) {
                  var random_post_code = {
                    "city.random_post_code.Post_code_random": req.body.postcode
                  }
                  var query = Note.findOne(random_post_code);
  
                  query.select('city.city blog_local_country blog_english__country description_local country province area drinkable description utlity_enter blog_english blog_local averageDataRange updatedAt');
                  query.exec(function (err, random_post_code) {
  
                    if (random_post_code != null) {
                      console.log("random_post_code",random_post_code)
                      if (random_post_code['country'] == req.body.country) {
                        arr.push(random_post_code)
                        res.send({
                          status: "true", data: arr, postcode: req.body.postcode
                        });
                      }
                      else if (random_post_code['country'] != req.body.country) {
                        arr.push(random_post_code)
                        res.send({
                          status: "data found", data: arr, postcode: req.body.postcode
                        });
                      }
                    }
                    else if (random_post_code == null) {
                      console.log("random_post_code",random_post_code);
                      Note.find().then(notes => {
                        // //console.log(("4")
                        let i = 0;
                        console.log("djhjdhjdhjdjdhnotes", notes);
                        for (i = 0; i < notes.length; i++) {
                          for (let j = 0; j < notes[i].city.length; j++) {
                            if (((parseFloat(notes[i].city[j].post_from) < parseFloat(req.body.postcode)) && parseFloat(notes[i].city[j].post_to) > parseFloat(req.body.postcode))) {
                              notes[i].city[j] = {
                                _id: notes[i]['_id'], country: notes[i]['country'], province: notes[i]['province'],
                                description: notes[i]['description'],
                                description_local: notes[i]['description_local'],
                                utlity_enter: notes[i]['utlity_enter'], blog_english: notes[i]['blog_english'],
                                blog_local_country: notes[i]['blog_local_country'], blog_english__country: notes[i]['blog_english__country'],
                                blog_local: notes[i]['blog_local'], averageDataRange: notes[i]['averageDataRange'],
                                area: notes[i]['area'], drinkable: notes[i]['drinkable'], city: [notes[i].city[j]]
                              };
                              // console.log("print",notes[i].city[j])


                              if (notes[i].city[j]['country'] == req.body.country) {
                                console.log("country")
                                res.send({
                                  status: "true", data: [notes[i].city[j]], postcode: req.body.postcode
                                });
                              }
                              else if (notes[i].city[j]['country'] != req.body.country) {
 
                                console.log("this is data found")
                                res.send({
                                  status: "data found", data: [notes[i].city[j]], postcode: req.body.postcode
                                });
                              }
                            }
                            if (((i == (notes.length - 1)) && (j == (notes[i].city.length - 1)) && (!((parseFloat(notes[i].city[j].post_from) < parseFloat(req.body.postcode)) && parseFloat(notes[i].city[j].post_to) > parseFloat(req.body.postcode))))) {
                              var svalue = parseInt(req.body.postcode) - 10;
                              var evalue = parseInt(req.body.postcode);
                              var eevalue = evalue + 10;
                              var arr = [];
                              console.log("svale", svalue, eevalue)
                              for (var x = svalue; x < eevalue; x++) {
                                var value = 0;
                                if (req.body.postcode.charAt(0) == 0) {
                                  console.log("ok", req.body.postcode.charAt(0))
                                  //  var y = x.toString();
                                  //     console.log("klcjxcx",typeof(y))
                                  var n = 0;
                                  arr.push(`0${x}`);
                                } else {
                                  arr.push(x)
                                }
                              }
                              console.log("arr", arr);
                              Note.find({
                                $or: [{ "city.random_post_code.Post_code_random": { $in: arr } },
                                { "city.post_from": { $in: arr } }, { "city.post_to": { $in: arr } }]
                              }).select("city.post_to city.post_from city.random_post_code.Post_code_random -_id").then((data) => {
                                console.log('datadjhdjhdjdh', data)
                             //   console.log("11111111111111", JSON.stringify(data))
                                let arrayr = [];
                                data.map(({ city }) => {
                                  console.log("city", city);
                                  if (city[0].post_to <= svalue || eevalue >= city[0].post_to) city[0].post_to ? arrayr.push(city[0].post_to) : '';
                                  if (city[0].post_from <= svalue || eevalue >= city[0].post_from) city[0].post_from ? arrayr.push(city[0].post_from) : '';
                                  if (city[0].random_post_code[0].Post_code_random <= svalue || eevalue > city[0].random_post_code[0].Post_code_random) city[0].random_post_code[0].Post_code_random ? arrayr.push(city[0].random_post_code[0].Post_code_random) : '';
                                })
                                if (arrayr.length > 0) {
                                  res.send({
                                     status: "near by postal code data list", postcode: req.body.postcode, data: [...new Set(arrayr)]
                                  });
                                } else {
                                  res.send({
                                    status: "data not found", postcode: req.body.postcode, data: "not found"
                                  });
                                }
                              }).catch((err) => {
                                console.log("err", err);
                              })
                              //    console.log(arrayr)
  
  
                            }
  
                          }
  
                        }
  
                      })
  
  
                    }
                  })
  
                }
              })
            }
  
        });
  
      }
    }).catch((err) => {
      console.log("err", err);
    })
  
  
  };


exports.get_data_using_findone_country_name = (req, res) => {
  console.log("req", req.body);
  Note.find({
    "country": req.body.country,
    $or: [{ "city.random_post_code.Post_code_random": req.body.postcode },
    { "city.post_from": req.body.postcode }, { "city.post_to": req.body.postcode }]
  }).limit(1).select('city.city description_local blog_local_country blog_english__country country province area drinkable description utlity_enter blog_english blog_local averageDataRange')
    .then(notes => {
      console.log("notes", notes, notes.length);
      if (notes.length > 0) {
        res.send({
          status: "data found", data: notes, postcode: req.body.postcode
        });
      } else {
        res.send({
          status: "data not found", postcode: req.body.postcode
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
  // exports.get_data_using_findone= (req, res) => { 
  //  console.log("dkjdkjd")
  //    var post_from = {           
  //                   "city.post_from":req.body.postcode    // Checking may be enter post code it's start postcode range
  //                 }

  //   var query = Note.findOne(post_from);
  //   query.select('city.city description_local blog_local_country blog_english__country country province area drinkable description utlity_enter blog_english blog_local averageDataRange').
  //   then((notes)=>{
  // console.log("notes",notes);
  //   }).catch((error)=>{
  //     console.log("error",error);
  //   });
  //   // execute the query at a later time
  //   query.exec(function (err, data_post_from) {    
  //     if(data_post_from!=null){     //It's    
  //       if(data_post_from['country']==req.body.country){
  //       res.send({
  //                   status:"true",data:data_post_from,postcode:req.body.postcode
  //               });
  //             }

  //         else if(data_post_from['country']!=req.body.country){
  //           res.send({
  //             status:"country not found", data:data_post_from,postcode:req.body.postcode
  //         });
  //         }  
  //   }
  //   else if(data_post_from==null){
  //    // console.log("data_post_from['country']",data_post_from['country']);

  //     var post_to = {           
  //       "city.post_to":req.body.postcode
  //       }
  //       var query = Note.findOne(post_to);
  //       query.select('city.city country blog_local_country blog_english__country description_local province area drinkable description utlity_enter blog_english blog_local averageDataRange');   
  //       query.exec(function (err, data_post_to) {
  //         if(data_post_to!=null){
  //           if(data_post_to['country']==req.body.country){                    
  //             res.send({
  //               status:"true",data:data_post_to,postcode:req.body.postcode
  //           });
  //         }
  //         else if(data_post_to['country']!=req.body.country){
  //           res.send({
  //             status:"country not found", data:data_post_to,postcode:req.body.postcode
  //         });
  //         }  

  //         }
  //         else if(data_post_to==null){
  //           var random_post_code = {           
  //               "city.random_post_code.Post_code_random":req.body.postcode
  //               }
  //           var query = Note.findOne(random_post_code);

  //                 query.select('city.city blog_local_country blog_english__country description_local country province area drinkable description utlity_enter blog_english blog_local averageDataRange');   
  //           query.exec(function (err, random_post_code) {

  //             if(random_post_code!=null){
  //            if(random_post_code['country']==req.body.country){                    

  //               res.send({
  //                   status:"true",data:random_post_code,postcode:req.body.postcode
  //               });
  //           }
  //           else if(random_post_code['country']!=req.body.country){                    
  //             res.send({
  //               status:"country not found", data:random_post_code,postcode:req.body.postcode
  //           });
  //           }  
  //             }
  //             else if(random_post_code==null){
  //               Note.find().then(notes => {
  //                 // //console.log(("4")

  //               let i=0;
  //               for(i=0;i<notes.length;i++){ 

  //               for(let j=0;j< notes[i].city.length;j++){
  //                       if(((parseFloat(notes[i].city[j].post_from) < parseFloat(req.body.postcode)) && parseFloat(notes[i].city[j].post_to) > parseFloat(req.body.postcode))){

  //                             notes[i].city[j]={_id:notes[i]['_id'],country:notes[i]['country'],province:notes[i]['province'],
  //                             description:notes[i]['description'],
  //                             description_local:notes[i]['description_local'],
  //                             utlity_enter:notes[i]['utlity_enter'],blog_english:notes[i]['blog_english'],
  //                             blog_local_country:notes[i]['blog_local_country'], blog_english__country:notes[i]['blog_english__country'],
  //                             blog_local:notes[i]['blog_local'],averageDataRange:notes[i]['averageDataRange'],
  //                             area:notes[i]['area'], drinkable:notes[i]['drinkable'],city:[notes[i].city[j]]};                    

  //                              if(notes[i].city[j]['country']==req.body.country){                    

  //                                 res.send({
  //                                     status:"true",data:notes[i].city[j],postcode:req.body.postcode
  //                                 });
  //                               } 
  //                              else if(notes[i].city[j]['country']!=req.body.country){       

  //                                 res.send({
  //                                   status:"country not found", data:notes[i].city[j],postcode:req.body.postcode
  //                               });
  //                               }          

  //                           }
  //                         if(((i==(notes.length-1)) && (j==(notes[i].city.length-1)) && (!((parseFloat(notes[i].city[j].post_from) < parseFloat(req.body.postcode)) && parseFloat(notes[i].city[j].post_to) > parseFloat(req.body.postcode))))){

  //                           res.send({
  //                                         status:"false",data:"not found"
  //                               });
  //                         }

  //                 }

  //               } 

  //               })


  //             }
  //           })
  //         }
  //       }) 
  //   }

  //   });

  //  };

};

// const      cio = new TrackClient('123', 'abc', {
//   timeout: 5000
// });
// cio.identify(1, {
//   email: 'monika.mindcrew1@gmail.com',
//   created_at: 1361205308,
//   first_name: 'Bob',
//   plan: 'basic'
// });
exports.homeData = function (req, res) {

  console.log("homeData api")
  var post_from = {
    "city.post_from": req.body.postcode // Checking may be enter post code it's start postcode range
  }
  var query = Note.findOne(post_from);// for finding data using start postcode  

  query.exec(function (err, data_post_from) {

    if (data_post_from != null) {//If start postcode condition have data then it's works 
      if (data_post_from['country'] == req.body.country) {  // Check condition start postcode have same country 
        console.log(data_post_from._id)
        homeData_general(data_post_from._id, res); //calling for if country and start postcode match then applying substence condition 
      }
      else if (data_post_from['country'] != req.body.country) { // Check condition start postcode have no same country 
        res.send({
          status: "false", data: "Post code not found"
        });
      }
    }
    else if (data_post_from == null) { //If start postcode condition have no data then it's works
      var post_to = {
        "city.post_to": req.body.postcode  // Here chacking may be enter post code it's end postcode range
      }
      var query = Note.findOne(post_to);
      query.exec(function (err, data_post_to) {
        if (data_post_to != null) {  //If end postcode condition have data then it's works 
          if (data_post_to['country'] == req.body.country) {  // Check condition end postcode have same country
            homeData_general(data_post_to._id, res);  //calling for if country and end postcode match then applying substence condition 
          }
          else if (data_post_to['country'] != req.body.country) { // Check condition end postcode have no same country 
            res.send({
              status: "false", data: "Post code not found"
            });
          }
        }
        else if (data_post_to == null) { //If end postcode condition have no data then it's works
          var random_post_code = {
            "city.random_post_code.Post_code_random": req.body.postcode   // Here chacking may be enter post code it's random postcode or different postcode or without range
          }
          var query = Note.findOne(random_post_code);  //select data using different postcode
          query.select('city.$.city blog_local_country blog_english__country description_local country province area drinkable description utlity_enter blog_english blog_local averageDataRange');   //here Apply projection condition

          query.exec(function (err, random_post_code) {
            if (random_post_code != null) { //If different postcode condition have data then it's works
              if (random_post_code['country'] == req.body.country) {    // Check condition different postcode have same country                                
                homeData_general(random_post_code._id, res);  //calling for if country and different postcode match then applying substence condition                                   
              }
              else if (random_post_code['country'] != req.body.country) { // Check condition different postcode have no same country                    
                res.send({
                  status: "false", data: "Post code not found"
                });
              }
            }
            else if (random_post_code == null) { //If different postcode condition have no data then it's works
              Note.find({}, 'city country').then(notes => { // here select all data with city and country for finding where the postcode if the postcode exist in postcode range (between start and end postcode) 


                asyncLoop(notes, function (item, next) //Here all data with city and country ,and here match postcode using city ,each city have different different postcode range,we have tring to match postcode between a cities postcode range.  
                {
                  let city_all_data = JSON.parse(JSON.stringify(item)).city // Here we have found different cities data with it's postcode or postcode range
                  asyncLoop(city_all_data, function (subitem, sub_next) //inside values
                  {
                    if (((parseFloat(subitem.post_from) < parseFloat(req.body.postcode))
                      && parseFloat(subitem.post_to) > parseFloat(req.body.postcode))) {  //if postcode between postcode range then it's works 
                      subitem = {
                        _id: item['_id'],
                        country: item['country']
                      };

                      if (subitem['country'] == req.body.country) {
                        homeData_general(subitem._id, res);   //calling for if country and postcode match then applying substence condition                 
                      }
                      else if (subitem['country'] != req.body.country) {
                        res.send({
                          status: "country not found",
                          data: subitem,
                          postcode: req.body.postcode
                        });
                      }

                    }

                    sub_next();
                  }, function () {
                    // console.log('Finished2!');
                  });
                  next();
                }, function () {
                  // console.log('Finished1!');
                });

              })
            }
          })
        }
      })
    }

  });

};


exports.data_all_tables = (req, res) => {
  let all_data = [];
  let table_name_withdata = {};
  var basic_details_id = req.body.basic_details_id;
  var all = water_safety_datas.aggregate([

    {
      $lookup:
      {
        from: "water_safetys",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;
      // //console.log(("locations",locations.length);
      if (locations.length == 0) {
        locations.push({ Substance: "Free Chlorine" }, { Substance: "Free Chlorine" }, { Substance: "Chloramine" })
      }

      all_data.push({ table: 'Water safetys', data: locations });
      general_table_data(all_data, res, basic_details_id, table_name_withdata);
      // return false;

    });

};

function general_table_data(all_data, res, basic_details_id, table_name_withdata) {
  var all = general_datas.aggregate([

    {
      $lookup:
      {
        from: "generals",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;

      if (locations.length == 0) {
        locations.push({ Substance: "Hardness" }, { Substance: "Hardness f" }, { Substance: "pH" }, { Substance: "Temperature" }, { Substance: "Turbidity" }, { Substance: "Microplastics" }, { Substance: "Conductivity" }, { Substance: "Bicarbonate" }, { Substance: "Color" }, { Substance: "Alkalinity" }, { Substance: "Odor" }, { Substance: "Oxidation" }, { Substance: "TDS" }, { Substance: "LSI" },

        )
      }

      all_data.push({ table: 'Generals', data: locations });

      //  table_name_withdata.push([{table:'Generals',data:locations}])

      pathogen_table_data(all_data, res, basic_details_id, table_name_withdata);
    });

}


function pathogen_table_data(all_data, res, basic_details_id, table_name_withdata) {
  var all = pathogen_datas.aggregate([

    {
      $lookup:
      {
        from: "pathogens",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;

      if (locations.length == 0) {
        locations.push({ Substance: "Clostridium" }, { Substance: "eColi" }, { Substance: "Enterococcus" }, { Substance: "Microbial Cysts" }, { Substance: "Bacterias" },

        )
      }
      all_data.push({ table: 'Pathogens', data: locations });
      //  table_name_withdata.push([{table:'Pathogens',data:locations}])

      chemical_parameter_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });

}

function chemical_parameter_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  var all = chemical_parameter_datas.aggregate([

    {
      $lookup:
      {
        from: "chemical_parameters",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;
      if (locations.length == 0) {
        locations.push({ Substance: "Cyanide total" }, { Substance: "Mercury" }, { Substance: "Nitrites" }, { Substance: "Nitrates" }, { Substance: "Fluoride" },
        )
      }
      all_data.push({ table: 'Chemical parameters', data: locations });
      //  table_name_withdata.push([{table:'Chemical parameters',data:locations}])
      mineral_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });


}



function mineral_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  var all = mineral_datas.aggregate([

    {
      $lookup:
      {
        from: "minerals",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;

      if (locations.length == 0) {
        locations.push({ Substance: "Magnesium" }, { Substance: "Potassium" }, { Substance: "Chloride" }, { Substance: "Calcium" },
        )
      }
      all_data.push({ table: 'Minerals', data: locations });
      //  table_name_withdata.push([{table:'Minerals',data:locations}])
      metal_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });


}



function metal_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {
  var all = metal_datas.aggregate([

    {
      $lookup:
      {
        from: "metals",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;


      if (locations.length == 0) {
        locations.push({ Substance: "Aluminium" }, { Substance: "Chromium" }, { Substance: "Nickel" }, { Substance: "Antimony" },
          { Substance: "Copper" }, { Substance: "Selenium" }, { Substance: "Arsenic" }, { Substance: "Lead" },
          { Substance: "Zinc" }, { Substance: "Barium" }, { Substance: "Iron" }, { Substance: "Sodium" }, { Substance: "Cadmium" }, { Substance: "Manganese" }
        )
      }
      all_data.push({ table: 'Metals', data: locations });
      chlorine_bi_product_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });


}




function chlorine_bi_product_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  // console.log("data_all_tables_basic_id",basic_details_id)
  // return false;
  var all = chlorine_bi_product_datas.aggregate([

    {
      $lookup:
      {
        from: "chlorine_bi_products",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;

      if (locations.length == 0) {
        locations.push({ Substance: "Tetrachloroethylene" }, { Substance: "Trichloroethylene" }, { Substance: "Dichloromethane" }, { Substance: "Total Trichloroethylene" }, { Substance: "Total Trihalomethanes" }
        )
      }
      all_data.push({ table: 'Chlorine bi product', data: locations });
      //  table_name_withdata.push([{table:'Chlorine bi product',data:locations}])
      haa_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });


}



function haa_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  var all = haa_datas.aggregate([

    {
      $lookup:
      {
        from: "haas",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;
      if (locations.length == 0) {
        locations.push({ Substance: "Total haloacetic acids" },
        )
      }
      all_data.push({ table: 'Haas', data: locations });
      //  table_name_withdata.push([{table:'Haas',data:locations}])
      pesticide_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });


}


function pesticide_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  var all = pesticide_datas.aggregate([

    {
      $lookup:
      {
        from: "pesticides",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;

      if (locations.length == 0) {
        locations.push({ Substance: "Chlordane" }, { Substance: "Heptachlor" }, { Substance: "Lindane" }, { Substance: "Total pesticides" }
        )
      }
      all_data.push({ table: 'Pesticides', data: locations });
      //  table_name_withdata.push([{table:'Pesticides',data:locations}])
      herbicide_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });


}



function herbicide_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  var all = herbicide_datas.aggregate([

    {
      $lookup:
      {
        from: "herbicides",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;

      if (locations.length == 0) {
        locations.push({ Substance: "D 2 4" }, { Substance: "Atrazine" }, { Substance: "Total Herbicides" }
        )
      }
      all_data.push({ table: 'Herbicides', data: locations });
      //  table_name_withdata.push([{table:'Herbicides',data:locations}])
      perfluorinated_chemical_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });


}


function perfluorinated_chemical_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  var all = perfluorinated_chemical_datas.aggregate([

    {
      $lookup:
      {
        from: "perfluorinated_chemicals",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;
      if (locations.length == 0) {
        locations.push({ Substance: "PFNA" }, { Substance: "PFOA" }, { Substance: "PFOS" }
        )
      }
      all_data.push({ table: 'Perfluorinated chemicals', data: locations });
      //  table_name_withdata.push([{table:'Perfluorinated chemicals',data:locations}])

      other_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });


}

function other_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  var all = other_datas.aggregate([

    {
      $lookup:
      {
        from: "others",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;
      if (locations.length == 0) {
        locations.push({ Substance: "Ammonia" }, { Substance: "Silver" }, { Substance: "Asbestos" }, { Substance: "Sulfate" }, { Substance: "Perchlorate" }, { Substance: "Polonium" }, { Substance: "Uranium" }, { Substance: "Radium" }
        )
      }
      all_data.push({ table: 'other', data: locations });
      //  table_name_withdata.push([{table:'other',data:locations}])
      pharmaceutical_datas_table_data(all_data, res, basic_details_id);
    });


}




function pharmaceutical_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {

  var all = pharmaceutical_datas.aggregate([

    {
      $lookup:
      {
        from: "pharmaceuticals",
        localField: "update_id",
        foreignField: "Default_id",
        as: "default"
      }
    },
    { $match: { "basic_details_id": basic_details_id } }]).exec((err, locations) => {
      if (err) throw err;

      if (locations.length == 0) {
        locations.push({ Substance: "Estrone" }, { Substance: "Meprobamat" }, { Substance: "Atenolol" }, { Substance: "Trimethoprim" }, { Substance: "Carbamazepine" }
        )
      }
      all_data.push({ table: 'Pharmaceuticals', data: locations });
      alll_datas_table_data(all_data, res, basic_details_id, table_name_withdata);
    });

}
function alll_datas_table_data(all_data, res, basic_details_id, table_name_withdata) {
  res.send(all_data);
}




exports.export_all_data = (req, res) => {

  let query = { "_id": mongoose.Types.ObjectId(req.body.id) }

  Note.aggregate([

    {
      $lookup: {
        from: "general_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "general_datas"
      }
    },
    {
      $lookup: {
        from: "chemical_parameter_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "chemical_parameter"
      }
    },

    {
      $lookup: {
        from: "chlorine_bi_product_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "chlorine_bi_product_datas"
      }
    },
    {
      $lookup: {
        from: "haa_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "haa_datas"
      }
    },
    {
      $lookup: {
        from: "herbicide_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "herbicide_datas"
      }
    },
    {
      $lookup: {
        from: "metal_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "metal_datas"
      }
    },
    {
      $lookup: {
        from: "mineral_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "mineral_datas"
      }
    },
    {
      $lookup: {
        from: "other_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "other_datas"
      }
    },
    {
      $lookup: {
        from: "pathogen_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "pathogen_datas"
      }
    },
    {
      $lookup: {
        from: "perfluorinated_chemical_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "perfluorinated_chemical_datas"
      }
    },
    {
      $lookup: {
        from: "pesticide_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "pesticide_datas"
      }
    },
    {
      $lookup: {
        from: "pharmaceutical_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "pharmaceutical_datas"
      }
    },
    {
      $lookup: {
        from: "water_safetys_datas",
        localField: "basic_details_id",
        foreignField: "basic_details_id",
        as: "water_safetys_datas"
      }
    },
    // {
    //     $match:query

    // }
  ])
    .exec((err, data) => {

      if (err) throw err;
      // console.log(data);
      let array_res = [];

      for (let i = 0; i < data.length; i++) {
        let gen = [];
        let ypromise = new Promise((resolve, reject) => {
          gen = (data[i]['chemical_parameter']).concat(data[i]['general_datas']).concat(data[i]['chlorine_bi_product_datas']).concat(data[i]['haa_datas']).concat(data[i]['herbicide_datas']).concat(data[i]['metal_datas']).concat(data[i]['mineral_datas']).concat(data[i]['other_datas']).concat(data[i]['pathogen_datas']).concat(data[i]['perfluorinated_chemical_datas']).concat(data[i]['pesticide_datas']).concat(data[i]['pharmaceutical_datas']).concat(data[i]['water_safetys_datas']);

          // setTimeout( function() {
          resolve(gen)
          // }, 2000) 

        });

        ypromise.then((successMessage) => {
          let city_name = [];
          let postcode = [];
          for (let j = 0; j < data[i]['city'].length; j++) {
            city_name.push(data[i]['city'][j].city)
            postcode.push(data[i]['city'][j].post_from + ' - ' + data[i]['city'][j].post_to)

            for (g = 0; g < successMessage.length; g++) {
              if (data[i]['averageDataRange'] == true) {
                Before_filtering = (successMessage[g].minimum != null ? successMessage[g].minimum : '') + ' - ' + (successMessage[g].maximum != null ? successMessage[g].minimum : "")
              }
              else if (data[i]['averageDataRange'] == null) {
                Before_filtering = successMessage[g].Zone
              }

              if (j == (data[i]['city'].length - 1)) {
                array_res.push({ 'Country': data[i].country, 'Province': data[i].province, 'Area': data[i].area, 'Postcode Range': data[i].city[0].post_from + ' - ' + data[i].city[0].post_to, 'Utlity': data[i].utlity_enter, 'Drinkable': data[i].drinkable, 'City': data[i].city.city, 'Multicity': city_name.toString(), 'Multicity Postcode': postcode.toString(), 'Substance': successMessage[g].Substance, 'Filtering': successMessage[g].Filtering, 'Before Filtering': Before_filtering, 'Priority': successMessage[g].Priority, 'Limit-Range': successMessage[g].Recommended + ' - ' + successMessage[g].Max, "Unit": successMessage[g].Unit })


                if (i == (data.length - 1) && g == (successMessage.length - 1)) {
                  res.send(array_res)
                }
              }
            }
          }
        });


      }


    });

};



