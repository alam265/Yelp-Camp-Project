const {campgroundSchema} = require("../Schema/joiSchema")
const AppError = require("../utilis/appError")

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    console.log(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new  AppError(msg, 400)
    } else {
        next();
    }
}

module.exports = validateCampground 