// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

var labels = ['bugs','documentation','duplicate','enhancement']
fetch('https://api.trello.com/1/boards/5f5e06d01ff93c58e1015db4/labels?key=c2c94fd90e1f4650e3225bbb28f6ef16&token=4d66bf4b041760ae8c790dc4d935cc4b1a27b3c134fc2bbe593c25d09b966e2e', {
  method: 'GET'
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => {
    incomingData = JSON.parse(text);
    incomingData.forEach(element => {
      for (var i = 0; i<labels.length; i++) {
        if (element.name === labels[i]) {
          console.log(element.name)
          console.log(element.id)
          console.log('*********************')
        }
      }
    });
  })
  .catch(err => console.error(err));