import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import * as actionCreators from '../../actions/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
//     // if(this.props.model == "project.project") {
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

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.searchRequest = this.searchRequest.bind(this);
    }

    render(){
        return(
            <TextField
                floatingLabelText="Cerca"
                onChange={this.searchRequest}
            />
        )
    }

    searchRequest(e) {
        if(!this.props.filter_id) {
            this.props.searchFunction(e.target.value, false);
        }
        else{
            this.props.searchFunction(e.target.value, this.props.filter_id, false);
        }
    }
}