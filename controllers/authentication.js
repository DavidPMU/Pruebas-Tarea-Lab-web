exports.validate_Login = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
}

exports.validate_Logout = function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/')
    }
    return next()
}