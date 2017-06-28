import React, { Component } from 'react';
import MainPaper from './MainPaper';

export default class NotFound extends Component {
    render() {
        return(
            <div className="mainPaperContainer">
                <MainPaper>
                    <div className="contents">
                        <h2 style={{textAlign: "center"}}>Error 404: no s'han trobat els continguts sol·licitats.</h2>
                        <br/>
                    </div>
                </MainPaper>
            </div>
        )
    }
}