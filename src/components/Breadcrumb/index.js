import React, { Component } from 'react';

export default class Breadcrumb extends Component {
    render(){
        let link = [];
        const data = this.props.data;
        for(let i=0; i < data.length; i++){
            link.push(
                <a key={i} href={data[i][1]}>
                    {data[i][0]}
                </a>
            );
            if(i < data.length -1){
                link.push(" / ");
            }
        }
        return(
            <div>
                {link}
            </div>
        )
    }
}