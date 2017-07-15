import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import * as configCreators from '../../actions/config';
import * as pagingCreators from '../../actions/paginator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PreviousButton from '../PreviousButton';
import NextButton from '../NextButton';
import PageButton from '../PageButton';

function mapStateToProps(state) {
        return {
            items_per_page: state.config.items_per_page,
            actual_page: state.paginator.actual_page
        };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, configCreators, pagingCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Paginator extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const separator = [
            <span key={0}>
                &nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;
            </span>
        ];
        let singlePage = false;
        let buttons = [];
        const totalItems = this.props.totalItems;
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
            if(totalItems < itemsPerPage) {
                singlePage = true;
            }
        }
        if(actual_page >= 4 && totalPagines != 4){
            buttons.push(
                <PageButton key={actual_page-1} number={actual_page-1}/>
            );
            buttons.push(
                <PageButton key={actual_page} number={actual_page} selected={true}/>
            );
            if(actual_page < totalPagines) {
                buttons.push(
                    <PageButton key={actual_page+1} number={actual_page + 1}/>
                );
            }
        }
        else{
            for(let i = 1; i <= actual_page+1; i++){
                if(i <= totalPagines) {
                    if (i == actual_page) {
                        buttons.push(
                            <PageButton key={i} number={i} selected={true}/>
                        );
                    }
                    else {
                        buttons.push(
                            <PageButton key={i} number={i}/>
                        );
                    }
                }
            }
        }

        return(
            <div className="paginatorContainer">
                <div className="leftPaginatorContainer">
                    {itemsThisPage} - {limit} de {totalItems}
                </div>
                {
                    !singlePage && (
                        <div className="rightPaginatorContainer">
                            {
                                actual_page > 1 &&
                                <PreviousButton key={-1}/>
                            }
                            {
                                (actual_page >= 4 && totalPagines != 4) &&
                                    <span key={-2}>
                                        <PageButton
                                            key={1}
                                            number={1}
                                        />
                                        {separator}
                                    </span>
                            }
                            {buttons}
                            {
                                actual_page < totalPagines - 2 &&
                                    <span key={-3}>
                                        {separator}
                                        <PageButton
                                            key={totalPagines+1}
                                            number={totalPagines}
                                        />
                                        <NextButton
                                            key={actual_page + 3}
                                        />
                                    </span>
                            }
                            {
                                actual_page == totalPagines -2 &&
                                <PageButton
                                    key={totalPagines}
                                    number={totalPagines}
                                />
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}