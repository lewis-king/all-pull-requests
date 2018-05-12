import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOpenPullRequests} from "../actions/index";

class PullRequest extends Component {

    componentDidMount() {
        console.log("In component did mount");
        this.props.fetchOpenPullRequests();

    }

    render() {
        const openPullRequests = this.props.openPullRequests;
        if (!openPullRequests) {
            return (
                <div>Fetching open pull requests...</div>
            )
        }
        return (
            <div>
                {openPullRequests.map((openPullRequest, i) => (
                    <div>
                        <br/>
                        <div className="title2">
                            Repository: {openPullRequest.values[0].destination.repository.name}
                        </div>
                        <table key={i}>
                            <tbody>
                            <tr key={i}>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Created on</th>
                            </tr>
                            {openPullRequest.values.map(openPR => (
                                <tr key={openPR.id}>
                                    <td>{openPR.title}</td>
                                    <td>{openPR.author.display_name}</td>
                                    <td>{new Date(openPR.created_on).toUTCString()}</td>
                                </tr>
                            ))}
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