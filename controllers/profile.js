 const handleProfileGet = (req, res, db) => {
  const { email} = req.body;
  db.select('*').from('users').where({email})
    .then(user => {
      if (user.length) {
        res.json(user)
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}
const handleNameProfileGet = (req, res, db) => {
  const { name } = req.body;
  db.select('*').from('users').where({name})
    .then(user => {
      if (user.length) {
        res.json(user)
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
  handleProfileGet,
  handleNameProfileGet
}