import { createBrowserHistory } from 'history';

export default createBrowserHistory();

// There is one thing different than a React without Redux app. We are importing from a file called "history" and adding it as an attribute to the Router element: <Router history={history}>. This is because we will be using functions outside of our components to interact with Redux. Per React-Router's docs, this requires accessing React's build-in history module. Populate the history file with these two lines: