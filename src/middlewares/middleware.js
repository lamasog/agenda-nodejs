exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    res.locals.contato = req.session.contato;
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        //Se ocorrer qualquer erro, renderiza a página ./includes/404.ejs
        return res.render('404');
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => res.redirect('/'));
        return;
    }

    next();
}