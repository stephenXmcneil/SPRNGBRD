async function getData(token) {
    const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/users', { params: { token } })
    console.log(res)
}

// async function createUser() {
//     const res = await axios.post('https://reqres.in/api/users', { username: 'Bob', Age: '19' })
//     console.log(res)
// }

async function signUp(name, username, password) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/signup', { user: { name, username, password } })
    console.log(res)
}

async function login(username, password) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/login', { user: { username, password } })
    console.log(res)
    return res.data.token
}


//signUp('Stephen McNeil', 'smcnl', 'letmein');
async function getUsersWithAuth() {
    const token = await login('smcnl', 'letmein');
    console.log(token)
    return getData(token)
}
