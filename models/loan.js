const mongoose = require("mongoose");

const Loan = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    term: {
        type: Number,
        required: true
    },
    monthCount: {
        type: Number,
        required: true
    }
});

const loan = mongoose.model('loan',Loan);

module.exports = loan;

