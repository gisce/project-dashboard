import React from 'react';
import { Header } from '../../components/Header';

/* theme creation */
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
    deepOrange500,
    deepOrange300,
    yellow500,
    blue500,
    white,

    orange700,
    orange400,
    amber400,
    amber200,
    lightGreen700,
    limeA700,
    teal600

} from 'material-ui/styles/colors';

const orangeWedge = getMuiTheme({
    palette: {
        primary1Color: teal600,
        primary2Color: teal600,
        primary3Color: teal600,
    },
});

/* application components */
import Toast from '../../components/Toast';
import Alert from '../../components/Alert';

/* global styles for app */
import './styles/app.scss';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node,
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={orangeWedge}>
                <section>
                    <Header />
                    <div className="container">
                        {this.props.children}
                    </div>
                    <Toast/>
                    <Alert/>
                </section>
            </MuiThemeProvider>
        );
    }
}

export { App };
