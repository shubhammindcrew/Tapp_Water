module.exports = (app) => {
    const chemical_data = require('../controllers/chemical_details.controller')
    const notes = require('../controllers/note.controller.js');
    const admin = require('../controllers/admin.controller.js');
    const water_safety = require('../controllers/water_safety.controller.js');
    const general = require('../controllers/general.controller.js');
    const pathogens = require('../controllers/pathogens.controller.js');
    const chemical_parameter = require('../controllers/chemical_parameter.controller.js');
    const minerals = require('../controllers/minerals.controller.js');
    const metals = require('../controllers/metals.controller.js');
    const Chlorine_bi_products = require('../controllers/Chlorine_bi_products.controller.js');
    const HAAs = require('../controllers/HAAs.controller.js');
    const Pesticides = require('../controllers/Pesticides.controller.js');
    const Herbicides = require('../controllers/Herbicides.controller.js');
    const Perfluorinated_chemicals_ = require('../controllers/Perfluorinated_chemicals_.controller.js');
    const other = require('../controllers/other.controller.js');
    const Pharmaceuticals = require('../controllers/Pharmaceuticals.controller.js');

    const water_safety_datas = require('../controllers/water_safety_datas.controller.js');
    const general_datas = require('../controllers/general_datas.controller.js');
    const pathogens_datas = require('../controllers/pathogens_datas.controller.js');
    const chemical_parameter_datas = require('../controllers/chemical_parameter_datas.controller.js');
    const minerals_datas = require('../controllers/minerals_datas.controller.js');
    const metals_datas = require('../controllers/metals_datas.controller.js');
    const Chlorine_bi_products_datas = require('../controllers/Chlorine_bi_products_datas.controller.js');
    const HAAs_datas = require('../controllers/HAAs_datas.controller.js');
    const Pesticides_datas = require('../controllers/Pesticides_datas.controller.js');
    const Herbicides_datas = require('../controllers/Herbicides_datas.controller.js');
    const Perfluorinated_chemicals_datas = require('../controllers/Perfluorinated_chemicals_datas.controller.js');
    const other_datas = require('../controllers/other_datas.controller.js');
    const Pharmaceuticals_datas = require('../controllers/Pharmaceuticals_datas.controller.js');
    const common = require('../controllers/common.controller.js');
    // const tappState = require('../controllers/tappSate.controller.js');




    //frontend apis

    // Retrieve a single Note with noteId
    app.post('/get_chemical_details', chemical_data.get_chemical_details);
    app.post('/chemical_details_insert', chemical_data.chemical_details_insert);

    app.post('/export_all_data', notes.export_all_data);
    app.post('/post_code', notes.get_data_using_findone);
    app.post('/post_code_country_name', notes.get_data_using_findone_country_name);
    app.post('/data_all_tables', notes.data_all_tables);
    app.get('/getdata_email', admin.fetch_data);   //
    app.post('/delete_email', admin.delete);    //
    app.post('/insert_customers', admin.insert);   //
    app.post('/send_email', notes.Send_emails)



    //for admin apis
    app.post('/admin_details', admin.findOne);   //
    app.post('/description', common.update_many);
    app.post('/find_description', common.findAll); //
    app.post('/details_description', common.create); //
    app.get('/all_country', common.country); //
    app.get('/all_country_custom', common.country_custom);

    // Create a new Note
    app.post('/insert', notes.create);  //

    // Retrieve all Notes
    app.get('/select', notes.findAll); //

    // Retrieve a single Note with noteId
    app.post('/select_details', notes.findOne);
    app.post('/city_front_end', notes.findOne_city_front_end);
    //admin

    // Update a Note with noteId
    app.post('/update_basic_details', notes.update);

    // Delete a Note with noteId

    app.post('/delete', notes.delete); //

    // chemicals details api's
    app.post('/get_all_chemicals_details', notes.get_all_chemicals_details);


    //water safety
    app.post('/insert_many', water_safety.create);

    app.post('/update_water_safety', water_safety.update_many);
    app.post('/update_water_safety_many_all', water_safety.update_many_all);
    // update_many_all
    app.post('/insert_water_safety', water_safety.create);
    // 

    app.post('/change_value_fetch', water_safety.findAll);
    app.post('/water_safety_datas', water_safety_datas.create);
    app.post('/water_safety_edit', water_safety_datas.update_many);
    app.post('/water_safety_update', water_safety_datas.update_many_collections);
    app.post('/water_safety_view', water_safety_datas.findOne);
    app.post('/water_safety_view_priority', water_safety_datas.findOne_priority);
    // findOne_priority


    //general
    app.post('/change_value_fetch_general', general.findAll); //
    app.post('/update_general', general.update_many); //
    app.post('/update_general_many_all', general.update_many_all);
    app.post('/insert_general', general.create); // 
    app.post('/general_datas', general_datas.create);
    app.post('/general_data_edit', general_datas.update_many);
    app.post('/general_data_view', general_datas.findOne);
    app.post('/general_data_view_priority', general_datas.findOne_priority);



    //pathogens

    app.post('/change_value_fetch_pathogens', pathogens.findAll);
    app.post('/update_pathogens', pathogens.update_many);
    app.post('/update_pathogens_many_all', pathogens.update_many_all);
    app.post('/insert_pathogens', pathogens.create);
    app.post('/pathogens_datas', pathogens_datas.create);
    app.post('/pathogens_data_edit', pathogens_datas.update_many);
    app.post('/pathogens_data_view', pathogens_datas.findOne);
    app.post('/pathogens_data_view_priority', pathogens_datas.findOne_priority);


    //minerals

    app.post('/change_value_fetch_minerals', minerals.findAll);
    app.post('/update_minerals', minerals.update_many);
    app.post('/update_minerals_many_all', minerals.update_many_all);
    app.post('/insert_minerals', minerals.create);
    app.post('/minerals_datas', minerals_datas.create);
    app.post('/minerals_data_edit', minerals_datas.update_many);
    app.post('/minerals_data_view', minerals_datas.findOne);
    app.post('/minerals_data_view_priority', minerals_datas.findOne_priority);



    //metals
    app.post('/change_value_fetch_metals', metals.findAll);
    app.post('/update_metals', metals.update_many);
    app.post('/update_metals_many_all', metals.update_many_all);
    app.post('/insert_metals', metals.create);
    app.post('/metals_datas', metals_datas.create);
    app.post('/metals_data_edit', metals_datas.update_many);
    app.post('/metals_data_view', metals_datas.findOne);
    app.post('/metals_data_view_priority', metals_datas.findOne_priority);



    //Chlorine_bi_products
    app.post('/change_value_fetch_Chlorine_bi_products', Chlorine_bi_products.findAll);
    app.post('/update_Chlorine_bi_products', Chlorine_bi_products.update_many);
    app.post('/update_Chlorine_bi_products_many_all', Chlorine_bi_products.update_many_all);
    app.post('/insert_Chlorine_bi_products', Chlorine_bi_products.create);
    app.post('/chlorine_bi_products_datas', Chlorine_bi_products_datas.create);
    app.post('/chlorine_bi_products_data_edit', Chlorine_bi_products_datas.update_many);
    app.post('/chlorine_bi_products_data_view', Chlorine_bi_products_datas.findOne);
    app.post('/chlorine_bi_products_data_view_priority', Chlorine_bi_products_datas.findOne_priority);




    //HAAs
    app.post('/change_value_fetch_HAAs', HAAs.findAll);
    app.post('/update_HAAs', HAAs.update_many);
    app.post('/update_HAAs_many_all', HAAs.update_many_all);
    app.post('/insert_HAAs', HAAs.create);
    app.post('/HAAs_datas', HAAs_datas.create);
    app.post('/HAAs_data_edit', HAAs_datas.update_many);
    app.post('/HAAs_data_view', HAAs_datas.findOne);
    app.post('/HAAs_data_view_priority', HAAs_datas.findOne_priority);




    //Pesticides
    app.post('/change_value_fetch_Pesticides', Pesticides.findAll);
    app.post('/update_Pesticides', Pesticides.update_many);
    app.post('/update_Pesticides_many_all', Pesticides.update_many_all);
    app.post('/insert_Pesticides', Pesticides.create);
    app.post('/pesticides_datas', Pesticides_datas.create);
    app.post('/pesticides_data_edit', Pesticides_datas.update_many);
    app.post('/pesticides_data_view', Pesticides_datas.findOne);
    app.post('/pesticides_data_view_priority', Pesticides_datas.findOne_priority);



    //Herbicides
    app.post('/change_value_fetch_Herbicides', Herbicides.findAll);
    app.post('/update_Herbicides', Herbicides.update_many);
    app.post('/update_Herbicides_many_all', Herbicides.update_many_all);
    app.post('/insert_Herbicides', Herbicides.create);
    app.post('/herbicides_datas', Herbicides_datas.create);
    app.post('/herbicides_data_edit', Herbicides_datas.update_many);
    app.post('/herbicides_data_view', Herbicides_datas.findOne);
    app.post('/herbicides_data_view_priority', Herbicides_datas.findOne_priority);


    //Perfluorinated_chemicals_
    app.post('/change_value_fetch_Perfluorinated_chemicals_', Perfluorinated_chemicals_.findAll);
    app.post('/update_Perfluorinated_chemicals_', Perfluorinated_chemicals_.update_many);
    app.post('/update_Perfluorinated_chemicals__many_all', Perfluorinated_chemicals_.update_many_all);
    app.post('/insert_Perfluorinated_chemicals_', Perfluorinated_chemicals_.create);
    app.post('/perfluorinated_chemicals_datas', Perfluorinated_chemicals_datas.create);
    app.post('/perfluorinated_chemicals_data_edit', Perfluorinated_chemicals_datas.update_many);
    app.post('/perfluorinated_chemicals_data_view', Perfluorinated_chemicals_datas.findOne);
    app.post('/perfluorinated_chemicals_data_view_priority', Perfluorinated_chemicals_datas.findOne_priority);




    //other
    app.post('/change_value_fetch_other', other.findAll);
    app.post('/update_other', other.update_many);
    app.post('/update_other_many_all', other.update_many_all);
    app.post('/insert_other', other.create);
    app.post('/other_datas', other_datas.create);
    app.post('/other_data_edit', other_datas.update_many);
    app.post('/other_data_view', other_datas.findOne);
    app.post('/other_data_view_priority', other_datas.findOne_priority);


    //Pharmaceuticals
    app.post('/change_value_fetch_Pharmaceuticals', Pharmaceuticals.findAll);
    app.post('/update_Pharmaceuticals', Pharmaceuticals.update_many);
    app.post('/update_Pharmaceuticals_many_all', Pharmaceuticals.update_many_all);
    app.post('/insert_Pharmaceuticals', Pharmaceuticals.create);
    app.post('/pharmaceuticals_datas', Pharmaceuticals_datas.create);
    app.post('/pharmaceuticals_data_edit', Pharmaceuticals_datas.update_many);
    app.post('/pharmaceuticals_data_view', Pharmaceuticals_datas.findOne);
    app.post('/pharmaceuticals_data_view_priority', Pharmaceuticals_datas.findOne_priority);



    //chemical_parameter

    app.post('/change_value_fetch_chemical_parameter', chemical_parameter.findAll);
    app.post('/update_chemical_parameter', chemical_parameter.update_many);
    app.post('/update_chemical_parameter_many_all', chemical_parameter.update_many_all);
    app.post('/insert_chemical_parameter', chemical_parameter.create);
    app.post('/chemical_parameter_datas', chemical_parameter_datas.create);
    app.post('/chemical_parameter_data_edit', chemical_parameter_datas.update_many);
    app.post('/chemical_parameter_data_view', chemical_parameter_datas.findOne);
    app.post('/chemical_parameter_data_view_priority', chemical_parameter_datas.findOne_priority);

}