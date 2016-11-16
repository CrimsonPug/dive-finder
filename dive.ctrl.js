const diving = require ('./dive.model.js');


//function manipulating dive data from dive.model.js
const diveCtrl = {
    getAllDive: function () {
        return diving;
    },
    getDiveByID: function(diveId) {
        
        let foundDive = {} ;
        for (let i=0; i<diving.length;i++){
            if (diveId == diving[i].id){
                foundDive = diving[i];
            }
        }
        return foundDive;
        },
   
};


 
module.exports = diveCtrl; 