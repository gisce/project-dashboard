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
        token: null,
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
        return(
            <div style={estils.container}>
                <MainPaper>
                    <div style={estils.contenidorSuperiorEsquerra}>
                        <div style={estils.titol}>
                            {this.props.title}
                        </div>
                        <div style={estils.breadcrumb}>
                            {this.props.breadcrumb}
                        </div>
                    </div>
                    <div style={estils.contenidorSuperiorDreta}>
                        <div style={estils.botonsSuperiors}>
                            {this.props.buttons}
                            <FlatButton
                                label="Filtres"
                                primary={true}
                                icon={<FontIcon className="material-icons">filter_list</FontIcon>}
                                onTouchTap={this.addFilter}
                            />
                            <FlatButton
                                label="Nou"
                                primary={true}
                                icon={<FontIcon className="material-icons">note_add</FontIcon>}
                                onTouchTap={this.newItem}
                            />
                            <FlatButton
                                label="Refrescar"
                                primary={true}
                                icon={<FontIcon className="material-icons">refresh</FontIcon>}
                                onTouchTap={this.refresh}
                            />
                        </div>
                        <div style={estils.search_box}>
                            {this.props.model && !this.props.fetching ?
                                <SearchBox original_ids={this.props.original_ids} model={this.props.model}/>
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                    <div style={estils.continguts}>
                        {this.props.contents}
                    </div>
                    <div style={estils.filtres}>
                        {this.props.filters}
                    </div>
                    <div style={estils.taula}>
                        {
                            this.props.fetching ?
                                <div style={estils.loading}>
                                    <CircularProgress size={100} thickness={4}/>
                                </div>
                            :
                            this.props.table
                        }
                    </div>
                </MainPaper>
            </div>
        )
    }

    refresh(){
        console.log("Refresh button pressed")
    }

    newItem(){
        console.log("New button pressed")
    }

    addFilter(){
        console.log("Filter button pressed");
    }
}