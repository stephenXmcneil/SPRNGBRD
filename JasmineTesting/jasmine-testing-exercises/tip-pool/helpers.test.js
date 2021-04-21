describe("Helper funcs", function() {
    beforeEach(function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
      submitPaymentInfo();
    });

    it('Check sumPaymentTotal() for bill amount', function () {
      expect(sumPaymentTotal('billAmt')).toEqual(100);
    });

    it('Check sumPaymentTotal() for tip amount', function () {
      expect(sumPaymentTotal('tipAmt')).toEqual(20);
    });

    it('calculateTipPercent() returns with a number', function () { //use plain english. 
      expect(calculateTipPercent(100, 20)).toEqual(20);
    });

    it('calculateTipPercent() returns with a string', function () { //use plain english. 
      expect(calculateTipPercent('100', '20')).toEqual(20);
    });

    it('Check appendTd()', function () {
      let newTr = document.createElement('tr');
      appendTd(newTr, 'new value');
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual("new value");
      });

    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      allPayments = {};
      paymentId = 0;
    });

});

describe("appendDeleteBtn()", function() {
  it("returns one more tr element", function (){
    const tr = document.createElement('tr');
    appendDeleteBtn(tr);
    
    expect(tr.children.length).toEqual(1);
  })
  
})