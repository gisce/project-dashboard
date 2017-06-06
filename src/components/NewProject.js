import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import LinkButton from './LinkButton';

export default class NewProject extends Component {
    render() {
        const DateTimeFormat = global.Intl.DateTimeFormat;
        return(
            <div>
                <div className="leftContainer">
                    {
                        !this.props.isFetching && (
                            <div>
                                <div className="title">
                                    Nou projecte
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="contents">
                    <div className="leftColumn">
                        <TextField
                            floatingLabelText="Nom del projecte"
                            onChange={console.log("mel")}
                        />
                        <DatePicker
                            hintText="Data d'inici"
                        />
                        <DatePicker
                            hintText="Finalització prevista"
                        />
                    </div>
                    <div className="rightColumn">
                        <TextField
                            floatingLabelText="Responsable"
                            onChange={console.log("mel")}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Projecte pare"
                            onChange={console.log("mel")}
                        />
                    </div>
                </div>
                <div className="lowerButtons">
                    <LinkButton
                        label="Cancel·lar"
                        route="/projects"
                    />
                    <LinkButton
                        label="Crear"
                    />
                </div>
            </div>
        )
    }
}