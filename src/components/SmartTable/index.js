import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableRow, TableRowColumn, TableHeaderColumn, TableFooter } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Paginator from '../Paginator';
import { getFieldType, dateFormat, convertToDate, timeFormat } from '../../utils/misc';
import * as configCreators from '../../actions/config';
import * as pagingCreators from '../../actions/paginator';
import * as uiCreators from '../../actions/ui';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
        return {
            items_per_page: state.config.items_per_page,
            actual_page: state.paginator.actual_page,
            editables: state.ui.editing,
            fields_errors: state.ui.fields_errors
        };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, configCreators, pagingCreators, uiCreators), dispatch);
}

const styles = {
    sortButton: {
        fontWeight: "none"
    },
    ascendent: {
        transform: "rotate(180deg)",
        fontWeight: "none"
    },
    avatar: {
        margin: 5
    },
    tableRow: {
        paddingLeft: "45px"
    },
    tableRowAvatar: {
        paddingLeft: "48px"
    }
};

let rowContents;
let data = [];
let editables = [];
let attributes = [];
let error = [];
let floatTime = null;
let values = {};
let asc = true;
let selectedColumn = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class SmartTable extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.sort = this.sort.bind(this);
        this.trimByPage = this.trimByPage.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.getField = this.getField.bind(this);
        this.handleTimeFormat = this.handleTimeFormat.bind(this);
        data = [];
        attributes = [];
        asc = true;
    }

    onClick(row, column, event) {
        this.props.handleClick(rowContents[row]);
        /*We need to force a re-render to rewrite table cells that are editable
        * after click handling*/
        this.forceUpdate();
    }

    sort(value) {
        selectedColumn = value;
        return this.mergeSort(this.props.data, value);
    }

    mergeSort(arr, value){
        if (arr.length < 2)
            return arr;

        let middle = parseInt(arr.length / 2);
        let left   = arr.slice(0, middle);
        let right  = arr.slice(middle, arr.length);

        return this.merge(this.mergeSort(left, value), this.mergeSort(right, value), value);
    }

    setDefaultTimeValue(value){
        floatTime = value;
        return timeFormat(value, 'string');
    }

    updateValues(id){
        if(error.length > 0){
            this.props.openDialogRequest("Error", error[0]);
        }
        else {
            attributes.map(att => {
                if (this.refs[att + "_" + id]) {
                    if (att === "hours") {
                        values[att] = parseFloat(floatTime);
                    }
                    else {
                        values[att] = this.refs[att + "_" + id].getValue();
                    }
                }
            });
            /*values handling*/
            this.props.handlePatch(id, values);
            floatTime = null;
        }
    }

    merge(left, right, value)
    {
        var result = [];

        while (left.length && right.length) {
            if (String(left[0][value]).toLocaleLowerCase() <= String(right[0][value]).toLocaleLowerCase()) {
                if(asc) {
                    result.push(left.shift());
                }
                else{
                    result.push(right.shift());
                }
            } else {
                if(asc) {
                    result.push(right.shift());
                }
                else{
                    result.push(left.shift());
                }
            }
        }

        while (left.length)
            result.push(left.shift());

        while (right.length)
            result.push(right.shift());

        return result;
    }

    trimByPage(){
        let newData = JSON.parse(JSON.stringify(this.props.data));
        const totalItems = this.props.data.length;
        const itemsPerPage = this.props.items_per_page;
        let totalPagines = parseInt(totalItems / itemsPerPage, 10);
        const actual_page = this.props.actual_page;
        let itemsThisPage = (actual_page-1) * itemsPerPage+1;
        if(totalItems % itemsPerPage > 0){
            totalPagines++;
        }
        let limit = (actual_page)*itemsPerPage;
        if(limit > totalItems){
            limit = totalItems;
        }
        let i = 1;
        for(let elem in this.props.data){
            if(!(itemsThisPage <= i && i <= limit)){
                delete newData[elem];
            }
            i++;
        }
        return newData;
    }

    getField(field, element){
        const type = getFieldType(field);
        let result = (
            <div></div>
        );
        switch(type){
            case "text":
                result = (
                    <TextField
                        ref={field+"_"+element["id"]}
                        hintText={"Escrigui aqui el nou valor"}
                        defaultValue={element[field]}
                    />
                );
                break;
            case "date":
                result = (
                    <DatePicker
                        hintText="Introdueixi la nova data"
                        defaultDate={convertToDate(element[field])}
                        onChange={(e, date) => {values[field] = dateFormat(date)+" 00:00:00"}}
                    />
                );
                break;
            case "many2one":
                const many2ones = this.props.many2ones;
                result = many2ones[field];
                break;
            case "hours":
                result = (
                    <TextField
                        ref={field+"_"+element["id"]}
                        hintText="Temps dedicat"
                        defaultValue={this.setDefaultTimeValue(element[field])}
                        onChange={e => this.handleTimeFormat(e.target.value)}
                        errorText={
                            (this.props.fields_errors && "time" in this.props.fields_errors) ? (
                                this.props.fields_errors['time']
                            )
                                :
                            ''
                        }
                    />
                );
                break;

        }
        return result;
    }

    handleTimeFormat(time){
        const res = timeFormat(time, 'float');
        error = [];
        if(res[0] === 'error'){
            error.push(res[1]);
        }
        else if(res[0] === 'ok'){
            floatTime = res[1];
        }
    }

    render(){
        rowContents = [];
        let headers = [];
        let i = 0;
        const columns = this.props.columns;
        attributes = [];
        data = this.trimByPage();
        if(this.props.editables){
            editables = this.props.editables;
        }
        for(let col in columns){
            /*
            * Columns titles retrieving
            * */
            let fontIcon = [];
            if(columns[col][0] == selectedColumn && columns[col][0].toLowerCase() !== "avatar"){
                if(asc){
                    fontIcon.push(
                        <FontIcon
                        className="material-icons">sort</FontIcon>
                    );
                }
                else{
                    fontIcon.push(
                        <FontIcon
                        className="material-icons" style={{transform: 'rotate(180deg)'}}>sort</FontIcon>
                    );
                }
            }
            else{
                fontIcon.push(
                    <FontIcon/>
                );
            }
            headers.push(
                <TableHeaderColumn
                    style={columns[col][1]}
                    key={i}
                >
                    {
                        col.length > 0 && (
                            <FlatButton
                                labelStyle={styles.sortButton}
                                label={col}
                                icon={fontIcon[0]}
                                onTouchTap={() => {
                                    if(columns[col][0].toLowerCase() !== "avatar") {
                                        data = this.sort(columns[col][0]);
                                        asc = !asc;
                                        this.props.handleUpdate(data, false);
                                    }
                                }}
                            />
                        )
                    }
                </TableHeaderColumn>
            );
            attributes.push(columns[col][0]);
            i++;
        }
        if(data.length == 0){
            return(
                <div className="contents" style={{paddingBottom: "20px", paddingTop: "50px"}}>No hi ha dades per mostrar.</div>
            )
        }

        return(
            <div>
                <Table fixedHeader={false} selectable={false} onCellClick={this.onClick}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            {headers}
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false} stripedRows={true}>
                        {
                            /*
                            * Row iteration
                            * */
                            data.map(element => {
                                let i = element.id * -1;
                                let contents = [];
                                rowContents.push(element);
                                /*
                                * Column iteration
                                * */
                                attributes.map(att => {
                                    i-=2;
                                    if(att === 'avatar') {
                                        contents.push(
                                            <TableRowColumn
                                                key={i - 1}
                                                style={styles.tableRowAvatar}
                                            >
                                                <Avatar
                                                    src={String(element[att])}
                                                    size={30}
                                                    style={styles.avatar}
                                                />
                                            </TableRowColumn>
                                        );
                                    }
                                    else if(att === "extras"){
                                        contents.push(
                                            <TableRowColumn key={i-2}>
                                                <IconButton>
                                                    {
                                                        editables.indexOf(element["id"]) == -1 ?
                                                            <FontIcon onTouchTap={() => this.props.handleEdit(element)}
                                                                      className="material-icons">mode_edit</FontIcon>
                                                            :
                                                            <FontIcon onTouchTap={() => this.updateValues(element["id"])}
                                                                      className="material-icons">save</FontIcon>
                                                    }
                                                </IconButton>
                                                <IconButton>
                                                    <FontIcon onTouchTap={() => this.props.handleDelete(element["id"])} className="material-icons">delete</FontIcon>
                                                </IconButton>
                                            </TableRowColumn>
                                        );
                                    }
                                    else{
                                        contents.push(
                                            /*We must check if this field is in edit mode*/
                                            <TableRowColumn
                                                key={i - 1}
                                                style={styles.tableRow}
                                            >
                                                {
                                                    editables.indexOf(element["id"]) == -1 ?
                                                        (
                                                            att === "hours" ?
                                                                timeFormat(element[att], 'string')
                                                            :
                                                                element[att]
                                                        )
                                                    :
                                                    this.getField(att, element)
                                                }
                                            </TableRowColumn>
                                        );
                                    }
                                });
                                return(
                                    <TableRow key={element.id}>
                                        {contents}
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    <TableFooter/>
                </Table>
                <Paginator
                    totalItems={this.props.data.length}
                />
            </div>
        )
    }
}
