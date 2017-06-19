import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
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
import {dateFormat} from '../utils/misc';

function mapStateToProps(state) {
    return {
        active_task: state.tasks.active_task,
        users: state.users,
        projects: state.projects
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, searchCreators, taskWorkCreators, projectCreators, uiCreators), dispatch);
}

let fields = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class NewTask extends Component {
    constructor(props){
        super(props);
        this.createWorkdoneCall = this.createWorkdoneCall.bind(this);
        fields["task_id"] = this.props.params.taskId;
    }

    createWorkdoneCall(){
        if(fields.hasOwnProperty("project_id") && fields.hasOwnProperty("name")) {
            this.props.createTaskWork(TOKEN, fields);
            browserHistory.push("/tasks/"+this.props.params.taskId);
            this.props.openToastRequest("Workdone creat");
        }
        else{
            this.props.openDialogRequest("Atenció", "És necessari escriure el resum del treball i el projecte al qual pertany el workdone.");
        }
    }

    updateFields(field, value){
        fields[field] = value;
    }

    render() {
        let defaultValue = false;
        if(this.props.active_task){
            defaultValue = this.props.active_task["project_id.name"];
            this.updateFields("project_id", this.props.active_task["project_id.id"]);
        }
        console.log(fields);
        return(
            <div>
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
                        />
                        <DatePicker
                            style={{marginTop: "24px"}}
                            hintText="Data de realització"
                            onChange={(e, date) => this.updateFields("date", dateFormat(date))}
                        />
                        <Many2One
                            source={this.props.projects.data}
                            label="Projecte"
                            fieldName="project_id"
                            updateFields={this.updateFields}
                            searchFunction={this.props.searchProjects}
                            defaultValue={defaultValue}
                        />
                    </div>
                    <div className="rightColumn">
                        <TextField
                            floatingLabelText="Temps dedicat"
                            onChange={e => this.updateFields("hours", parseFloat(e.target.value))}
                        />
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
                        route="/tasks"
                    />
                    <LinkButton
                        label="Crear"
                        clickFunction={this.createWorkdoneCall}
                        fields={fields}
                    />
                </div>
            </div>
        )
    }
}