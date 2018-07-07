const mongoose = require('mongoose')

const URI = 'mongodb://localhost:27017/mern_task'

mongoose.connect(URI)
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err))

module.exports = mongoose
