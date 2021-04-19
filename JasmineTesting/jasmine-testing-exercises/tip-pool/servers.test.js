describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
    expect(serverNameInput.value).toEqual("");
  });

  it('should verify elements are added ', function (){
    //is there an element tr with the id of 'key' inside table id "serverTable"
    const table = document.getElementById("serverTable");
    const tr = document.querySelector('tr');
    expect(table.contains(tr)).toEqual(false);
    
  });

  afterEach(function() {
    // teardown logic
    //console.log(allServers);
    const table = document.getElementById("serverTable");
    const newTr = table.querySelector('tr');
    newTr.remove();
    serverNameInput.value = '';
    allServers = {};
    console.log( serverNameInput.value);
  });
});
