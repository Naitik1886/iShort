const mongoose  = require('mongoose');

async function connectMongoDb (url){
    return mongoose.connect(url)
    .then(() => console.log('mongoDb connected'))
    .catch((err) => console.log('error:' ,err))
}

module.exports = {
    connectMongoDb,
}
