import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { TOKEN } from '../../constants/index';

export default class Many2One extends Component {
    constructor(props){
        super(props);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.filter = this.filter.bind(this);
        this.searchText = "";
        this.dataSource = [];
    }

    filter(searchText, key){
        return key.indexOf(searchText) !== -1
    }

    handleUpdateInput(textToSearch){
        this.searchText = textToSearch;
        this.props.searchFunction(TOKEN, textToSearch, "name")
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
        if(this.props.source && this.searchText.length >= 1) {
            for (let i = 0; i < this.props.source.length; i++) {
                if(this.dataSource.indexOf(this.props.source[i].name) === -1) {
                    this.dataSource.push(this.props.source[i].name);
                }
            }
        }
        else{
            this.dataSource = [];
        }
        return (
            <AutoComplete
                floatingLabelText={this.props.label}
                hintText="Escriu per cercar"
                searchText={this.searchText}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={this.dataSource}
                filter={this.filter}
                openOnFocus={true}
            />
        )
    }
}