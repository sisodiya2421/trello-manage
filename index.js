const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

const main = async () => {
try {
    // get environment variables
    const trello_key = process.env.TRELLO_KEY
    const trello_token = process.env.TRELLO_TOKEN

    // create board with repo name
    fetch(`https://api.trello.com/1/boards/?key=${trello_key}&token=${trello_token}&name={name}`, {
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

} catch (error) {
  core.setFailed(error.message);
}
};

main();