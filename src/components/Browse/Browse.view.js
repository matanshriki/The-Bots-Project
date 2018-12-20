import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '../List';
import Filter from '../Filter';
import Profile from '../Profile';

import { filterBot, chooseBot } from './browse.actions';

class Browse extends Component {
    // componentDidMount()
    render() {
        const {
            original_list,
            displayed_list,
            profile_data,
            doFilterUsers,
            doUpdateUsers,
            isLoading,
            errorMsg
        } = this.props;

        if (isLoading === true) {
            return (
                console.log("loading")
            )
        } else {
            return (
                <div className="app">
                    <div className="header">
                        <h1 className="headline">Browse our bots</h1>
                        <div className="filter-box">
                            <h4 className="filter_title">{displayed_list.length} items filtered</h4>
                            <Filter className="filter" list_data={original_list} on_filter={doFilterUsers} />
                        </div>
                    </div>
                    <div className="content-box">
                        <Profile {...profile_data} />
                        <List list_data={displayed_list}
                            pick={doUpdateUsers} />
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    const {
        original_list,
        displayed_list,
        profile_data,
        isLoading,
        errorMsg
    } = state.browse;

    return {
        original_list,
        displayed_list,
        profile_data,
        isLoading,
        errorMsg
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        doFilterUsers: (filtered) => dispatch(filterBot(filtered)),
        doUpdateUsers: (user) => dispatch(chooseBot(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Browse);