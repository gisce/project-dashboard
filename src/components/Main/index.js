import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const styles = {
    container: {
        marginTop: 75,
    },
    project: {
        marginTop: 10,
    },
    appbar: {
        position: 'fixed',
        top: 0,
        left: 0
    }
};


function GetProjects() {
    /* In the future, this function will fetch
    * projects from ERP server and will return
    * a dictionary with a list of projects*/
    return {
        projects: [{
            "title": "/dev/null (No Dev tasks)",
            "subtitle": "Eduard Carreras i Nadal",
            "avatar": "https://avatars2.githubusercontent.com/u/294235?v=3&s=460",
            "description": "Casos en els que no hi ha cap desenvolupament de codi."
        }, {
            "title": "Casos ERP v4",
            "subtitle": "Axel Simón González",
            "avatar": "https://avatars2.githubusercontent.com/u/13195695?v=3&s=460",
            "description": "Projecte per el seguiment dels casos de l'ERP versió 4."
        }, {
            "title": "Desenvolupaments reports .mako",
            "subtitle": "Guillem Julià",
            "avatar": "https://avatars3.githubusercontent.com/u/4963636?v=3&s=460",
            "description": "Projecte per historitzar les hores dels desenvolupaments de reports .mako"
        }]
    };
}

function Project(props) {
    /*
    * This function returns a Card project component.
    * Properties must be provided.
    * */
    return (
        <Card>
            <CardHeader
                title={props.title}
                subtitle={props.subtitle}
                avatar={props.avatar}
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardActions>
                <FlatButton label="Action1"/>
                <FlatButton label="Action2"/>
            </CardActions>
            <CardText expandable={true}>
                {props.description}
            </CardText>
        </Card>
    )
}

export class Main extends Component {

    render() {
        let bundle = []
        let pr = GetProjects();
        let projects = pr.projects;
        for (let i = 0; i < pr.projects.length; i++){
            bundle.push(
                <div key={i} style={styles.project}>
                    <Project
                        key={i}
                        index={i}
                        title={projects[i].title}
                        subtitle={projects[i].subtitle}
                        avatar={projects[i].avatar}
                        description={projects[i].description}
                    />
                </div>
            )
        }
        return (
            <div>
                <AppBar title = "Projectes" iconClassNameRight="muidocs-icon-navigation-expand-more" style={styles.appbar}/>
                <div style={styles.container}>
                    {bundle}
                    {bundle}
                    {bundle}
                    {bundle}
                    {bundle}
                    {bundle}
                </div>
            </div>
        );
    }
}

export default Main;