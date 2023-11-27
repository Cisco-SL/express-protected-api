const mongoose = require('mongoose');
const MONGO_DB = process.env.MONGO_DB;

module.exports = db = {

    connect: function () {
        mongoose.connect(MONGO_DB).then(
            ok => { 
                console.log("DB connection is ok...")
            },
            err => { 
                console.log(err);
                console.log("DB connection is !ok.")
            }
        )
    }
}
