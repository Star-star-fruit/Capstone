const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(404)
  } else {
    next()
  }
}
module.exports = {
  isAdmin
}
