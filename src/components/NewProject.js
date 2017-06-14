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
import Dialog from 'material-ui/Dialog';
import LoadingIndicator from './LoadingIndicator';
import FlatButton from 'material-ui/FlatButton';
import LinkButton from './LinkButton';
import Many2One from './Many2One';
import {dateFormat} from '../utils/misc';

function mapStateToProps(state) {
    return {
        isFetching: state.projects.isFetching,
        projects: state.projects,
        users: state.users,
        dialog_open: state.ui.dialog_open
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, searchCreators, projectCreators, uiCreators), dispatch);
}

let fields = {};

let parentProjectSearchText = "";

@connect(mapStateToProps, mapDispatchToProps)
export default class NewProject extends Component {
    constructor(props){
        super(props);
        this.createProjectCall = this.createProjectCall.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
        parentProjectSearchText = "";
    }

    updateFields(field, value){
        fields[field] = value;
    }

    handleDialog(){
        if(this.props.dialog_open){
            this.props.closeDialogRequest();
        }
        else{
            this.props.openDialogRequest();
        }
    }

    createProjectCall(){
        if(fields.hasOwnProperty("name")) {
            this.props.createProject(TOKEN, fields);
            browserHistory.push("/projects");
        }
        else{
            this.props.openDialogRequest();
        }
    }

    render() {
        const actions = [
          <FlatButton
            label="D'acord"
            primary={true}
            onTouchTap={this.handleDialog}
          />,
        ];
        return(
            this.props.isFetching ?
                <LoadingIndicator/>
                :
                <div>
                    <Dialog
                      actions={actions}
                      title="Atenció"
                      modal={false}
                      open={this.props.dialog_open}
                      onRequestClose={this.handleDialog}
                    >
                      És necessari escriure el nom del projecte.
                    </Dialog>
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
                            fields={fields}
                        />
                    </div>
                </div>
        )
    }
}