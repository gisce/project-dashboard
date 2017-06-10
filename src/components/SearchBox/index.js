import React, { Component } from 'react'
import { TOKEN } from '../../constants/index';
import TextField from 'material-ui/TextField';
import * as actionCreators from '../../actions/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
        return {
            data: state.projects,
            token: null,
            loaded: state.projects.loaded,
            isFetching: state.projects.isFetching,
            message_text: state.projects.message_text,
        };
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
        if(!this.props.filter_id) {
            this.props.searchFunction(TOKEN, e.target.value, this.props.field, false);
        }
        else{
            this.props.searchFunction(TOKEN, e.target.value, this.props.field, this.props.filter_id, false);
        }
    }
}