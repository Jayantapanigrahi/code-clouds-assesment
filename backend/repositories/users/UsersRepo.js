const usersSchema = require('../../schema/users/users.schema');
class UsersRepo {
   
    findOneUser = async (cond) => {
        return usersSchema.findOne(cond)
    }

    
}

module.exports = {
    usersRepo: new UsersRepo()
}