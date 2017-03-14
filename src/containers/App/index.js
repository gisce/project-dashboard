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
    limeA700

} from 'material-ui/styles/colors';

const orangeWedge = getMuiTheme({
    palette: {
        primary1Color: lightGreen700,
        primary2Color: lightGreen700,
        primary3Color: lightGreen700,
    },
});

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
                </section>
            </MuiThemeProvider>
        );
    }
}

export { App };
