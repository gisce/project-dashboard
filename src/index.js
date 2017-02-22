import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
    <div>
        <h1>Hola món!</h1>
    </div>,
    document.getElementById('root')
);