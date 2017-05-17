import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableRow, TableRowColumn, TableHeaderColumn, TableFooter } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar'

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

export default class SmartTable extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(row, column, event) {
        this.props.handleClick(rowContents[row]);
    }

    sort(key) {

    }

    render(){
        rowContents = [];
        let headers = [];
        let attributes = [];
        let i = 0;
        const columns = this.props.columns;
        for(var col in columns){
            /*
            * Columns titles retrieving
            * */
            headers.push(
                <TableHeaderColumn key={i}>
                    <FlatButton
                        labelStyle={styles.sortButton}
                        label={col}
                        icon={<FontIcon className="material-icons">sort</FontIcon>}
                        onTouchTap={this.sort(i)}
                    />
                </TableHeaderColumn>
            );
            attributes.push(columns[col]);
            i++;
        }
        const data = this.props.data;
        return(
            <Table style={{ tableLayout: 'auto' }} fixedHeader={false}  onCellClick={this.onClick}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {headers}
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} displayRowCheckbox={false} stripedRows={true}>
                    {
                        data.map(element => {
                            let i = element.id * -1;
                            let contents = [];
                            rowContents.push(element);
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
                                                <FontIcon onTouchTap={this.props.handleEdit()} className="material-icons">mode_edit</FontIcon>
                                            </IconButton>
                                            <IconButton>
                                                <FontIcon onTouchTap={this.props.handleDelete()} className="material-icons">delete</FontIcon>
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
        )
    }
}
