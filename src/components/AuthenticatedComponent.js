import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actionCreators from '../actions/auth';
import { validate_token } from '../utils/http_functions'

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export function requireAuthentication(Component) {

    class notAuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
            };
        }

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            const token = localStorage.getItem('token');
            const stateToken = this.props.token;
            if(token && !stateToken){
                this.props.setToken(token);
                this.setState({
                    loaded: true,
                });
            }
            else if (!props.isAuthenticated) {
                browserHistory.push('/login');
            } else {
                this.setState({
                    loaded: true,
                });
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated && this.state.loaded
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );

        }
    }

    notAuthenticatedComponent.propTypes = {
        isAuthenticated: React.PropTypes.bool,
    };

    return connect(mapStateToProps, mapDispatchToProps)(notAuthenticatedComponent);
}
