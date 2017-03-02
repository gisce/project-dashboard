import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    handleToggle = () => this.setState({open: !this.state.open});
    render() {
        return (
            <div>
                <RaisedButton
                    label="Toggle Drawer"
                    onTouchTap={this.handleToggle}
                />
                <Drawer
                    open={this.state.open}
                >
                    <MenuItem primaryText="Timer" leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText="Dashboard" leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText="Projectes" leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText="Usuaris" leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText="Empreses" leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText="Configuració"/>
                </Drawer>
            </div>
        );
    }
}