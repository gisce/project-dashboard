import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import MainPaper from './MainPaper';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as configCreators from '../actions/config';
import TextField from 'material-ui/TextField';
import LinkButton from './LinkButton';

function mapStateToProps(state) {
    return {
        items_per_page: state.config.items_per_page
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, configCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ConfigView extends Component {
    constructor(props){
        super(props);
        this.updateItemsPerPage = this.updateItemsPerPage.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            'error': false
        };
    }

    updateItemsPerPage(){
        const new_items_per_page = this.refs["items_per_page_text_field"].getValue();
        if(!this.state.error){
            this.props.setItemsPerPage(new_items_per_page);
            const cookies = new Cookies();
            cookies.set('items_per_page', new_items_per_page, { path: '/' });
            browserHistory.push("/projects");
        }
    }

    validate(value){
        if(/^\d+$/.test(value)){
            this.setState({
                'error': false
            });
        }
        else{
            this.setState({
                'error': "Només es poden introduir números"
            });
        }
    }

    render() {
        return(
            <div className="mainPaperSecondaryContainer">
                <MainPaper>
                    <div className="leftContainer">
                        <div>
                            <div className="title">
                                Configuració
                            </div>
                        </div>
                    </div>
                    <div className="contents">
                        <div className="leftColumn">
                            <TextField
                                ref="items_per_page_text_field"
                                defaultValue={this.props.items_per_page}
                                floatingLabelText="Files per pàgina"
                                onChange={e => this.validate(e.target.value)}
                                errorText={
                                    (this.state.error) ? (
                                        this.state.error
                                    )
                                        :
                                    ''
                                }
                            />
                        </div>
                    </div>
                    <div className="lowerButtons">
                        <LinkButton
                            label="Cancel·lar"
                            route="/projects"
                        />
                        <LinkButton
                            label="Desar"
                            clickFunction={this.updateItemsPerPage}
                        />
                    </div>
                </MainPaper>
            </div>
        )
    }
}