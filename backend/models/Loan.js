const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ['borrowed', 'lent'],
        required: true
    },
    counterparty: {
        type: String,
        required: true,
        trim: true
    },
    principalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    interestRate: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    interestType: {
        type: String,
        enum: ['none', 'simple', 'compound'],
        default: 'none'
    },
    repaymentType: {
        type: String,
        enum: ['lumpsum', 'emi'],
        required: true
    },
    durationMonths: {
        type: Number,
        required: true,
        min: 1
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'settled', 'defaulted'],
        default: 'active'
    },
    installmentsPaid: {
        type: Number,
        default: 0
    },
    totalRepaymentAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Loan", loanSchema);
