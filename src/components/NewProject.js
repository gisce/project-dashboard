import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectCreators from '../actions/projects';
import * as searchCreators from '../actions/search';
import * as uiCreators from '../actions/ui';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Alert from './Alert';
import LoadingIndicator from './LoadingIndicator';
import LinkButton from './LinkButton';
import Many2One from './Many2One';
import {dateFormat} from '../utils/misc';

function mapStateToProps(state) {
    return {
        projects: state.projects,
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, searchCreators, projectCreators, uiCreators), dispatch);
}

let fields = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class NewProject extends Component {
    constructor(props){
        super(props);
        this.createProjectCall = this.createProjectCall.bind(this);
        fields = {};
    }

    updateFields(field, value){
        fields[field] = value;
    }

    createProjectCall(){
        if(fields.hasOwnProperty("name")) {
            this.props.createProject(TOKEN, fields);
            browserHistory.push("/projects");
            this.props.openToastRequest("Projecte creat");
        }
        else{
            this.props.openDialogRequest("Atenció", "És necessari escriure el nom del projecte.");
        }
    }

    render() {
        const isFetching = false;
        return(
            <div>
                <div className="leftContainer">
                    <div>
                        <div className="title">
                            Nou projecte
                        </div>
                    </div>
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
                        <Many2One
                            source={this.props.users.data}
                            label="Responsable"
                            fieldName="manager"
                            updateFields={this.updateFields}
                            searchFunction={this.props.searchUsers}
                        />
                        <br/>
                        <Many2One
                            source={this.props.projects.data}
                            label="Projecte pare"
                            fieldName="parent_id"
                            updateFields={this.updateFields}
                            searchFunction={this.props.searchProjects}
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
                        clickFunction={this.createProjectCall}
                    />
                </div>
            </div>
        )
    }
}