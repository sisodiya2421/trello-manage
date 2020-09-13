// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

fetch('https://api.trello.com/1/members/abhisheksisodiya/boards?key=c2c94fd90e1f4650e3225bbb28f6ef16&token=4d66bf4b041760ae8c790dc4d935cc4b1a27b3c134fc2bbe593c25d09b966e2e', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(JSON.parse(text)))
  .catch(err => console.error(err));