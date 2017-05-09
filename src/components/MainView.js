import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import MainPaper from './MainPaper'
import SearchBox from './SearchBox';
import CircularProgress from 'material-ui/CircularProgress'

function mapStateToProps(state) {
    return {
        data: state.projects,
        loaded: state.projects.loaded,
        isFetching: state.projects.isFetching,
        message_text: state.projects.message_text,
    };
}

const estils = {
    container: {
        width: "70%",
        paddingLeft: "15%",
        paddingRight: "15%",
        paddingTop: 120,
        paddingBottom: 30
    },
    contenidorSuperiorEsquerra: {
        position: "relative",
        float: "left"
    },
    contenidorSuperiorDreta: {
        position: "relative",
        float: "right",
        textAlign: "right",
        right: 5,
        top: 5
    },
    titol: {
        paddingTop: 20,
        paddingLeft: 20,
        fontSize: 26
    },
    breadcrumb: {
        paddingTop: 6,
        paddingLeft: 20,
        fontSize: 14
    },
    botonsSuperiors: {

    },
    search_box: {
        fontSize: 26
    },
    continguts: {
        clear: "both",
        width: '100%',
        paddingTop: 30,
        paddingLeft: 20
    },
    filtres: {
        clear: "both",
        width: '100%'
    },
    taula: {
        clear: "both",
        width: '100%'
    },
    loading: {
        width: "100%",
        textAlign: "center",
        paddingBottom: 50,
        paddingTop: 50
    }
};

@connect(mapStateToProps)
export default class MainView extends Component {
    render() {
        let extraButtons = [];
        if(this.props.filters !== "disabled"){
            extraButtons.push(
                <FlatButton
                    key="-1"
                    label="Filtres"
                    primary={true}
                    icon={<FontIcon className="material-icons">filter_list</FontIcon>}
                    onTouchTap={this.addFilter}
                />
            );
        }
        if(this.props.newButton !== "disabled"){
            extraButtons.push(
                <FlatButton
                    key="-2"
                    label="Nou"
                    primary={true}
                    icon={<FontIcon className="material-icons">note_add</FontIcon>}
                    onTouchTap={this.newItem}
                />
            );
        }
        return(
            <div style={estils.container}>
                <MainPaper>
                    <div style={estils.contenidorSuperiorEsquerra}>
                        {
                            this.props.fetching ?
                                <div></div>
                            :
                            <div>
                                <div style={estils.titol}>
                                    {this.props.title}
                                </div>
                                <div style={estils.breadcrumb}>
                                    {this.props.breadcrumb}
                                </div>
                            </div>
                        }
                    </div>
                    <div style={estils.contenidorSuperiorDreta}>
                        {
                            this.props.fetching ?
                                <div></div>
                            :
                            <div style={estils.botonsSuperiors}>
                                {this.props.buttons}
                                {extraButtons}
                                <FlatButton
                                    key="-3"
                                    label="Refrescar"
                                    primary={true}
                                    icon={<FontIcon className="material-icons">refresh</FontIcon>}
                                    onTouchTap={this.props.refresh}
                                />
                            </div>
                        }
                        <div style={estils.search_box}>
                            {this.props.model && !this.props.fetching ?
                                <SearchBox filter_id={this.props.filter_id} model={this.props.model}/>
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                    <div style={estils.continguts}>
                        {
                            this.props.fetching && this.props.contents
                        }
                    </div>
                    <div style={estils.filtres}>

                    </div>
                    <div style={estils.taula}>
                        {
                            this.props.fetching ?
                                this.circularProgress()
                            :
                            this.props.table
                        }
                    </div>
                </MainPaper>
            </div>
        )
    }

    circularProgress(){
        return (
            <div style={estils.loading}>
                <CircularProgress size={100} thickness={4}/>
            </div>
        );
    }

    newItem(){
        console.log("New button pressed")
    }

    addFilter(){
        console.log("Filter button pressed");
    }
}