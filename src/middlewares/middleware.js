exports.middlewareGlobal = (req, res, next) => {
  res.locals.umaVariavelLocal = 'Este é o valor da variavel local'

  next()
}
exports.outroMiddleware = (req, res, next) => {
  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('404')
  }
  next()
}

exports.csrfMiddlware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}
