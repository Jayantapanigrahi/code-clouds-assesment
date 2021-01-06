const adminSchema = require('../../schema/admin/admin.schema');
const locationSchema = require('../../schema/admin/location.schema');
// let saveData = {}
// saveData['location'] = { type: "Point", coordinates: [ 21.3858965, 86.8320743 ]}
// saveData['place'] = "Khantapada, Odisha, India"
//             console.log(saveData);
//             locationSchema.create(saveData);
class AdminRepo {
    findOneAdmin = async (cond) => {
        // console.log(cond)
        return adminSchema.findOne(cond)
    }
    
    getLocation = async () => {
        return locationSchema.findOne()
    }
    updateLocation = async (cond, data) => {
        return locationSchema.updateOne(cond, data);
    }
    checkLocation = async (data) => {

        console.log(data)
        return locationSchema.aggregate([
                { "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [ parseFloat(data.lat), parseFloat(data.long) ]
                    }, 
                    "maxDistance": 500 * 999999999999999999,
                    "spherical": true,
                    "distanceField": "distance",
                    "distanceMultiplier": 0.001
                }}
            ])
    }
  
}

module.exports = {
    adminRepo: new AdminRepo()
}