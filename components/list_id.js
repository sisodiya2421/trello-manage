const fetch = require('node-fetch');

// returns List id in a Board 
exports.getListId = function (board_id, trello_key, trello_token) {
  var list_id = null;
  return fetch(`https://api.trello.com/1/boards/${board_id}/lists?key=${ trello_key }&token=${ trello_token }`, {
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
          if ('Issues' === incomingData[i].name) {
              list_id = incomingData[i].id
          }
        }
        return list_id;
    })
    .catch(err => console.error(err));
}