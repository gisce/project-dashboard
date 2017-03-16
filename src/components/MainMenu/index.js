import React from 'react';
import Menu from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import FontIcon from 'material-ui/FontIcon';
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
                    <Menu disableAutoFocus={true}>
                        <MenuItem primaryText="Timer" leftIcon={<FontIcon className="material-icons">watch_later</FontIcon>} />
                        <MenuItem primaryText="Dashboard" leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>} />
                        <MenuItem primaryText="Projectes" onTouchTap={redirectToRoute("/projects")} leftIcon={<FontIcon className="material-icons">folder</FontIcon>} />
                        <MenuItem primaryText="Usuaris" leftIcon={<FontIcon className="material-icons">account_circle</FontIcon>} />
                        <MenuItem primaryText="Empreses" leftIcon={<FontIcon className="material-icons">business_center</FontIcon>} />
                        <MenuItem primaryText="Configuració" leftIcon={<FontIcon className="material-icons">settings</FontIcon>}/>
                    </Menu>
                </Paper>
            </div>
        );
    }
}