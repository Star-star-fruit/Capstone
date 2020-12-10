const router = require('express').Router()
const {Email} = require('../db/models')
const {isAdmin} = require('../api/helper')

router.post('/', async (req, res, next) => {
  try {
    const {content, id} = req.body
    if (!id) {
      const email = await Email.create({
        userId: req.user.id,
        content
      })
      res.json(email)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const email = await Email.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id
      }
    })
    email.content = req.body.content
    await email.save()
    res.json(email)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const emails = await Email.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(emails)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const email = await Email.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    res.json(email)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await Email.destroy({
      where: {
        userId: req.user.id
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Email.destroy({where: {id: req.params.id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
