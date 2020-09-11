import { createBoard } from './components/board_create';
import { createList } from './components/list_create';
import { createIssue } from './components/issue_create';

const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
try {
    // get environment variables
    const trello_key = process.env.TRELLO_KEY
    const trello_token = process.env.TRELLO_TOKEN
    const trello_username = process.env.TRELLO_USERNAME
    const repo_name = github.repository
    var board_id = ''
    var list_id = ''

    // check if board is present
    fetch(`https://api.trello.com/1/members/${trello_username}/boards?key=${trello_key}&token=${trello_token}`, {
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
            if (repo_name === incomingData[i].name) {

                //get board id if board is already present 
                board_id = incomingData[i].id

            }
        }
        if (board_id === ''){
            createBoard();
        }
    })
    .catch(err => console.error(err));
    
    
    // check is issues list is present or not
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

                // get list id
                list_id = incomingData[i].id
                console.log(incomingData[i].id)
            }
        }
        if (list_id === ''){
            createList();
        }
    })
    .catch(err => console.error(err));


    // adding issue to the issue list
    createIssue()

} catch (error) {
  core.setFailed(error.message);
}
};

main();