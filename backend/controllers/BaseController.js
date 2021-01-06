module.exports = class BaseController {

    renderJSON(req, res, options) {
        res.status(200)
        return res.json(options)
    }


    renderError(req, res, errors) {
        res.status(500)
        return res.json(errors.message ? errors.message : errors.err ? errors.err : errors)
    }

}