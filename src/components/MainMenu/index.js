import React from 'react';
import Menu from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import { redirectToRoute } from '../../utils/http_functions'

const style = {
    paper: {
        display: 'inline-block',
        height: '93.1%',
        width: '224px'
    }
};

export default class MainMenu extends React.Component {
    render() {
        return (
            <div>
                <Paper style={style.paper} zDepth={2}>
                    <Menu>
                        <MenuItem primaryText="Timer" leftIcon={<RemoveRedEye />} />
                        <MenuItem primaryText="Dashboard" leftIcon={<RemoveRedEye />} />
                        <MenuItem primaryText="Projectes" onTouchTap={this.GoToProjects} leftIcon={<RemoveRedEye />} />
                        <MenuItem primaryText="Usuaris" leftIcon={<RemoveRedEye />} />
                        <MenuItem primaryText="Empreses" leftIcon={<RemoveRedEye />} />
                        <MenuItem primaryText="Configuració"/>
                    </Menu>
                </Paper>
            </div>
        );
    }

    GoToProjects() {
        redirectToRoute("/projects");
    }
}