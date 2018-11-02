import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOpenPullRequests} from "../actions/index";

class PullRequest extends Component {

    componentDidMount() {
        console.log("In component did mount");
        this.props.fetchOpenPullRequests();
    }

    calculateHours(date){
        return parseInt(((new Date() - new Date(date)) / 3600000).toFixed(0));
    }

    render() {
        const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};
        const openPullRequests = this.props.openPullRequests;
        if (!openPullRequests) {
            return <img className="spinner" src="Spinner.svg"/>
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
                        <table key={i}>
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
                                    <td className={(this.calculateHours(openPR.created_on) > 24 ? "red" : this.calculateHours(openPR.created_on) < 6 ? "green" : "yellow")}>
                                    {(this.calculateHours(openPR.created_on))}</td>
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