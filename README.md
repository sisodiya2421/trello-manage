# Trello-manage

#### This action automatically creates a list of issues with their labels in your Trello board whenever a new issue is created.

At first it will automatically create a Board in your Trello account with the name same as that of your **repository** in which your will use this Github Action.
Inside this board it will create a list with the name `Issues` where all your issues will reside with their labels.

It action is made to make managment of issues with your team in Trello easier to handle.

## Inputs

- `repo-name` The name of the repository where the action is being used. **Required**
- `trello-username` The username of your Trello account. **Required**

```yml
with:
  repo-name: ${{ github.repository }}
  trello-username: ${{ secrets.TRELLO_USERNAME }}
```

## Secrets

This action uses three secrets `TRELLO_KEY`, `TRELLO_TOKEN` and the `TRELLO_USERNAME`.
To get them you will have to login into [Trello](https://trello.com/) first and then go to this link [https://trello.com/app-key](https://trello.com/app-key)
to get your TRELLO_KEY. To generate the TRELLO_TOKEN you will find the link in the same page.

## Environment variables

The secret keys added will be used as environment variables for the workflow to log into your trello account on your behalf and make api requests
to make necessary list of issues in your trello board.

```yml
env:
  TRELLO_KEY: ${{ secrets.TRELLO_KEY }}
  TRELLO_TOKEN: ${{ secrets.TRELLO_TOKEN }}
```

## Example

```yaml
name: Trello Issue List
on:
  issues:
    types: [opened]
env:
  TRELLO_KEY: ${{ secrets.TRELLO_KEY }}
  TRELLO_TOKEN: ${{ secrets.TRELLO_TOKEN }}
  
jobs:
  issue_send:
    name: Send Issue to Trello
    runs-on: ubuntu-latest
    steps:
      - name: Runs trello manage
        uses: sisodiya2421/trello-manage@master
        with:
          repo-name: ${{ github.repository }}
          trello-username: ${{ secrets.TRELLO_USERNAME }}
```

This workflow gets triggered whenever a new issue is created.

The best thing about this action is that we can make it more usefull with further updates like triggering when an issue is closed or automatically
assignment of issues to your team members in Trello. :smiley:
