import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableRow, TableRowColumn, TableHeaderColumn, TableFooter } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Paginator from '../Paginator';
import * as configCreators from '../../actions/config';
import * as pagingCreators from '../../actions/paginator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
        return {
            items_per_page: state.config.items_per_page,
            actual_page: state.paginator.actual_page
        };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, configCreators, pagingCreators), dispatch);
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
    }
};

let rowContents;
let data = [];
let asc = true;
let selectedColumn = null;

@connect(mapStateToProps, mapDispatchToProps)
export default class SmartTable extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.sort = this.sort.bind(this);
        this.trimByPage = this.trimByPage.bind(this);
        data = [];
        asc = true;
    }

    onClick(row, column, event) {
        this.props.handleClick(rowContents[row]);
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
        /*let i = 1; i <= totalItems; i++*/
        for(let elem in this.props.data){
            if(!(itemsThisPage <= i && i <= limit)){
                delete newData[elem];
            }
            i++;
        }
        return newData;
    }

    render(){
        rowContents = [];
        let headers = [];
        let attributes = [];
        let i = 0;
        const columns = this.props.columns;
        data = this.trimByPage();
        for(let col in columns){
            /*
            * Columns titles retrieving
            * */
            let fontIcon = [];
            if(columns[col] == selectedColumn && columns[col].toLowerCase() !== "avatar"){
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
                <TableHeaderColumn key={i}>
                    {
                        col.length > 0 && (
                            <FlatButton
                                labelStyle={styles.sortButton}
                                label={col}
                                icon={fontIcon[0]}
                                onTouchTap={() => {
                                    if(columns[col].toLowerCase() !== "avatar") {
                                        data = this.sort(columns[col]);
                                        asc = !asc;
                                        this.props.handleUpdate(data, false);
                                    }
                                }}
                            />
                        )
                    }
                </TableHeaderColumn>
            );
            attributes.push(columns[col]);
            i++;
        }
        if(data.length == 0){
            return(
                <div className="contents" style={{paddingBottom: "20px", paddingTop: "50px"}}>No hi ha dades per mostrar.</div>
            )
        }

        return(
            <div>
                <Table style={{ tableLayout: 'auto' }} fixedHeader={false}  onCellClick={this.onClick}>
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
                                            <TableRowColumn key={i - 1}>
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
                                                    <FontIcon onTouchTap={() => this.props.handleEdit(element)} className="material-icons">mode_edit</FontIcon>
                                                </IconButton>
                                                <IconButton>
                                                    <FontIcon onTouchTap={() => this.props.handleDelete(element)} className="material-icons">delete</FontIcon>
                                                </IconButton>
                                            </TableRowColumn>
                                        );
                                    }
                                    else{
                                        contents.push(
                                            <TableRowColumn key={i - 1}>{element[att]}</TableRowColumn>
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
