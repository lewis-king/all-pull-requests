All Pull Requests is a service that aggregates open pull requests from a number of different repos.
If you're a team that works on many different projects simultaneously (common with a microservices architecture approach), this application provides a single page view to display all open pull requests in the configured repos.

Modify the following files to fit your needs:
1. client/config/constants - Update the name of the organisation. This will most likely be the name of your Feature/Product/Project or Programme team.
2. config/repos.json - Define the URLs to the repos you would like to monitor.

**Build**

*Dev:*
`webpack-cli --config webpack.config.js --mode development`

*Prod:*
`webpack-cli --config webpack.config.js --mode production`

**Run**

`npm start`

