const crudLoan = require("../models/crudLoan");

const createLoan = async (req,res) => {
    try {
        const {amount,term} = req.body;
        await new crudLoan().createLoan(amount,term).then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const readLoan = async (req,res) => {
    try {
        await new crudLoan().readLoan().then(d => {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}
//
const oneLoan = async (req,res) => {
    try {
        const {id} = req.body;
        await new crudLoan().oneLoan(id).then(d => {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const updateLoan = async (req,res) => {
    try {
        const {id} = req.body;
        await new crudLoan().updateLoan(id).then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {createLoan, readLoan, updateLoan, oneLoan};