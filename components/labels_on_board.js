const fetch = require('node-fetch');

exports.labelsOnBoard = function (board_id, trello_key, trello_token) {
return fetch(`https://api.trello.com/1/boards/${board_id}/labels?key=${trello_key}&token=${trello_token}`, {
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
    return incomingData;
  })
  .catch(err => console.error(err));
};