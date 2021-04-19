window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = {
    amount: 10000,
    years: 2,
    rate: .5,
  }

  // const amntInput = document.getElementById("loan-amount");
  // const yearsInput = document.getElementById("loan-years");
  // const rateInput = document.getElementById("loan-rate");

  values.amntInput = values.amnt;
  values.yearsInput = values.years;
  values.rateInput = values.rates;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentInputs = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentInputs));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  
  let P = values.amount; //amount of principle
  let n = (values.years) * 12; //total number of payments (yrs x 12)
  let i = (values.rate) / 12; //periodic inetrest rate
  let result = ( P * i  /  1 - Math.pow( ( 1 + i ), -n ) );
  return result.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const updateInterface = document.getElementById("monthly-payment");
  updateInterface.innerText = "$" + monthly;
}
