const fetch = require('node-fetch');

// create board
exports.createBoard = function (trello_key, trello_token, repo_name) {
  fetch(`https://api.trello.com/1/boards/?key=${trello_key}&token=${trello_token}&name=${repo_name}`, {
    method: 'POST'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(console.log(`Board ${repo_name} created.`))
    .catch(err => console.error(err));
}