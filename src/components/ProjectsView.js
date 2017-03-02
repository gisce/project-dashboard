import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import Project from './Project'

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PowERP from '../api/PowERP.js'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

// const styles = {
//     container: {
//         marginTop: 75,
//     },
//     project: {
//         marginTop: 10,
//     },
//     appbar: {
//         position: 'fixed',
//         top: 0,
//         left: 0
//     }
// };

// const AppBarMenu = (props) => (
//     <IconMenu
//         {...props}
//         iconButtonElement={
//             <IconButton><MoreVertIcon /></IconButton>
//         }
//         targetOrigin={{horizontal: 'right', vertical: 'top'}}
//         anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//     >
//         <MenuItem primaryText="Configuració" />
//         <MenuItem primaryText="Ajuda" />
//         <MenuItem primaryText="Sortir" />
//     </IconMenu>
// );
//
// AppBarMenu.muiName = 'IconMenu';
//
// function GetProjects() {
//     /**
//      * This function fetches all projects from PowERP server
//      * using PowERP api.
//      * */
//     var api = new PowERP();
//     let projects = [];
//     let project_ids = api.search("project.project", []);
//     for(let i = 0; i < project_ids.length; i++){
//         let project = api.read("project.project", project_ids[i], ['id', 'title', 'subtitle', 'avatar', 'description']);
//         projects.push(project);
//     }
//     return {
//         "projects": projects
//     }
// }

// function Project(props) {
//     /*
//      * This function returns a Card project component.
//      * Properties must be provided.
//      * */
//     return (
//         <Card>
//             <CardHeader
//                 title={props.title}
//                 subtitle={props.subtitle}
//                 avatar={props.avatar}
//                 actAsExpander={true}
//                 showExpandableButton={true}
//             />
//             <CardActions>
//                 <FlatButton label="Tasques" />
//             </CardActions>
//             <CardText expandable={true}>
//                 {props.description}
//             </CardText>
//         </Card>
//     )
// }

export default class ProjectsView extends React.Component {
    render() {
        return(
            <Table>
                <TableBody>
                    <Project
                        title="Títol"
                        subtitle="Subtítol"
                        avatar="https://avatars2.githubusercontent.com/u/13195695?v=3&s=460"
                        description="Descripció"
                    />
                    <Project
                        title="Títol"
                        subtitle="Subtítol"
                        avatar="https://avatars2.githubusercontent.com/u/13195695?v=3&s=460"
                        description="Descripció"
                    />
                    <Project
                        title="Títol"
                        subtitle="Subtítol"
                        avatar="https://avatars2.githubusercontent.com/u/13195695?v=3&s=460"
                        description="Descripció"
                    />
                    <Project
                        title="Títol"
                        subtitle="Subtítol"
                        avatar="https://avatars2.githubusercontent.com/u/13195695?v=3&s=460"
                        description="Descripció"
                    />
                    <Project
                        title="Títol"
                        subtitle="Subtítol"
                        avatar="https://avatars2.githubusercontent.com/u/13195695?v=3&s=460"
                        description="Descripció"
                    />
                </TableBody>
            </Table>
        )
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         bundle: []
    //     };
    // }
    // render() {
    //     let pr = GetProjects();
    //     let projects = pr.projects;
    //     for (let i = 0; i < pr.projects.length; i++){
    //         this.state.bundle.push(
    //             <div key={i} style={styles.project}>
    //                 <Project
    //                     key={i}
    //                     index={i}
    //                     title={projects[i].title}
    //                     subtitle={projects[i].subtitle}
    //                     avatar={projects[i].avatar}
    //                     description={projects[i].description}
    //                 />
    //             </div>
    //         )
    //     }
    //     return (
    //         <div>
    //             <AppBar
    //                 title = "Projectes"
    //                 iconElementRight={<AppBarMenu/>}
    //                 style={styles.appbar}/>
    //             <div style={styles.container}>
    //                 {this.state.bundle}
    //             </div>
    //         </div>
    //     );
    // }
}