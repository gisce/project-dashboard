import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableFooter } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

const styles = {
    sortButton: {
        fontWeight: "none"
    },
    ascendent: {
        transform: "rotate(180deg)",
        fontWeight: "none"
    }
};

export default class List extends Component {
    render(){
        let contents = [];
        for(let i = 0; i<this.props.columns.length; i++){
            contents.push(
                <TableHeaderColumn key={i}>
                    {
                        this.props.columns[i].length > 0 ?
                            <FlatButton
                                labelStyle={styles.sortButton}
                                label={this.props.columns[i]}
                                icon={<FontIcon className="material-icons">sort</FontIcon>}
                                onTouchTap={this.sort(i)}
                            />
                            :
                            ""
                    }
                </TableHeaderColumn>
            )
        }
        return(
            <Table style={{ tableLayout: 'auto' }} fixedHeader={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {contents}
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} displayRowCheckbox={false} stripedRows={true}>
                    {this.props.tableBody}
                </TableBody>
                <TableFooter/>
            </Table>
        )
    }
    sort(key){

    }
}