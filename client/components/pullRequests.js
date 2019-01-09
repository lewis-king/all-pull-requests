import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOpenPullRequests} from "../actions/index";
import moment from "moment-business-time";

moment.locale('en', {
            holidays:
                ['*-01-01','*-12-25','*-12-26']
        });

class PullRequest extends Component {

    componentDidMount() {
        console.log("In component did mount");
        this.props.fetchOpenPullRequests();
    }

    calculateHours(date){
        return parseInt(((moment(new Date().toString()).workingDiff(new Date(date).toString())) / 3600000).toFixed(0));
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
                                <th>Business<br/>Hours Up</th>
                                <th>Link</th>
                            </tr>
                            {openPullRequest.values.map(openPR => (
                                <tr key={openPR.id}>
                                    <td className="PRTitle">{openPR.title}</td>
                                    <td className="author">{openPR.author.display_name}</td>
                                    <td className="created">{new Date(openPR.created_on).toLocaleDateString('en-GB', dateOptions)}</td>
                                    <td className={(this.calculateHours(openPR.created_on) > 24 ? "red" : this.calculateHours(openPR.created_on) < 8 ? "green" : "yellow")}>
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