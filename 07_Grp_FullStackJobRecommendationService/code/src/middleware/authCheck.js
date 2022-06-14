const authCheck = (req, res, next) => {
    console.log(req.session.user)

    if(!req.user && req.session.user ){
        req.user = req.session.user;
    } 
    if (!req.user) {
        res.redirect('/auth/login');
    }
    next()
}
module.exports = authCheck