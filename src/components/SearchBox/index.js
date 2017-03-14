import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import * as actionCreators from '../../actions/tasks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    // if(this.props.model == "project.project") {
        return {
            data: state.projects,
            token: null,
            loaded: state.projects.loaded,
            isFetching: state.projects.isFetching,
            message_text: state.projects.message_text,
        };
    // }
    // else if(this.props.model == "project.task") {
    //     return {
    //         data: state.tasks,
    //         token: null,
    //         loaded: state.tasks.loaded,
    //         isFetching: state.tasks.isFetching,
    //         message_text: state.tasks.message_text,
    //     };
    // }
    // else{
    //     return {}
    // }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


const style = {
    search: {
        float: 'right',
        padding: 0,
        margin: 0
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.searchRequest = this.searchRequest.bind(this);
    }

    render(){
        return(
            <TextField
                style={style.search}
                floatingLabelText="Cerca"
                onChange={this.searchRequest}
            />
        )
    }

    searchRequest(e) {
        let token = "FOO";
        this.props.searchProjects(token, e.target.value, false);
    }
}