const Loan = require("../models/Loan");
const moment = require("moment");

// Calculate Total Repayment logic (matches frontend utility we will create)
const calculateTotalRepayment = (principal, rate, type, durationMonths, interestType) => {
    if (rate === 0 || interestType === 'none') {
        return principal;
    }

    if (type === 'emi') {
        // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
        // Where r is monthly interest rate
        const r = (rate / 12) / 100;
        const n = durationMonths;
        const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        return emi * n;
    }

    if (type === 'lumpsum') {
        if (interestType === 'simple') {
            // SI = (P * R * T) / 100
            // T is in years (durationMonths / 12)
            const timeInYears = durationMonths / 12;
            const interest = (principal * rate * timeInYears) / 100;
            return principal + interest;
        } else if (interestType === 'compound') {
            // CI = P * (1 + R/100)^T
            const timeInYears = durationMonths / 12;
            return principal * Math.pow((1 + rate / 100), timeInYears);
        }
    }

    return principal;
};

// Add Loan
exports.addLoan = async (req, res) => {
    const userId = req.user.id;
    const {
        type,
        counterparty,
        principalAmount,
        interestRate,
        interestType,
        repaymentType,
        durationMonths,
        startDate
    } = req.body;

    try {
        if (!type || !counterparty || !principalAmount || !repaymentType || !durationMonths) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        // Calculate due date based on start date and duration
        const start = startDate ? new Date(startDate) : new Date();
        const dueDate = moment(start).add(durationMonths, 'months').toDate();

        // Calculate exact total repayment
        const totalRepaymentAmount = calculateTotalRepayment(
            Number(principalAmount),
            Number(interestRate || 0),
            repaymentType,
            Number(durationMonths),
            interestType || 'none'
        );

        const loan = new Loan({
            userId,
            type,
            counterparty,
            principalAmount: Number(principalAmount),
            interestRate: Number(interestRate || 0),
            interestType: interestType || 'none',
            repaymentType,
            durationMonths: Number(durationMonths),
            startDate: start,
            dueDate,
            totalRepaymentAmount: Math.round(totalRepaymentAmount)
        });

        await loan.save();
        res.status(201).json(loan);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Loans
exports.getAllLoans = async (req, res) => {
    const userId = req.user.id;
    try {
        const loans = await Loan.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update Loan
exports.updateLoan = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const updatableFields = ["status", "installmentsPaid"];

    try {
        const loan = await Loan.findOne({ _id: id, userId });
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        updatableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                loan[field] = req.body[field];
            }
        });

        // Automatically settle loan if all installments are paid
        if (loan.repaymentType === 'emi' && loan.installmentsPaid >= loan.durationMonths) {
            loan.status = 'settled';
        }

        await loan.save();
        res.status(200).json(loan);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Loan
exports.deleteLoan = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const loan = await Loan.findOneAndDelete({ _id: id, userId });
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.status(200).json({ message: "Loan deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
