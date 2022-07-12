
const mongoose = require('mongoose');

const chemical_details = mongoose.Schema({
    chm_basic_details_id: String,
    chm_substance: String,
    chm_without_filter: String,
    chm_with_filter: String,
    chm_data: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('chemical_details', chemical_details);