import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost/api-uceda",{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useFindAndModify: false,
    useCreateIndex: true
    })
    .then(db => console.log('Database is connect'))
    .catch(error => console.log(error))