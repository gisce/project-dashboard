import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import * as actionCreators from '../../actions/companies';
import {redirectToRoute} from '../../utils/http_functions'


function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {margin: 5};

@connect(mapStateToProps, mapDispatchToProps)
export default class Company extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {
            company,
            ...otherProps} = this.props;
        return(
            <TableRow {...otherProps} onCellClick={redirectToRoute("/company/"+company.id)}>
                <TableRowColumn>{company.name}</TableRowColumn>
                <TableRowColumn>{company.city}</TableRowColumn>
                <TableRowColumn>{company.country}</TableRowColumn>
            </TableRow>
        )
    }
}