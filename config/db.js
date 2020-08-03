const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        mongoose.connect(db,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            })
            console.log('mongo DB connected')
    }
    catch (err) {
        console.error(err.message)
        process.exit(1)

    }

    // Another way to write
    // mongoose.connect(db, 
    //     {
    //         useNewPassword: true,
    //         useCreateIndex: true,
    //         useFindAndModify : false
    //     }).then(() => console.log('mongoDB connect'))
    //     .catch(err => {
    //         console.error(err.message)
    //         process.exit(1)
    //     })
}

module.exports = connectDB