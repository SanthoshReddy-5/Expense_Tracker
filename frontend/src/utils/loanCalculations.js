// This utility mirrors the backend logic exactly to provide instant frontend previews of the total repayment amount.

export const calculateExpectedRepayment = (principal, rate, type, durationMonths, interestType) => {
    if (!principal || rate === undefined || !durationMonths) return 0;

    const p = Number(principal);
    const r = Number(rate);
    const m = Number(durationMonths);

    if (r === 0 || interestType === 'none') {
        return p;
    }

    if (type === 'emi') {
        // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
        // Where r is monthly interest rate
        const rMonthly = (r / 12) / 100;
        const n = m;
        const emi = p * rMonthly * Math.pow(1 + rMonthly, n) / (Math.pow(1 + rMonthly, n) - 1);
        return emi * n;
    }

    if (type === 'lumpsum') {
        if (interestType === 'simple') {
            // SI = (P * R * T) / 100
            // T is in years (m / 12)
            const timeInYears = m / 12;
            const interest = (p * r * timeInYears) / 100;
            return p + interest;
        } else if (interestType === 'compound') {
            // CI = P * (1 + R/100)^T
            const timeInYears = m / 12;
            return p * Math.pow((1 + r / 100), timeInYears);
        }
    }

    return p;
};
