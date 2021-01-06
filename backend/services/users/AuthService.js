const { authRepo } = require('../../repositories/users/AuthRepo');
const { usersRepo } = require('../../repositories/users/UsersRepo');
const { authentication } = require('../../middlewares/Authenticate')
const BaseService = require('../BaseService')
const bcrypt = require('bcrypt');

class AuthService extends BaseService {

    login = async (data) => {
        data.username = data.username.toLowerCase();
        let cond = {
           email_id: data.username
        }
        let existUser = await usersRepo.findOneUser(cond)
        if (existUser) {
            if (await bcrypt.compare(data.password, existUser.password)) {
                existUser['type'] = "user"
                const token = await authentication.jwtCreation(existUser);
                return Promise.resolve({
                    success: true, data: { data: {token:token,details:existUser}},
                    messageKey: "loginSuccesful"
                })
            }
            else {
                return Promise.resolve({ success: false, messageKey: "incorrectPassword" })
            }
        }
        else
            return Promise.resolve({ success: false, messageKey: "incorrectEmail" })
    };

    


}

module.exports = {
    authService: new AuthService()
}