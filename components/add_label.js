const fetch = require('node-fetch');

// adding label to a card(Issue card)
exports.add_label = function (card_id, trello_key, trello_token, label_id) {
return fetch(`https://api.trello.com/1/cards/${card_id}/idLabels?key=${trello_key}&token=${trello_token}&value=${label_id}`, {
  method: 'POST'
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
};