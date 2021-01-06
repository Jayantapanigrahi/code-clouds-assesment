
const { adminRepo } = require('../../repositories/admin/AdminRepo');
const { authentication } = require('../../middlewares/Authenticate')
const BaseService = require('../BaseService')
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');




class AdminService extends BaseService {

    login = async (data) => {
        data.username = data.username.toLowerCase();
        let cond = {
             email_id: data.username
        }
        let existUser = await adminRepo.findOneAdmin(cond)
        if (existUser) {
            if (await bcrypt.compare(data.password, existUser.password)) {
                existUser['type'] = 'admin'
                const token = await authentication.jwtCreation(existUser);
                return Promise.resolve({ data: {token:token,details:existUser}, messageKey: "loginSuccesful", success: true })
            }
            else {
                return Promise.resolve({ success: false, messageKey: "incorrectPassword" })
            }

        }
        else
            return Promise.resolve({ success: false, messageKey: "incorrectEmail" })

    };

    getLocation = async (data) => {
        return { data: await adminRepo.getLocation(), success: true, messageKey: "fetchedLocation" }
    };

    updateLocation = async (data) => {
        if (!data._id || !data.lat || !data.long || !data.place) {
            return Promise.resolve({ success: false, messageKey: "fieldsIncomplete" })
        } else {
        let cond = { _id: new ObjectID(data._id) }
        let updateData = {}
        updateData['location'] = { type: "Point", coordinates: [ parseFloat(data.lat),parseFloat(data.long) ]}
        updateData['place'] = data.place
        console.log(updateData);
        return { data: await adminRepo.updateLocation(cond,updateData), success: true, messageKey: "updatedLocation" }
        }
    };


   checkLocation = async (data) => {
       if (!data.lat || !data.long) {
            return Promise.resolve({ success: false, messageKey: "fieldsIncomplete" })
        } else {
        return { data: await adminRepo.checkLocation(data), success: true, messageKey: "fetchedLocation" }
        } 
    };
    


}

module.exports = {
    adminService: new AdminService()
}