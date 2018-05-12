import React from 'react';
import Header from './header';
import PullRequest from "./pullRequests";
import Constants from "../config/constants";

const appContainer = () => (
    <div>
        <Header org={Constants.Organisation}/>
        <br/>
        <PullRequest/>
    </div>
);

export default appContainer;