mongoose = require('mongoose')

conn = mongoose.connect('mongodb://localhost:27017/comment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log("Database connected")
}).catch(err => {
    console.log("Error" + err.message)
})

module.exports = conn