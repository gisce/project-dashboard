import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectCreators from '../actions/projects';
import * as searchCreators from '../actions/search';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import LinkButton from './LinkButton';
import {dateFormat} from '../utils/misc';

function mapStateToProps(state) {
    return {
        isFetching: state.projects.isFetching,
        projects: state.projects
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, searchCreators, projectCreators), dispatch);
}

let fields = {};

let projects = [];

let parentProjectSearchText = "";

@connect(mapStateToProps, mapDispatchToProps)
export default class NewProject extends Component {
    constructor(props){
        super(props);
        this.createProjectCall = this.createProjectCall.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
    }

    createProjectCall(){
        //this.props.createProject(TOKEN, {'name': 'molta mel'})
        console.log(JSON.stringify(fields));
    }

    handleUpdateInput(textToSearch){
        parentProjectSearchText = textToSearch;
        this.props.searchProjects(TOKEN, textToSearch, "name", false, false)
    };

    handleNewRequest(){
        console.log("item clicat");
    };

    render() {
        projects = [];
        if(!this.props.isFetching && parentProjectSearchText.length >= 1){
            if(this.props.projects.data) {
                for (let i = 0; i < this.props.projects.data.length; i++) {
                    projects.push(this.props.projects.data[i].name);
                }
            }
        }
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
                        <AutoComplete
                          hintText="Projecte pare"
                          searchText={parentProjectSearchText}
                          onUpdateInput={this.handleUpdateInput}
                          onNewRequest={this.handleNewRequest}
                          dataSource={projects}
                          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                          openOnFocus={true}
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