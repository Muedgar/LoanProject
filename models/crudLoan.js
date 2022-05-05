const loan = require('./loan');
const mongoose = require('mongoose');

class crudLoan {
    constructor() {}

    async createLoan(amount,term) {
        try {
            await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
                const monthCount = 0;
                await loan.create({amount,term,monthCount}).then(d=>d).catch(e=>new Error(e));
            }).catch(e=>new Error(e));
        } catch (error) {
            throw new Error(error);
        }
    }
    async readLoan() {
        try {
            let data;
            await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
                await loan.find({}).then(d=>{
                    data = d;
                }).catch(e=>new Error(e));
            }).catch(e=>new Error(e));
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
    async oneLoan(id) {
        try {
            let data;
            await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
                await loan.findOne({_id:id}).then(d=>{
                    data = d;
                }).catch(e=>new Error(e));
            }).catch(e=>new Error(e));
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateLoan(id) {
        try {
            await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
                await loan.findOne({_id:id}).then(async d=>{
                    d.monthCount++;

                    const {_id,amount,term,monthCount} = d;
                    
                    await loan.findOneAndUpdate({_id},{amount,term,monthCount}).then(d=>d).catch(e=>new Error(e));
                    
                }).catch(e=>new Error(e));
            }).catch(e=>new Error(e));
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = crudLoan;