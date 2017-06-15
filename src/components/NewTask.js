import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tasksCreators from '../actions/tasks';
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
    return bindActionCreators(Object.assign({}, searchCreators, tasksCreators, uiCreators), dispatch);
}

let fields = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class NewTask extends Component {
    constructor(props){
        super(props);
        this.createTaskCall = this.createTaskCall.bind(this);
    }

    createTaskCall(){
        if(fields.hasOwnProperty("name") && fields.hasOwnProperty("project_id") && fields.hasOwnProperty("planned_hours")) {
            this.props.createTask(TOKEN, fields);
            browserHistory.push("/tasks");
            this.props.openToastRequest("Tasca creada");
        }
        else{
            this.props.openDialogRequest("Atenció", "És necessari escriure el resum de la tasca, el projecte al qual pertany i les hores planificades.");
        }
    }

    updateFields(field, value){
        fields[field] = value;
    }

    render() {
        return(
            <div>
                <div className="leftContainer">
                    <div>
                        <div className="title">
                            Nova tasca
                        </div>
                    </div>
                </div>
                <div className="contents">
                    <div className="leftColumn">
                        <TextField
                            floatingLabelText="Resum de la tasca"
                            onChange={e => fields["name"] = e.target.value}
                        />
                        <TextField
                            floatingLabelText="Hores estimades"
                            onChange={e => fields["planned_hours"] = parseFloat(e.target.value)}
                        />
                    </div>
                    <div className="rightColumn">
                        <Many2One
                            source={this.props.projects.data}
                            label="Projecte"
                            fieldName="project_id"
                            updateFields={this.updateFields}
                            searchFunction={this.props.searchProjects}
                        />
                        <br/>
                        <Many2One
                            source={this.props.users.data}
                            label="Responsable"
                            fieldName="user_id"
                            updateFields={this.updateFields}
                            searchFunction={this.props.searchUsers}
                        />
                    </div>
                </div>
                <div className="lowerButtons">
                    <LinkButton
                        label="Cancel·lar"
                        route="/tasks"
                    />
                    <LinkButton
                        label="Crear"
                        clickFunction={this.createTaskCall}
                        fields={fields}
                    />
                </div>
            </div>
        )
    }
}