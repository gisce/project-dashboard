import React, { Component } from 'react';
import MainPaper from './MainPaper';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const style = {
    margin: 12,
};

export default class Login extends Component {
    render() {
        return(
            <div className="mainPaperContainer_login">
                <MainPaper>
                    <Avatar
                        style={{marginTop: "20px"}}
                        backgroundColor="#00897B"
                        size={80}
                        icon={<FontIcon className="material-icons">lock_outline</FontIcon>}
                    />
                    <br/>
                    <TextField
                        ref="user"
                        floatingLabelText="Usuari"
                    />
                    <br/>
                    <TextField
                        ref="user"
                        floatingLabelText="Contrasenya"
                        type="password"
                    />
                    <br/>
                    <RaisedButton label="Iniciar sessió" primary={true} style={style} />
                </MainPaper>
            </div>
        )
    }
}