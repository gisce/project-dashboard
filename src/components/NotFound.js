import React, { Component } from 'react';

export default class NotFound extends Component {
    render() {
        return(
            <div>
                <div className="contents">
                    <h2 style={{textAlign: "center"}}>Error 404: no s'han trobat els continguts sol·licitats.</h2>
                    <br/>
                </div>
            </div>
        )
    }
}