import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import * as searchCreators from '../../actions/search';
import * as paginatorSearch from '../../actions/paginator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
        return {
            token: state.auth.token,
            data: state.projects,
            loaded: state.projects.loaded,
            isFetching: state.projects.isFetching,
            message_text: state.projects.message_text,
        };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, searchCreators, paginatorSearch), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.searchRequest = this.searchRequest.bind(this);
    }


    render(){
        let label = "Cerca";
        if(this.props.label){
            label = this.props.label;
        }
        return(
            <TextField
                floatingLabelText={label}
                onChange={this.searchRequest}
            />
        )
    }

    searchRequest(e) {
        this.props.setActualPage(1);
        if(!this.props.filter_id) {
            this.props.searchFunction(this.props.token, e.target.value, this.props.field, false);
        }
        else{
            this.props.searchFunction(this.props.token, e.target.value, this.props.field, this.props.filter_id, false);
        }
    }
}