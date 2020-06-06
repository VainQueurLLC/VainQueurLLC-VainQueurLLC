const transferEntries = (req, res, db) => {
  const { transferid,entries} = req.body;
      db.select('*').from('users').where('id', '=', transferid)
      .increment('entries',entries)
      .returning('*')
        .then(users=>{
          res.json(users[0])
        })
        .catch(err => res.status(400).json('unable to get entries'))
    .catch(err => res.status(400).json('failed'))
}
const showUsers = (req,res,db) =>{
  db.select('*').from('users')
  .then(users=>{
    if(users.length){
      res.json(users)
    }
    else{
      res.staus(404).json('No User Found')
    }
  })
}
const blockUser = (req,res,db) =>{
  const {blockid} = req.body;
 db.select('*').from('users')
  .where({ id: blockid })
  .update({ isblocked: "true" }, ['id', 'isblocked'])
  .then(users=>{
    res.json(users[0])
  })
 // .catch(err => console.log(err))
  .catch(err => res.status(400).json('unable to update'))
}
const handleAdminSignin = (req,res,db) =>{
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  db.select('*').from('admin')
    .where('email','=',email)
   .andWhere('password','=',password)
    .then(resp=>{
      res.json(resp[0])
    }) 
    .catch(err => res.status(400).json(err))
}

module.exports = {
  transferEntries,
  showUsers,
  blockUser,
  handleAdminSignin
}