import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';
import { Prop, ISearch } from './ISearchBar';



export class SearchBar extends React.Component<Prop,ISearch> {
    state:ISearch = {
        value: ''
    };

    timeout: any;
    Search: (event: any) =>void = (event: any) => {
        this.setState({ value: event.target.value })
        clearTimeout(this.timeout);

        this.timeout = setTimeout( () => {
            this.props.callback(this.state.value);
        }, 500);
    }

    render() {
        return (
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
                    <input
                        type="text"
                        className="rmdb-searchbar-input"
                        placeholder="search"
                        onChange={this.Search}
                        value={this.state.value}
                        />
                </div>
            </div>
        )
    }
}