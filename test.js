// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

var board_id = null
const trello_username = 'abhisheksisodiya'
fetch(`https://api.trello.com/1/members/${trello_username}/boards?key=c2c94fd90e1f4650e3225bbb28f6ef16&token=4d66bf4b041760ae8c790dc4d935cc4b1a27b3c134fc2bbe593c25d09b966e2e`, {
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
        .then(text => {
            incomingData = JSON.parse(text)
            for (var i = 0; i < incomingData.length; i++) {
                if ('sisodiya2421/pythonPing' === incomingData[i].name) {
                    board_id = incomingData[i].id
                    //console.log(incomingData[i].id)
                }
            }
            console.log(board_id)
            return board_id;
        })
        .catch(err => console.error(err));