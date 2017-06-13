import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { TOKEN } from '../../constants/index';

let searchText = "";
let dataSource = [];

export default class Many2One extends Component {
    constructor(props){
        super(props);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
        searchText = "";
    }

    handleUpdateInput(textToSearch){
        searchText = textToSearch;
        this.props.searchFunction(TOKEN, textToSearch, "name", false, false)
    };

    handleNewRequest(item){
        let i = 0;
        let id = false;
        const data = this.props.source;
        while(i < data.length){
            if(data[i].name === item){
                id = data[i].id;
                i = data.length;
            }
            i++;
        }
        this.props.updateFields(this.props.fieldName, {"id": parseInt(id, 10)});
    };

    render(){
        if(this.props.source && searchText.length >= 1) {
            for (let i = 0; i < this.props.source.length; i++) {
                dataSource.push(this.props.source[i].name);
            }
        }
        return (
            <AutoComplete
                hintText={this.props.label}
                searchText={searchText}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={dataSource}
                filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                openOnFocus={true}
            />
        )
    }
}