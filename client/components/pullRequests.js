import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOpenPullRequests} from "../actions/index";

class PullRequest extends Component {


    componentDidMount() {
        console.log("In component did mount");
        this.props.fetchOpenPullRequests();

    }

    render() {
        var dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

        const openPullRequests = this.props.openPullRequests;
        if (!openPullRequests) {
            return (
                <div>Fetching open pull requests...</div>
            )
        }
        if (openPullRequests.length == 0) {
            return (
              <div>
                  There are no open pull requests
              </div>
            )
        }
        return (
            <div>
                {openPullRequests.map((openPullRequest, i) => (
                    <div>
                        <br/>
                        <div className="title2">
                            Repository: {openPullRequest.values[0].destination.repository.name}
                            <br/>
                        </div>
                        <table id='tableID' key={i}>
                            <tbody>
                            <tr key={i}>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Created on</th>
                                <th>Hours Up</th>
                                <th>Link</th>
                            </tr>
                            {openPullRequest.values.map(openPR => (
                                <tr key={openPR.id}>
                                    <td class="PRTitle">{openPR.title}</td>
                                    <td class="author">{openPR.author.display_name}</td>
                                    <td class="created">{new Date(openPR.created_on).toLocaleDateString('en-GB', dateOptions)}</td>
                                    <td className={parseInt(((new Date() - new Date(openPR.created_on)) / 3600000).toFixed(0)) > 24 ? "red" :
                                    (parseInt(((new Date() - new Date(openPR.created_on)) / 3600000).toFixed(0)) < 6 ? "green" : "yellow")}>
                                    {((new Date() - new Date(openPR.created_on)) / 3600000).toFixed(0)}</td>
                                    <td class="link"><a href={openPR.links.html.href}>Open Pull Request</a></td>
                                </tr>
                            ))}
                                <br/>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        openPullRequests: state.pullRequests,
    }
}

export default connect(mapStateToProps, {fetchOpenPullRequests})(PullRequest);