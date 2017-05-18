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
        for(let col in columns){
            /*
            * Columns titles retrieving
            * */
            headers.push(
                <TableHeaderColumn key={i}>
                    {
                        col.length > 0 && (
                            <FlatButton
                                labelStyle={styles.sortButton}
                                label={col}
                                icon={<FontIcon
                                    className="material-icons">sort</FontIcon>}
                                onTouchTap={this.sort(i)}
                            />
                        )
                    }
                </TableHeaderColumn>
            );
            attributes.push(columns[col]);
            i++;
        }
        const data = this.props.data;
        if(data.length == 0){
            return(
                <div className="contents" style={{paddingBottom: "20px", paddingTop: "50px"}}>No hi ha dades per mostrar.</div>
            )
        }

        return(
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
        )
    }
}
