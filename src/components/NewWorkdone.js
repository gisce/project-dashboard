import React, { Component } from 'react';
import MainPaper from './MainPaper';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskWorkCreators from '../actions/task_work';
import * as projectCreators from '../actions/projects';
import * as searchCreators from '../actions/search';
import * as uiCreators from '../actions/ui';
import TextField from 'material-ui/TextField';
import LinkButton from './LinkButton';
import Many2One from './Many2One';
import DatePicker from 'material-ui/DatePicker';
import {dateFormat, timeFormat} from '../utils/misc';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        active_task: state.tasks.active_task,
        users: state.users,
        projects: state.projects,
        fields_errors: state.ui.fields_errors
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, searchCreators, taskWorkCreators, projectCreators, uiCreators), dispatch);
}

let fields = {};
let error = [];

@connect(mapStateToProps, mapDispatchToProps)
export default class NewTask extends Component {
    constructor(props){
        super(props);
        this.createWorkdoneCall = this.createWorkdoneCall.bind(this);
        this.reload = this.reload.bind(this);
        this.handleTimeFormat = this.handleTimeFormat.bind(this);
        fields = {};
        fields["task_id"] = {"id": parseInt(this.props.params.taskId, 10)};
    }

    reload(){
        browserHistory.push("/tasks/"+this.props.params.taskId);
    }

    createWorkdoneCall(){
        let errors_dict = {};
        if(!fields.hasOwnProperty("hours")){
            errors_dict['time_error'] = 'Camp obligatori';
        }
        if(!fields.hasOwnProperty("name")){
            errors_dict['treball'] = 'Camp obligatori';
        }
        if(fields.hasOwnProperty("hours") && fields.hasOwnProperty("name") && !fields.hasOwnProperty("time_error")){
            delete fields["time_error"];
            this.props.setFieldsErrors({});
            this.props.createTaskWork(this.props.token, fields, this.reload);
            this.props.openToastRequest("Workdone creat");
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

    handleTimeFormat(time){
        const res = timeFormat(time, 'float');
        error = [];
        if(res[0] === 'ok'){
            delete fields["time_error"];
            this.updateFields("hours", res[1]);
        }
        else{
            delete fields["hours"];
            this.updateFields("time_error", res[1]);
            error.push(res[1]);
        }
    }

    render() {
        return(
            <div className="mainPaperSecondaryContainer">
                <MainPaper>
                    <div className="leftContainer">
                        <div>
                            <div className="title">
                                Nou workdone
                            </div>
                        </div>
                    </div>
                    <div className="contents">
                        <div className="leftColumn">
                            <TextField
                                floatingLabelText="Resum del treball"
                                onChange={e =>  this.updateFields("name", e.target.value)}
                                errorText={
                                    (this.props.fields_errors && "treball" in this.props.fields_errors) ? (
                                        this.props.fields_errors['treball']
                                    )
                                        :
                                    ''
                                }
                            />
                            <DatePicker
                                style={{marginTop: "24px"}}
                                hintText="Data de realització"
                                onChange={(e, date) => this.updateFields("date", dateFormat(date)+" 00:00:00")}
                            />
                        </div>
                        <div className="rightColumn">
                            <TextField
                                floatingLabelText="Temps dedicat"
                                onChange={e => this.handleTimeFormat(e.target.value)}
                                errorText={
                                    (this.props.fields_errors && "time_error" in this.props.fields_errors) ? (
                                        this.props.fields_errors['time_error']
                                    )
                                        :
                                    ''
                                }
                            />
                            <br/>
                            <Many2One
                                source={this.props.users.data}
                                label="Realitzat per"
                                fieldName="user_id"
                                updateFields={this.updateFields}
                                searchFunction={this.props.searchUsers}
                            />
                        </div>
                    </div>
                    <div className="lowerButtons">
                        <LinkButton
                            label="Cancel·lar"
                            route={"/tasks/"+this.props.params.taskId}
                        />
                        <LinkButton
                            label="Crear"
                            clickFunction={this.createWorkdoneCall}
                            fields={fields}
                        />
                    </div>
                </MainPaper>
            </div>
        )
    }
}
