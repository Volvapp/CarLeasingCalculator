document.addEventListener('DOMContentLoaded', () => {
    const carType = document.getElementById('car-type');
    const carValue = document.getElementById('car-value');
    const carValueRange = document.getElementById('car-value-range');
    const leasePeriod = document.getElementById('lease-period');
    const downPayment = document.getElementById('down-payment');
    const downPaymentRange = document.getElementById('down-payment-range');

    const totalCost = document.getElementById('total-cost');
    const downPaymentAmount = document.getElementById('down-payment-amount');
    const monthlyInstallment = document.getElementById('monthly-installment');
    const interestRate = document.getElementById('interest-rate');

    // Function to validate input fields
    const validateInputs = () => {
        const carValueNum = parseFloat(carValue.value);
        const leasePeriodNum = parseInt(leasePeriod.value);
        const downPaymentPercentNum = parseFloat(downPayment.value);

        // Validation for car value
        if (isNaN(carValueNum) || carValueNum < 10000 || carValueNum > 200000) {
            alert("Car value must be between €10,000 and €200,000.");
            return false;
        }

        // Validation for lease period
        if (isNaN(leasePeriodNum) || leasePeriodNum < 12 || leasePeriodNum > 60) {
            alert("Lease period must be between 12 and 60 months.");
            return false;
        }

        // Validation for down payment percentage
        if (isNaN(downPaymentPercentNum) || downPaymentPercentNum < 10 || downPaymentPercentNum > 50) {
            alert("Down payment percentage must be between 10% and 50%.");
            return false;
        }

        return true;
    };

    // Function to calculate leasing details based on user input
    const calculateLeasingDetails = () => {
        if (!validateInputs()) {
            return;
        }

        const carValueNum = parseFloat(carValue.value);
        const leasePeriodNum = parseInt(leasePeriod.value);
        const downPaymentPercentNum = parseFloat(downPayment.value);

        // Calculate downpayment amount, interest rate, monthly installment, and total cost
        const downPaymentAmountNum = carValueNum * (downPaymentPercentNum / 100);
        const interestRateNum = carType.value === 'new' ? 2.99 : 3.7;
        const principal = carValueNum - downPaymentAmountNum;
        const monthlyRate = (interestRateNum / 100) / 12;
        const monthlyInstallmentNum = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -leasePeriodNum));
        const totalCostNum = (monthlyInstallmentNum * leasePeriodNum) + downPaymentAmountNum;

        // Update displayed values with calculated results
        downPaymentAmount.innerText = `€${downPaymentAmountNum.toFixed(2)}`;
        interestRate.innerText = `${interestRateNum}%`;
        monthlyInstallment.innerText = `€${monthlyInstallmentNum.toFixed(2)}`;
        totalCost.innerText = `€${totalCostNum.toFixed(2)}`;
    };

    // Function to synchronize input and range elements
    const syncInputs = (input, range) => {
        input.addEventListener('input', () => {
            range.value = input.value;
        });
        range.addEventListener('input', () => {
            input.value = range.value;
        });
    };

    // Synchronize car value inputs and ranges
    syncInputs(carValue, carValueRange);
    // Synchronize down payment inputs and ranges
    syncInputs(downPayment, downPaymentRange);

    // Add event listeners for car type and lease period changes
    carType.addEventListener('change', calculateLeasingDetails);
    leasePeriod.addEventListener('change', calculateLeasingDetails);

    // Add blur event listeners to trigger validation
    carValue.addEventListener('blur', calculateLeasingDetails);
    leasePeriod.addEventListener('blur', calculateLeasingDetails);
    downPayment.addEventListener('blur', calculateLeasingDetails);

    // Initially calculate leasing details when the page loads
    calculateLeasingDetails();
});
