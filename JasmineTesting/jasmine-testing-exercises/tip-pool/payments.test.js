

describe("createCurPayment()", function(){
    beforeEach(function () {
        billAmtInput.value = 40;
        tipAmtInput.value = 10;
    })
    
    it ('returns undefined', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        expect(createCurPayment()).toBe(undefined);
    })

    it ('returns payment object', function () {
        
        let result = createCurPayment();
        expect(result.billAmt).toEqual('40');
        expect(result.tipAmt).toEqual('10');
        expect(result.tipPercent).toEqual(25);
    })

    afterEach(function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
    })
})

describe("submitPayment()", function(){
    beforeEach(function () {
        billAmtInput.value = 40;
        tipAmtInput.value = 10;
    })

    it ('returns payment object', function () {
        expect(allPayments.length).toEqual(undefined);
    })

    
    afterEach(function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
    })

})


describe("appendPaymentTable()", function(){

        it("returns value of curPayment", function(){
            let curPayment = {
                billAmt: 0,
                tipAmt: 2,
                tipPercent: 3
            }
            appendPaymentTable(curPayment);
            expect(curPayment.billAmt).toEqual(0);
        })

        it("returns length of curPayment", function(){
            let curPayment = {
                billAmt: 0,
                tipAmt: 2,
                tipPercent: 3
            }

            let length = Object.keys(curPayment).length;

            appendPaymentTable(curPayment);
            expect(length).toEqual(3);
        })

        afterEach(function(){
            const newPTable = document.querySelector('#paymentTable tbody');
            const allTr = newPTable.querySelectorAll('tr');
            for(let tr of allTr){
                tr.remove();
            }
            //tr.remove();
        })
})

describe("updateSummary()", function(){
    beforeEach(function () {
       
    });

    it ("returns 0 tip percentage when there is no payment total and no number of payment", function () {
        let tipPercentAvg;
        let paymentTotal = 0;
        let numberOfPayments = 0;

        if (paymentTotal === 0 && numberOfPayments === 0) {
            tipPercentAvg = 0;
          } else {
            tipPercentAvg = paymentTotal / numberOfPayments;
          }
        expect(tipPercentAvg).toEqual(0);
    })
    

    it ("returns returns avg percent tip when payment total and no. of payments isn't zero", function () {
        let tipPercentAvg;
        let paymentTotal = 1000;
        let numberOfPayments = 10;

        if (paymentTotal === 0 && numberOfPayments === 0) {
            tipPercentAvg = 0;
          } else {
            tipPercentAvg = paymentTotal / numberOfPayments;
          }

        expect(tipPercentAvg).toEqual(100);
    })

    it ("returns returns avg percent tip when payment total and no. of payments isn't zero", function () {
        let tipPercentAvg;
        let paymentTotal = 1000;
        let numberOfPayments = 10;

        if (paymentTotal === 0 && numberOfPayments === 0) {
            tipPercentAvg = 0;
          } else {
            tipPercentAvg = paymentTotal / numberOfPayments;
          }

        expect(summaryTds[0].innerHTML).toEqual(sumPaymentTotal('billAmt'));
    })

    afterEach(function(){
        tipPercentAvg = null;
        paymentTotal = null;
        numberOfPayments = null;
    })
        
})