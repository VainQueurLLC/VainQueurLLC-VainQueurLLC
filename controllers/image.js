const handleImage = (req, res, db) => {
  const { id,transferid,entries} = req.body;
    db.transaction(trx => {
      db.select('*').from('users').where('id', '=', transferid)
      .increment('entries',entries)
      .returning('entries')
      .then(entr=>{
         return db('users').decrement('entries',entries).where('id','=',id)
        .returning('*')
        .then(users=>{
          res.json(users[0])
        })
        .catch(err => res.status(400).json('unable to get entries'))
      })
      .catch(err=>res.json(err))
      .then(trx.commit)
      .catch(trx.rollback)
    })

    .catch(err => res.status(400).json('failed'))
}
          



module.exports = {
  handleImage
}
