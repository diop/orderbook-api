const jwt = require('jsonwebtoken')

exports.login = (request, response) => {
    // Mock user
    const user = {
       id: 1,
       username: 'fode',
       email: 'fode.diop@students.makeschool.com'
   }

   jwt.sign({user}, 'secretsecretkey', (error, token) => {
       res.json({
           token
       })
   })
}