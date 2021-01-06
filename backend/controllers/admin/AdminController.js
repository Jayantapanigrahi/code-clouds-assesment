const BaseController = require('../BaseController')
const { adminService } = require('../../services/admin/AdminService');
const { ObjectID } = require('mongodb');
class AdminController extends BaseController {


    login = async (req, res, next) => {
        let data = req.body;
        try {
            let login = await adminService.login(data)
            this.renderJSON(req, res, login)
        } catch (error) {
            this.renderError(req, res, error)
        }
    }

    getLocation = async (req, res, next) => {
        try {
            let resData = await adminService.getLocation()
            this.renderJSON(req, res, resData)
        } catch (error) {
            this.renderError(req, res, error)
        }
    }
    updateLocation = async (req, res, next) => {
            try {
                let resData = await adminService.updateLocation(req.body)
                this.renderJSON(req, res, resData)
            } catch (error) {
                this.renderError(req, res, error)
            }
        }

    checkLocation = async (req, res, next) => {
            try {
                let resData = await adminService.checkLocation(req.body)
                this.renderJSON(req, res, resData)
            } catch (error) {
                this.renderError(req, res, error)
            }
        }
}


module.exports = {
    adminController: new AdminController()
}