import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import {setCurrentUser} from '../actions/auth';
import Header from './Header';
import Main from './Main';
import 'semantic-ui-css/semantic.min.css';
import '../styles.css';

export const history = createBrowserHistory();

class App extends Component {

    componentWillMount(){
        // Set current user details if it's logged in
        localStorage.token && this.props.setCurrentUser();
    }

    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    <Header />
                    <Main />
                </React.Fragment>
            </Router>
        );
    }
}

export default connect(null, {setCurrentUser})(App);