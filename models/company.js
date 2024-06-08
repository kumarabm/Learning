const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
    // Companyid: {
    //     type: Object,
    //     require: true
    // },
    CompanyName: {
        type: String,
        require: true
    },
    PanNo: {
        type: String,
        require: true
    },
    City: {
        type: String,
        require: true
    },
    State: {
        type: String,
        require: true
    },
    Country: {
        type: String,
        require: true
    }
}
)
module.exports = mongoose.model("companies", companySchema);