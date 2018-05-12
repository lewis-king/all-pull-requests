export const FETCH_OPEN_PULL_REQUEST = "FETCH_OPEN_PULL_REQUEST";

export function fetchOpenPullRequests() {
    return function (dispatch) {
        const payload = {
            space: "controlsfx",
            repo: "controlsfx"
        };
        return fetch("pull-requests/open/", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json();
        }).then((result) => {
            return dispatch(fetchOpenPullRequestsSuccess(result));
        }).catch(error => {
            throw(error);
        })
    }
}

export function fetchOpenPullRequestsSuccess(payload) {
    return {type: FETCH_OPEN_PULL_REQUEST, payload};
}