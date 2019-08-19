import React, { Component } from "react";
import { Router, Route, Link } from 'react-router-dom';

import {history} from 'services/history.js';
import { authenticationService } from 'services/authentication.service.js';
import {PrivateRoute} from 'components/PrivateRoute.jsx';
import AdminLayout from 'layouts/Admin.jsx';
import LoginPage from 'layouts/Login.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }
	
	componentDidMount() {
		authenticationService.logout();
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    
    render() {
        const { currentUser } = this.state;
        return (
              <Router history={history}>
                <div>
                    <div className="">
                        <div>
                            <div className="content">
                                <div className="">
                                    <PrivateRoute exact path="/" component={AdminLayout} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;