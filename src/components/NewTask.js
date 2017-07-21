import React, { Component } from 'react';
import MainPaper from './MainPaper';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tasksCreators from '../actions/tasks';
import * as searchCreators from '../actions/search';
import * as uiCreators from '../actions/ui';
import * as breadcrumbCreators from '../actions/breadcrumb';
import LinkButton from './LinkButton';
import Many2One from './Many2One';
import TextField from 'material-ui/TextField';
import {timeFormat} from '../utils/misc';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        projects: state.projects,
        users: state.users,
        active_project: state.projects.active_project,
        fields_errors: state.ui.fields_errors
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, searchCreators, tasksCreators, uiCreators, breadcrumbCreators), dispatch);
}

let fields = {};
let error = [];

@connect(mapStateToProps, mapDispatchToProps)
export default class NewTask extends Component {
    constructor(props){
        super(props);
        this.createTaskCall = this.createTaskCall.bind(this);
        this.reload = this.reload.bind(this);
        this.handleTimeFormat = this.handleTimeFormat.bind(this);
        fields = {};
    }

    componentDidMount(){
        this.props.editItems([]);
    }

    reload(){
        if(this.props.active_project){
            browserHistory.push("/projects/"+ this.props.active_project.id + "/tasks");
        }
        else{
            browserHistory.push("/tasks");
        }
    }

    handleTimeFormat(time){
        const res = timeFormat(time, 'float');
        error = [];
        if(res[0] === 'ok'){
            delete fields["time_error"];
            this.updateFields("planned_hours", res[1]);
        }
        else{
            delete fields["planned_hours"];
            this.updateFields("time_error", res[1]);
            error.push(res[1]);
        }
    }

    createTaskCall(){
        let errors_dict = {};
        if(fields.hasOwnProperty("name") && fields.hasOwnProperty("project_id") && fields.hasOwnProperty("planned_hours") && !fields.hasOwnProperty("time_error")) {
            delete fields["time_error"];
            this.props.createTask(this.props.token, fields, this.reload);
            this.props.openToastRequest("Tasca creada");
        }
        if(!fields.hasOwnProperty("name")){
            errors_dict['resum_tasca'] = 'Camp obligatori';
        }
        if(!fields.hasOwnProperty("project_id")){
            errors_dict['projecte'] = 'Camp obligatori';
        }
        if(!fields.hasOwnProperty("planned_hours")){
            errors_dict['time_error'] = 'Camp obligatori';
        }
        if(error.length > 0){
            errors_dict['time_error'] =  error[0];
        }
        this.props.setFieldsErrors(errors_dict);
    }

    updateFields(field, value){
        if(String(value).length > 0 && String(value) !== "0"){
            fields[field] = value;
        }
        else{
            delete fields[field];
        }
    }

    render() {
        let uri = "/tasks";
        let defaultValue = false;
        if(this.props.active_project){
            uri = "/projects/"+ this.props.active_project.id + "/tasks";
            defaultValue = this.props.active_project.name;
            this.updateFields("project_id", {"id": parseInt(this.props.active_project.id, 10)});
        }
        return(
            <div className="mainPaperSecondaryContainer">
                <MainPaper>
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
                                onChange={e => this.updateFields("name", e.target.value)}
                                errorText={
                                    (this.props.fields_errors && "resum_tasca" in this.props.fields_errors) ? (
                                        this.props.fields_errors['resum_tasca']
                                    )
                                        :
                                    ''
                                }
                            />
                            <TextField
                                floatingLabelText="Hores estimades"
                                onChange={e => this.handleTimeFormat(e.target.value)}
                                errorText={
                                    (this.props.fields_errors && "time_error" in this.props.fields_errors) ? (
                                        this.props.fields_errors['time_error']
                                    )
                                        :
                                    ''
                                }
                            />
                        </div>
                        <div className="rightColumn">
                            <Many2One
                                source={this.props.projects.data}
                                label="Projecte"
                                fieldName="project_id"
                                updateFields={this.updateFields}
                                searchFunction={this.props.searchProjects}
                                defaultValue={defaultValue}
                                errorText={
                                    (this.props.fields_errors && "projecte" in this.props.fields_errors) ? (
                                        this.props.fields_errors['projecte']
                                    )
                                        :
                                    ''
                                }
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
                            route={uri}
                        />
                        <LinkButton
                            label="Crear"
                            clickFunction={this.createTaskCall}
                            fields={fields}
                        />
                    </div>
                </MainPaper>
            </div>
        )
    }
}