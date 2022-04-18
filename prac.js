const firstName = 'Bob'
const lastName = 'Hope'

const roster = {
  addName: function (fName, lName) {
    const wholeName = `${fName} ${lName}`
    console.log(wholeName)
    return wholeName
  }
}
