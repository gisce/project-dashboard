import React, { Component } from 'react';
import MainPaper from './MainPaper';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authCreators from '../actions/auth';
import * as uiCreators from '../actions/ui';
import LoadingIndicator from './LoadingIndicator';

const style = {
    margin: 12,
    marginTop: 20
};

let fields = {};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        token: state.auth.token,
        error: state.auth.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, authCreators, uiCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }

    login(){
        if("user" in fields && "password" in fields) {
            this.props.basicAuth(fields["user"], fields["password"]);
        }
    }

    render() {
        return(
            <div className="mainPaperContainer_login">
                <MainPaper>
                    {!this.props.isAuthenticating ?
                        <Avatar
                            style={{marginTop: "20px"}}
                            backgroundColor="#00897B"
                            size={80}
                            icon={<FontIcon className="material-icons">lock_outline</FontIcon>}
                        />
                        :
                        <LoadingIndicator
                            size={60}
                        />
                    }
                    <br/>
                    <TextField
                        ref="user"
                        floatingLabelText="Usuari"
                        onChange={e => fields["user"] = e.target.value}
                        disabled={this.props.isAuthenticating}
                    />
                    <br/>
                    <TextField
                        ref="user"
                        floatingLabelText="Contrasenya"
                        type="password"
                        onChange={e => fields["password"] = e.target.value}
                        disabled={this.props.isAuthenticating}
                        errorText={this.props.error}
                    />
                    <br/>
                    <RaisedButton label="Iniciar sessió" primary={true} style={style} onTouchTap={this.login} />
                </MainPaper>
            </div>
        )
    }
}