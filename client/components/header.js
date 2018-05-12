import React from 'react';

const Header = (props) => {
    const {org} = props;
    return <div className="title">All Open Pull Requests in {org}</div>
};

export default Header;