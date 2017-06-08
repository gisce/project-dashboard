import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectCreators from '../actions/projects';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import LinkButton from './LinkButton';
import {dateFormat} from '../utils/misc';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(projectCreators, dispatch);
}

let fields = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class NewProject extends Component {
    constructor(props){
        super(props);
        this.createProjectCall = this.createProjectCall.bind(this);
    }

    createProjectCall(){
        //this.props.createProject(TOKEN, {'name': 'molta mel'})
        console.log(JSON.stringify(fields));
    }

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
                            onChange={e => fields["name"] = e.target.value}
                        />
                        <DatePicker
                            hintText="Data d'inici"
                            onChange={(e, date) => fields["date_start"] = dateFormat(date)}
                        />
                        <DatePicker
                            hintText="Finalització prevista"
                            onChange={(e, date) => fields["date_end"] = dateFormat(date)}
                        />
                    </div>
                    <div className="rightColumn">
                        <TextField
                            floatingLabelText="Responsable"
                            onChange={e => fields["manager"] = e.target.value}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="Projecte pare"
                            onChange={e => fields["parent_id"] = e.target.value}
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
                        route="/projects"
                        clickFunction={this.createProjectCall}
                    />
                </div>
            </div>
        )
    }
}