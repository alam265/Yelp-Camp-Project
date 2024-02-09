const joiSchema = require("../Schema/joiSchema")
const AppError = require("../uitlis/appError")

const validateCampground = (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new  AppError(msg, 400)
    } else {
        next();
    }
}

module.exports = validateCampground 