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

} from 'material-ui/styles/colors';

const orangeWedge = getMuiTheme({
    palette: {
        primary1Color: orange400,
        primary2Color: orange400,
        primary3Color: amber200,
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
                    <div
                        className="container"
                        style={{ marginTop: 10, paddingBottom: 250 }}
                    >
                        {this.props.children}
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

export { App };
