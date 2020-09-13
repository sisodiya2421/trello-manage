const fetch = require('node-fetch');

exports.create_label = function (board_id, trello_key, trello_token, label_name, label_color) {
return fetch(`https://api.trello.com/1/boards/${board_id}/labels?key=${trello_key}&token=${trello_token}&name=${label_name}&color=${label_color}`, {
  method: 'POST'
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(`Label ${label_name} created.`))
  .catch(err => console.error(err));
}