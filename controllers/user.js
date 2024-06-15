const User = require('../models/user')

module.exports.renderRegisterForm = (req, res) => {
    res.render('user/register')
}

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const newUser = new User({ username, email })
        const registeredUser = await User.register(newUser, password)

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })


    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('user/login')
}

module.exports.login =  (req, res) => {
    req.flash('success', 'Welcome Back!!')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}