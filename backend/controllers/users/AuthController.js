const BaseController = require('../BaseController')
const { authService } = require('../../services/users/AuthService');

class AuthController extends BaseController {
    login = async (req, res, next) => {
        let data = req.body;
        try {
            let login = await authService.login(data)
            this.renderJSON(req, res, login)
        } catch (error) {
            this.renderError(req, res, error)
        }
    }
}


module.exports = {
    authController: new AuthController()
}