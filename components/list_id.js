const fetch = require('node-fetch');

const trello_key = process.env.TRELLO_KEY
const trello_token = process.env.TRELLO_TOKEN
const board_id = ''

// returns List id in a Board 
export function listId() {
fetch(`https://api.trello.com/1/boards/${board_id}/lists?key=${ trello_key }&token=${ trello_token }`, {
  method: 'GET'
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
        if ('issues' === incomingData[i].name) {
            console.log(incomingData[i].name)
            console.log(incomingData[i].id)
        }
      }
  })
  .catch(err => console.error(err));
}