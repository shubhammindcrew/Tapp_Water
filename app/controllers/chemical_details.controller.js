const chemical_details = require('../models/chemicals_details.js');
const basic_details = require('../models/note.model.js')
var mongoose = require('mongoose');



exports.get_chemical_details = (req, res) => {
    console.log({"chm_basic_details_id":req.body.basic_details_id,"chm_substance":req.body.substance})
      chemical_details.find({"chm_basic_details_id":req.body.basic_details_id,"chm_substance":req.body.substance})
    .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
    };

exports.chemical_details_insert = async (req, res) => {

    const { basic_details_id, substance, without_filter, with_filter, data } = req.body;



    const user = await basic_details.findOne({ _id: basic_details_id });

    if (!user || user === undefined) {
        return res.json({
            status: false,
            message: "user not exist"

        })
    }

    // const userVerify = await chemical_details.find({
    //     $and: [
    //         { 'chm_basic_details_id': basic_details_id },
    //         { 'chm_substance': substance }
    //     ]
    // })

    // if (userVerify) {
    //     return res.json({
    //         status: false,
    //         message: " not exist"

    //     })
    // }

    let object = {
        chm_basic_details_id: basic_details_id,
        chm_substance: substance,
        chm_without_filter: without_filter,
        chm_with_filter: with_filter,
        chm_data: data
    },
    query = {
        chm_basic_details_id: basic_details_id,
        chm_substance: substance,
    }


    

    chemical_details.findOneAndUpdate(query,object,{upsert:true,new:true })
        .then((ressult) => {
            res.json(
                {
                    status: true,
                    message: "Data inserted successfully.",
                    data: ressult
                }
            )
        }).catch((err) => {
            res.json({ status: false, message: 'Something went wrong.', orignalError: err })
        })


}
