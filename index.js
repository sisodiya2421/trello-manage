import { createBoard } from './components/board_create';
import { createList } from './components/list_create';
import { createIssue } from './components/issue_create';
import { getBoardId } from './components/board_id';
import { getListId } from './components/list_id';

const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const context = github.context;
        const payload = context.payload;
        const repo_name = github.repository;
        const issue_title = getIssueTitle(payload);

        // get environment variables
        const trello_key = process.env.TRELLO_KEY
        const trello_token = process.env.TRELLO_TOKEN
        const trello_username = process.env.TRELLO_USERNAME
        
        var board_id = null
        var list_id = null

        // check if board is present
        board_id = getBoardId(trello_username, trello_key, trello_token);
        if (!board_id) {
            createBoard(trello_key, trello_token, repo_name)
        }
        
        // check if issues list is present or not
        list_id = getListId(board_id, trello_key, trello_token);
        if (!list_id) {
            createList(trello_key, trello_token, board_id)
        }
        // adding issue to the issue list
        createIssue(trello_key, trello_token, list_id, issue_title)

    } catch (error) {
    core.setFailed(error.message);
    }
    };

    function getIssueTitle(payload) {
        if (payload.issue && payload.issue.title) {
        return payload.issue.title;
        }
    }


main();